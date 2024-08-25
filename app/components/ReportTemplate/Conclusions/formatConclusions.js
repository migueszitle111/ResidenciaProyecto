export function formatConclusions(conclusions) {
    if (!conclusions.length) return '';

const formattedList = conclusions.map((conclusion, index) => {
    if (index === conclusions.length - 1) {
    return conclusion.startsWith('I') ? 'E ' + conclusion : conclusion;
    }
    return conclusion + ',';
});

return formattedList.join(' ');
}