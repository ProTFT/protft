const dateFormatOptions: Intl.DateTimeFormatOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
};

export const formatDateFromDB = (stringDate: string) =>
  new Date(stringDate).toLocaleDateString(undefined, dateFormatOptions);
