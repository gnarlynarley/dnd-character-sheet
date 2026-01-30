import fastDeepEqual from 'fast-deep-equal';

export function isEqual(a: unknown, b: unknown): boolean {
  console.log('isEqual', a, b);
  return fastDeepEqual(a, b);
}
