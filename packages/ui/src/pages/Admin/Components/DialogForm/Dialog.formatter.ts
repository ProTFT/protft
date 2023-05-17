export const dbDateToHTML = (
  dbDateTimeString?: string,
  includeTime: boolean = false
): string => {
  if (!dbDateTimeString) {
    return "";
  }
  const slice = includeTime ? 16 : 10;
  return new Date(dbDateTimeString).toISOString().slice(0, slice);
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
