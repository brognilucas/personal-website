// Client-side stand-in for Node's "crypto" module. @sls-testing/core only needs
// randomUUID, which every modern browser exposes on globalThis.crypto.
export function randomUUID() {
  return globalThis.crypto.randomUUID();
}
