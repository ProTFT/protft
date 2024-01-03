import { useMemo } from "react";
import { RegionCode, regionCodeToName } from "../../formatter/Region";
import { TextIconHorizontalContainer } from "../Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { StyledRegionText } from "./RegionIndicator.styled";
import { byIso } from "country-code-lookup";
import { S3_FOLDER_PATH } from "../../aws/Constants";

interface Props {
  regionCodes?: string[];
  showName?: boolean;
}

interface SingleProps {
  regionCode: string;
  showName: boolean;
}

const SingleRegionIndicator = ({ regionCode, showName }: SingleProps) => {
  const regionName = useMemo(
    () => regionCodeToName(regionCode as RegionCode),
    [regionCode]
  );

  return (
    <TextIconHorizontalContainer key={regionCode}>
      <img
        src={`${S3_FOLDER_PATH}/regions/${regionCode}.webp`}
        alt={regionName}
        style={{ width: "16px" }}
      />
      {showName && <StyledRegionText>{regionName}</StyledRegionText>}
    </TextIconHorizontalContainer>
  );
};

export const RegionsIndicator = ({ regionCodes, showName = true }: Props) => {
  if (!regionCodes || regionCodes.length === 0) {
    return <></>;
  }

  return (
    <>
      {regionCodes.map((regionCode) => (
        <SingleRegionIndicator
          key={regionCode}
          regionCode={regionCode}
          showName={showName}
        />
      ))}
    </>
  );
};

interface CountryIndicatorProps {
  countryCode?: string | null;
  showName?: boolean;
}

export const CountryIndicator = ({
  countryCode,
  showName = false,
}: CountryIndicatorProps) => {
  if (!countryCode) {
    return <></>;
  }

  return (
    <TextIconHorizontalContainer>
      <img
        src={`${S3_FOLDER_PATH}/countries/${countryCode}.webp`}
        alt={countryCode}
        style={{ width: "16px" }}
      />
      {showName && (
        <StyledRegionText>
          {byIso(countryCode)?.country || "No Country representation"}
        </StyledRegionText>
      )}
    </TextIconHorizontalContainer>
  );
};

interface RegionImageProps {
  countryCode: string;
  size?: number;
}

export const RegionImage = ({ countryCode, size = 2.4 }: RegionImageProps) => {
  return (
    <img
      src={`${S3_FOLDER_PATH}/regions/${countryCode}.webp`}
      alt={countryCode}
      style={{ width: `${size}rem` }}
    />
  );
};
