'use client';

import { useCallback, useEffect, useState } from 'react';

// v2 adds per-category scoping to clinical fields (keys now carry a suffix
// like ":craneal", ":cervical", ":lumbar", ":otros"). Bumped from v1 so the
// old global-pool entries don't leak into the new buckets. v1 entries stay
// in localStorage until the browser evicts them; they're just unreachable.
const STORAGE_PREFIX = 'medxpro:suggestions:v2:';
const MAX_PER_FIELD = 50;
const MIN_LENGTH = 3;

function readStore(fieldKey) {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + fieldKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeStore(fieldKey, list) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_PREFIX + fieldKey, JSON.stringify(list));
  } catch {
    // Quota exceeded or storage disabled — silently ignore, autocomplete is best-effort.
  }
}

export function useFieldSuggestions(fieldKey) {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!fieldKey) return;
    setSuggestions(readStore(fieldKey));
  }, [fieldKey]);

  const saveSuggestion = useCallback((value) => {
    if (!fieldKey) return;
    const trimmed = (value ?? '').toString().trim();
    if (trimmed.length < MIN_LENGTH) return;

    const current = readStore(fieldKey);
    // Case-insensitive dedup — keep most recent original casing at the front (LRU).
    const lowered = trimmed.toLowerCase();
    const filtered = current.filter((s) => s.toLowerCase() !== lowered);
    const next = [trimmed, ...filtered].slice(0, MAX_PER_FIELD);
    writeStore(fieldKey, next);
    setSuggestions(next);
  }, [fieldKey]);

  const filter = useCallback((query, limit = 5) => {
    const q = (query ?? '').toString().trim().toLowerCase();
    if (!q) return [];
    return suggestions
      .filter((s) => s.toLowerCase().includes(q) && s.toLowerCase() !== q)
      .slice(0, limit);
  }, [suggestions]);

  // Returns the most recent suggestion whose start matches `query`
  // (case-insensitive), or null when there's no prefix match or the query
  // already equals a full suggestion. Case of the STORED suggestion wins so
  // "Res" auto-extends to the original "Resección…".
  const prefixMatch = useCallback((query) => {
    const raw = (query ?? '').toString();
    if (!raw) return null;
    const qLower = raw.toLowerCase();
    for (const s of suggestions) {
      const sLower = s.toLowerCase();
      if (sLower.startsWith(qLower) && sLower !== qLower) return s;
    }
    return null;
  }, [suggestions]);

  return { suggestions, saveSuggestion, filter, prefixMatch };
}
