import fastDeepEqual from 'fast-deep-equal';

export function isEqual(a: unknown, b: unknown): boolean {
  return fastDeepEqual(a, b);
}
