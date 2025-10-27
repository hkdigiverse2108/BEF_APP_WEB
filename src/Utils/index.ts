export * from "./RemoveEmptyFields"
export * from "./AntNotification"

export const Stringify = (value: object): string => {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
};

export const Storage = localStorage;

export const updateStorage = (key: string, newData: object) => {
  const existing = JSON.parse(Storage.getItem(key) || "{}");
  Storage.setItem(key, JSON.stringify({ ...existing, ...newData }));
};
