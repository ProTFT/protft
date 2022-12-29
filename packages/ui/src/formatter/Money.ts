const numberFormatter = (currency: string) =>
  Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

export const formatMoney = (currency: string, value?: number | null) => {
  if (!value) {
    return "?";
  }
  return numberFormatter(currency).format(value);
};
