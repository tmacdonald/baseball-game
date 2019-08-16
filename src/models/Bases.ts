import { Player } from "./Game";

export default interface Bases {
  first: Player | undefined;
  second: Player | undefined;
  third: Player | undefined;
}

export function createBases(
  first: Player | undefined = undefined,
  second: Player | undefined = undefined,
  third: Player | undefined = undefined
): Bases {
  return { first, second, third };
}

export function isEmpty(bases: Bases): boolean {
  return (
    bases.first === undefined &&
    bases.second === undefined &&
    bases.third === undefined
  );
}

export function isLoaded(bases: Bases): boolean {
  return (
    bases.first !== undefined &&
    bases.second !== undefined &&
    bases.third !== undefined
  );
}
