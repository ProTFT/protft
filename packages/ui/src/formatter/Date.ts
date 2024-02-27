const dateFormatOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
};

export const formatDateFromDB = (
  stringDate: string,
  convertToLocal: boolean = false
) => {
  if (convertToLocal) {
    return new Date(stringDate).toLocaleDateString(
      undefined,
      dateFormatOptions
    );
  }
  return new Date(stringDate).toLocaleDateString(undefined, {
    ...dateFormatOptions,
    timeZone: "UTC",
  });
};

export const dbUTCDateTimeToHTML = (dbDateTimeString?: string): string => {
  if (!dbDateTimeString) {
    return "";
  }

  const date = new Date(dbDateTimeString);
  const utcValue = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes()
  );
  return new Date(utcValue).toISOString().slice(0, -1);
};
