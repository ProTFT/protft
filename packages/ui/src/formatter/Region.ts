export enum RegionCode {
  BR = "BR",
  EMEA = "EMEA",
  NA = "NA",
  CN = "CN",
  JP = "JP",
  KR = "KR",
  OCE = "OCE",
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
  [RegionCode.WO]: "World",
};

export const regionCodeToName = (regionCode: RegionCode) => {
  return regionCodeMap[regionCode];
};
