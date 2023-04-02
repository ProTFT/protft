export enum RegionCode {
  BR = "BR",
  CN = "CN",
  EMEA = "EMEA",
  JP = "JP",
  KR = "KR",
  LA = "LA",
  NA = "NA",
  OCE = "OCE",
  SEA = "SEA",
  WO = "WO",
}

const regionCodeMap: { [key in RegionCode]: string } = {
  [RegionCode.BR]: "Brazil",
  [RegionCode.EMEA]: "EMEA",
  [RegionCode.NA]: "North America",
  [RegionCode.CN]: "China",
  [RegionCode.JP]: "Japan",
  [RegionCode.KR]: "South Korea",
  [RegionCode.OCE]: "Oceania",
  [RegionCode.LA]: "LATAM",
  [RegionCode.WO]: "World",
  [RegionCode.SEA]: "SEA",
};

export const regionCodeToName = (regionCode: RegionCode) => {
  return regionCodeMap[regionCode];
};
