export default function createId(): string {
  return (Date.now() + Math.floor(Math.random() * 1000)).toString(36);
}
