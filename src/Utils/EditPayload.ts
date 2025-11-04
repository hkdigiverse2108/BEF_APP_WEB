import dayjs, { Dayjs } from "dayjs";

export const EditPayload = (values: any, initialValues: Record<string, unknown>): Record<string, unknown> => {
  const dirtyFields: Record<string, unknown> = {};

  const formatValue = (key: string, val: unknown): unknown => {
    // ✅ Only format DOB
    if (key.toLowerCase() === "dob" || key.toLowerCase() === "joiningDate") {
      if (dayjs.isDayjs(val)) return (val as Dayjs).format("YYYY-MM-DD");
      if (val instanceof Date) return dayjs(val).format("YYYY-MM-DD");
      if (typeof val === "string" && dayjs(val).isValid()) {
        return dayjs(val).format("YYYY-MM-DD");
      }
    }

    if (Array.isArray(val) && val.length === 2 && dayjs.isDayjs(val[0])) {
      return {
        start: (val[0] as Dayjs).format("HH:mm A"),
        end: (val[1] as Dayjs).format("HH:mm A"),
      };
    }

    if (Array.isArray(val) && val.length > 0 && (val[0] as { originFileObj?: File }).originFileObj) {
      return (val[0] as { originFileObj: File }).originFileObj;
    }

    return val;
  };

  const compare = (newObj: Record<string, unknown>, oldObj: Record<string, unknown> | undefined): void => {
    Object.keys(newObj).forEach((key) => {
      const newVal = newObj[key];
      let oldVal = oldObj ? oldObj[key] : undefined;

      if (key.toLowerCase() === "password") {
        oldVal = (oldObj as { displayPassword?: string })?.displayPassword ?? oldVal;
        const formattedNewVal = formatValue(key, newVal);
        const formattedOldVal = formatValue(key, oldVal);

        if (formattedNewVal && formattedNewVal !== formattedOldVal) {
          dirtyFields[key] = formattedNewVal;
        }
        return;
      }

      const formattedNewVal = formatValue(key, newVal);
      const formattedOldVal = formatValue(key, oldVal);

      if (newVal && typeof newVal === "object" && !dayjs.isDayjs(newVal) && !(newVal instanceof Date) && !Array.isArray(newVal)) {
        const nestedChanges = EditPayload(newVal as Record<string, unknown>, (oldVal as Record<string, unknown>) || {});
        if (Object.keys(nestedChanges).length > 0) {
          // dirtyFields[key] = nestedChanges;
          dirtyFields[key] = newVal;
        }
      } else {
        if (JSON.stringify(formattedNewVal) !== JSON.stringify(formattedOldVal)) {
          dirtyFields[key] = formattedNewVal;
        }
      }
    });
  };

  compare(values, initialValues);

  return dirtyFields;
};
