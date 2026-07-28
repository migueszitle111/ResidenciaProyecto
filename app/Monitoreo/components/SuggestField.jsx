'use client';

import { useEffect, useRef, useState } from 'react';
import { useFieldSuggestions } from './useFieldSuggestions';

const MAX_VISIBLE = 5;

// Ghost-text UX (Gmail Smart Compose style):
//   - The user's value in the input is NEVER modified by the suggestion.
//   - A translucent overlay behind the field shows the suggested tail in grey.
//   - Tab (or ArrowRight at end / End) accepts — that's the only trigger.
//   - Any other key (typing, backspace, esc) just leaves the ghost alone or
//     lets it disappear naturally as the value stops matching a prefix.
//   - A dropdown still shows substring matches (2+) as a secondary picker.

function Dropdown({ matches, activeIdx, onPick }) {
  if (matches.length === 0) return null;
  return (
    <ul
      className="absolute z-30 left-0 right-0 mt-1 bg-[#1c1c1c] border border-white/10 rounded-md shadow-lg max-h-56 overflow-auto"
      role="listbox"
    >
      {matches.map((s, i) => (
        <li
          key={s + i}
          role="option"
          aria-selected={i === activeIdx}
          onMouseDown={(e) => {
            e.preventDefault();
            onPick(s);
          }}
          className={`px-3 py-2 text-sm cursor-pointer truncate ${
            i === activeIdx
              ? 'bg-orange-500/20 text-orange-200'
              : 'text-slate-200 hover:bg-white/5'
          }`}
        >
          {s}
        </li>
      ))}
    </ul>
  );
}

function useOutsideClose(ref, onClose) {
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [ref, onClose]);
}

// The dropdown lists OTHER substring matches (not the one already shown as
// ghost) — showing the same suggestion twice would be noise.
function useDropdownMatches(filterFn, prefixFn, value) {
  const all = filterFn(value, MAX_VISIBLE);
  const inline = prefixFn(value);
  const filtered = inline ? all.filter((s) => s !== inline) : all;
  return filtered.length >= 1 && all.length >= 2 ? filtered : [];
}

export function SuggestInput({
  fieldKey,
  value,
  onChange,
  placeholder,
  type = 'text',
  className,
}) {
  const { saveSuggestion, filter, prefixMatch } = useFieldSuggestions(fieldKey);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [focused, setFocused] = useState(false);
  const [overflowing, setOverflowing] = useState(false);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  useOutsideClose(wrapRef, () => setOpen(false));

  const ghostMatch = prefixMatch(value);
  const ghostTail = focused && ghostMatch ? ghostMatch.slice(value.length) : '';
  const dropdownMatches = useDropdownMatches(filter, prefixMatch, value);

  // Detect when the ghost tail is clipped by the input's fixed width so we
  // can surface the full suggestion in a floating preview underneath.
  useEffect(() => {
    if (!overlayRef.current) return;
    const el = overlayRef.current;
    setOverflowing(ghostTail.length > 0 && el.scrollWidth > el.clientWidth + 1);
  }, [value, ghostTail]);

  useEffect(() => {
    setActiveIdx(0);
  }, [value]);

  const acceptGhost = () => {
    if (!ghostMatch) return;
    onChange(ghostMatch);
    saveSuggestion(ghostMatch);
  };

  const pickDropdown = (s) => {
    onChange(s);
    setOpen(false);
    saveSuggestion(s);
  };

  const onKeyDown = (e) => {
    // Accept the ghost with Tab / End; ArrowRight only when caret is at the
    // very end (so it doesn't hijack in-word navigation).
    const el = inputRef.current;
    const atEnd = el && el.selectionStart === el.value.length && el.selectionEnd === el.value.length;

    if (ghostTail && (e.key === 'Tab' || e.key === 'End' || (e.key === 'ArrowRight' && atEnd))) {
      e.preventDefault();
      acceptGhost();
      setOpen(false);
      return;
    }

    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (!open || dropdownMatches.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % dropdownMatches.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + dropdownMatches.length) % dropdownMatches.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      pickDropdown(dropdownMatches[activeIdx]);
    }
  };

  // Overlay mirrors the input's typography exactly. The user-typed portion is
  // rendered transparent (just to reserve horizontal space) and the ghost tail
  // sits right after it in a muted grey.
  return (
    <div ref={wrapRef} className="relative">
      <div className="relative bg-[#1c1c1c] rounded-md">
        <div
          ref={overlayRef}
          aria-hidden="true"
          className={`${className} pointer-events-none absolute inset-0 whitespace-pre overflow-hidden`}
          style={{ background: 'transparent', borderColor: 'transparent', color: 'transparent' }}
        >
          <span>{value}</span>
          {ghostTail && <span style={{ color: '#64748b' }}>{ghostTail}</span>}
        </div>
        <input
          ref={inputRef}
          type={type}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => { setFocused(true); setOpen(true); }}
          onBlur={() => { setFocused(false); saveSuggestion(value); }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className={`${className} relative bg-transparent`}
          autoComplete="off"
        />
      </div>
      {/* Full-suggestion preview when the ghost tail doesn't fit inside the
          input. Keeps the user informed of what Tab will insert without
          truncating anything. */}
      {overflowing && ghostMatch && (
        <div
          onMouseDown={(e) => { e.preventDefault(); acceptGhost(); setOpen(false); }}
          className="absolute z-20 left-0 right-0 mt-1 bg-[#111] border border-orange-500/30 rounded-md px-3 py-2 text-xs text-slate-300 shadow-lg cursor-pointer hover:bg-[#161616]"
          title="Presiona Tab para aceptar"
        >
          <span className="text-orange-400 font-semibold mr-2">Tab ↹</span>
          <span className="whitespace-pre-wrap break-words">{ghostMatch}</span>
        </div>
      )}
      {open && !overflowing && <Dropdown matches={dropdownMatches} activeIdx={activeIdx} onPick={pickDropdown} />}
    </div>
  );
}

export function SuggestTextarea({
  fieldKey,
  value,
  onChange,
  placeholder,
  rows = 3,
  className,
}) {
  const { saveSuggestion, filter, prefixMatch } = useFieldSuggestions(fieldKey);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [focused, setFocused] = useState(false);
  const wrapRef = useRef(null);
  const areaRef = useRef(null);
  // Hidden mirror div used to measure how tall the field needs to be to fit
  // the current value + ghost tail. Auto-grows the textarea to that height so
  // long suggestions are never clipped.
  const measureRef = useRef(null);

  useOutsideClose(wrapRef, () => setOpen(false));

  const ghostMatch = prefixMatch(value);
  const ghostTail = focused && ghostMatch ? ghostMatch.slice(value.length) : '';
  const dropdownMatches = useDropdownMatches(filter, prefixMatch, value);

  useEffect(() => {
    setActiveIdx(0);
  }, [value]);

  // Grow the textarea to whatever the mirror div reports. The mirror renders
  // value + ghost with the same font/padding/width, so its scrollHeight is
  // exactly what the textarea needs to display everything without clipping.
  useEffect(() => {
    if (!areaRef.current || !measureRef.current) return;
    const measured = measureRef.current.scrollHeight;
    // Never shrink below the initial `rows` — use the textarea's own natural
    // height for empty state as the floor.
    areaRef.current.style.height = 'auto';
    const natural = areaRef.current.scrollHeight;
    areaRef.current.style.height = Math.max(measured, natural) + 'px';
  }, [value, ghostTail]);

  const acceptGhost = () => {
    if (!ghostMatch) return;
    onChange(ghostMatch);
    saveSuggestion(ghostMatch);
  };

  const pickDropdown = (s) => {
    onChange(s);
    setOpen(false);
    saveSuggestion(s);
  };

  const onKeyDown = (e) => {
    const el = areaRef.current;
    const atEnd = el && el.selectionStart === el.value.length && el.selectionEnd === el.value.length;

    if (ghostTail && (e.key === 'Tab' || e.key === 'End' || (e.key === 'ArrowRight' && atEnd))) {
      e.preventDefault();
      acceptGhost();
      setOpen(false);
      return;
    }

    if (e.key === 'Escape') {
      setOpen(false);
      return;
    }

    if (!open || dropdownMatches.length === 0) return;

    // In textareas Enter must stay for newlines, so use Alt+arrows and
    // Ctrl/Cmd+Enter for the dropdown.
    if (e.key === 'ArrowDown' && e.altKey) {
      e.preventDefault();
      setActiveIdx((i) => (i + 1) % dropdownMatches.length);
    } else if (e.key === 'ArrowUp' && e.altKey) {
      e.preventDefault();
      setActiveIdx((i) => (i - 1 + dropdownMatches.length) % dropdownMatches.length);
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      pickDropdown(dropdownMatches[activeIdx]);
    }
  };

  return (
    <div ref={wrapRef} className="relative">
      <div className="relative bg-[#1c1c1c] rounded-md">
        {/* Ghost overlay — same box model as the textarea so text lines up */}
        <div
          aria-hidden="true"
          className={`${className} pointer-events-none absolute inset-0 whitespace-pre-wrap overflow-hidden`}
          style={{ background: 'transparent', borderColor: 'transparent', color: 'transparent' }}
        >
          <span>{value}</span>
          {ghostTail && <span style={{ color: '#64748b' }}>{ghostTail}</span>}
        </div>
        {/* Off-screen mirror for measuring — invisible, but takes real layout
            height. A trailing space keeps the last line's height when value
            ends with a newline (otherwise scrollHeight is one line short). */}
        <div
          ref={measureRef}
          aria-hidden="true"
          className={`${className} whitespace-pre-wrap invisible`}
          style={{ position: 'absolute', top: 0, left: 0, right: 0, pointerEvents: 'none' }}
        >
          {value}{ghostTail}{'​'}
        </div>
        <textarea
          ref={areaRef}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            setOpen(true);
          }}
          onFocus={() => { setFocused(true); setOpen(true); }}
          onBlur={() => { setFocused(false); saveSuggestion(value); }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          rows={rows}
          className={`${className} relative bg-transparent overflow-hidden`}
          style={{ resize: 'none' }}
        />
      </div>
      {open && <Dropdown matches={dropdownMatches} activeIdx={activeIdx} onPick={pickDropdown} />}
    </div>
  );
}
