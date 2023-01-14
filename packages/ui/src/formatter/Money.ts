const numberFormatter = (currency: string) =>
  Intl.NumberFormat(undefined, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

export const formatMoney = (
  currency?: string | null,
  value?: number | null
) => {
  if (!value || !currency) {
    return "?";
  }
  try {
    return numberFormatter(currency).format(value);
  } catch (error) {
    return "Error parsing currency";
  }
};
