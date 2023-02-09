import {
  afterOrToday,
  afterToday,
  beforeOrToday,
  beforeToday,
} from "./DateFilter";

describe("Date Filter", () => {
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
