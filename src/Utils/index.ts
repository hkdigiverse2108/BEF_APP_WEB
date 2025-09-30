export const Stringify = (value: object): string => {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
};

export const Storage = localStorage;
