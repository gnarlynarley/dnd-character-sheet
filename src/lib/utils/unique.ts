export default function unique<TValue>(values: TValue[]): TValue[] {
  return Array.from(new Set(values));
}
