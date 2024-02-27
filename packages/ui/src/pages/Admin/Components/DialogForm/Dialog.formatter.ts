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
