export function joinClasses<T>(...args: T[]): string {
  return args.join(' ').trim();
}
