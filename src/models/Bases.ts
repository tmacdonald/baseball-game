type Bases<T> = {
  first: T;
  second: T;
  third: T;
};

function createBases<T>(
  first: T | undefined = undefined,
  second: T | undefined = undefined,
  third: T | undefined = undefined
): Bases<T | undefined> {
  return { first, second, third };
}

export default Bases;
export { createBases };
