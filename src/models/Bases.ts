import { PlayerID } from "./Player";

export default interface Bases {
  first: PlayerID | undefined;
  second: PlayerID | undefined;
  third: PlayerID | undefined;
}

export function createBases(
  first: PlayerID | undefined = undefined,
  second: PlayerID | undefined = undefined,
  third: PlayerID | undefined = undefined
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
