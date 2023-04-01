import { LiveIndicator } from "../../../../components/LiveIndicator/LiveIndicator";
import { colors } from "../../../../design/colors";
import { TournamentStream } from "../../../../graphql/schema";
import {
  StyledDrawerTitle,
  StyledStreamContainer,
  StyledStreamName,
} from "./StreamDrawer.styled";
import { getStreamLogo, getStreamLanguage } from "./StreamDrawer.utils";

export const VideoList = ({
  title,
  videos,
}: {
  title: string;
  videos?: TournamentStream[];
}) => (
  <>
    <StyledDrawerTitle>{title}</StyledDrawerTitle>
    {videos?.map((stream) => (
      <VideoListItem {...stream} />
    ))}
  </>
);

const VideoListItem = ({
  link: url,
  name,
  platform,
  language,
  isLive,
}: TournamentStream) => (
  <a href={url} key={name} target="blank">
    <StyledStreamContainer>
      {getStreamLogo(platform)({
        color: colors.yellow,
      })}
      <StyledStreamName>{name}</StyledStreamName>
      {getStreamLanguage(language)}
      {isLive && <LiveIndicator />}
    </StyledStreamContainer>
  </a>
);
