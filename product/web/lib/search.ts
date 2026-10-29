// Words people type around a need ("someone who is blind") that would otherwise have to match
// a place too and leave nothing found.
const FILLER = new Set([
  "a", "an", "the", "is", "are", "who", "someone", "person", "they", "them", "their", "i", "my",
  "me", "need", "needs", "help", "with", "for", "to", "of", "and", "or", "has", "have", "in", "at",
]);

/** The words in a search that have to match a place, lowercased. */
export function searchWords(q: string): string[] {
  return q
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w && !FILLER.has(w));
}
