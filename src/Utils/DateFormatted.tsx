import dayjs from "dayjs";

export const FormatDate = (dateInput: string | Date): string => {
  return dayjs(dateInput).isValid() ? dayjs(dateInput).format("DD/MM/YYYY") : "";
};

export const SecondFormatDate = (dateInput: string | Date): string => {
  const date = new Date(dateInput);
  if (isNaN(date.getTime())) return "";

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const FormatTime = (dateInput: string | Date): string => {
  return dayjs(dateInput).isValid() ? dayjs(dateInput).format("hh:mm A") : "";
};

export const FormatDateTime = (dateInput: string | Date): string => {
  return dayjs(dateInput).isValid() ? dayjs(dateInput).format("DD/MM/YYYY hh:mm") : "";
};
