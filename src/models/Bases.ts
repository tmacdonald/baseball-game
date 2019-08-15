// TODO It's overkill for this to be generic
export default interface Bases<T> {
  first: T;
  second: T;
  third: T;
}

export function createBases<T>(
  first: T | undefined = undefined,
  second: T | undefined = undefined,
  third: T | undefined = undefined
): Bases<T | undefined> {
  return { first, second, third };
}

export function isEmpty<T>(bases: Bases<T>): boolean {
  return (
    bases.first === undefined &&
    bases.second === undefined &&
    bases.third === undefined
  );
}

export function isLoaded<T>(bases: Bases<T>): boolean {
  return (
    bases.first !== undefined &&
    bases.second !== undefined &&
    bases.third !== undefined
  );
}
