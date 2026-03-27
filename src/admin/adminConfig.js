// ─── ADMIN CONFIG ──────────────────────────────────────
// Change this password to whatever you want
export const ADMIN_PASSWORD = 'chintu123';

// Helper: generate next ID from an array of objects with .id
export function nextId(arr) {
  return arr.length ? Math.max(...arr.map((x) => x.id || 0)) + 1 : 1;
}
