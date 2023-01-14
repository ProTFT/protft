export const dbDateToHTML = (dbDateTimeString?: string): string => {
  if (!dbDateTimeString) {
    return "";
  }
  return new Date(dbDateTimeString).toISOString().slice(0, 10);
};
