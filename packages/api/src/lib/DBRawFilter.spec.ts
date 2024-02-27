import {
  afterOrToday,
  afterToday,
  beforeOrToday,
  beforeToday,
  includes,
  includesInt,
  isEqualName,
} from "./DBRawFilter";

describe("DB Raw Filters", () => {
  describe("Date Filters", () => {
    const alias = "dateField";

    it("beforeToday", () =>
      expect(beforeToday(alias)).toBe("dateField < CURRENT_DATE"));

    it("beforeOrToday", () =>
      expect(beforeOrToday(alias)).toBe("dateField <= CURRENT_DATE"));

    it("afterOrToday", () =>
      expect(afterOrToday(alias)).toBe("dateField >= CURRENT_DATE"));

    it("afterToday", () =>
      expect(afterToday(alias)).toBe("dateField > CURRENT_DATE"));
  });

  describe("Name filter", () => {
    const alias = "slugField";

    it("isEqualName", () =>
      expect(isEqualName(alias)).toBe("slugField = name"));
  });

  describe("Comparing string arrays", () => {
    const alias = "field";

    it("includes", () =>
      expect(includes(["a", "b"])(alias)).toBe(
        "field && array['a','b']::character varying []",
      ));
  });

  describe("Comparing number arrays", () => {
    const alias = "field";

    it("includesInt", () =>
      expect(includesInt([1, 2])(alias)).toBe("field && array[1,2]"));
  });
});
