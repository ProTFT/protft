import { TextIconHorizontalContainer } from "../Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { StyledRegionText } from "./RegionIndicator.styled";

interface Props {
  name?: string;
  image: string;
}

export const RegionIndicator = ({ name, image }: Props) => {
  return (
    <TextIconHorizontalContainer>
      <img src={image} alt={name} style={{ minWidth: "16px" }} />
      {name && <StyledRegionText>{name}</StyledRegionText>}
    </TextIconHorizontalContainer>
  );
};
