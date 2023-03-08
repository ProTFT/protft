const englishRules = new Intl.PluralRules("en", { type: "ordinal" });
const suffixes: { [key in Intl.LDMLPluralRule]: string } = {
  zero: "",
  many: "",
  one: "st",
  two: "nd",
  few: "rd",
  other: "th",
};

export const getOrdinal = (value: number) => {
  const category = englishRules.select(value);
  const suffix = suffixes[category];
  return value + suffix;
};
