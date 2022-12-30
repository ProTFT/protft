import { useMemo } from "react";
import { RegionCode, regionCodeToName } from "../../formatter/Region";
import { TextIconHorizontalContainer } from "../Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { StyledRegionText } from "./RegionIndicator.styled";

interface Props {
  regionCodes: string[];
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
        src={`/regions/${regionCode}.webp`}
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
