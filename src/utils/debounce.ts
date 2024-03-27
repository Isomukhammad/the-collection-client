// eslint-disable-next-line no-unused-vars
export const debounce = <T extends (...args: any[]) => any>(fn: T, delay: number) => {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        resolve(fn(...args));
      }, delay);
    });
  };
};
