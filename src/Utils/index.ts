export * from "./RemoveEmptyFields"
export * from "./AntNotification"
export * from "./EditPayload"
export * from "./DateFormatted"

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

export const isImage = (value: string = ""): boolean => {
  if (!value) return false;

  try {
    const url = new URL(value);

    // Get file extension
    const ext = url.pathname.split(".").pop()?.toLowerCase();

    const imageExt = ["jpg", "jpeg", "png", "webp", "gif", "bmp", "svg"];

    return imageExt.includes(ext || "");
  } catch {
    return false; // Not a valid URL
  }
};

