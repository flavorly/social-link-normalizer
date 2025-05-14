export const pipe = <T = unknown>(input: T, ...fns: ((input: T) => T)[]) => {
  for (const fn of fns) {
    input = fn(input);
  }
  return input;
};

export const pipeAsync = async <T = unknown>(
  input: T,
  ...fns: ((input: T) => Promise<T>)[]
) => {
  for (const fn of fns) {
    input = await fn(input);
  }
  return input;
};
