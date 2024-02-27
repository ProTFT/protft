import { useMemo } from "react";
import { useQuery } from "urql";
import { ExternalLink } from "../../../components/ExternalLink/ExternalLink";
import { colors } from "../../../design/colors";
import { Twitch } from "../../../design/icons/Twitch";
import { Twitter } from "../../../design/icons/Twitter";
import {
  PlayerLinksQuery,
  PlayerLinksQueryVariables,
} from "../../../gql/graphql";
import { useIsMobile } from "../../../hooks/useIsMobile";
import { StyledSocialMediaContainer } from "./Header.styled";
import { PLAYER_LINKS_QUERY } from "./queries";

interface Props {
  id?: number;
}

export const SocialMedia = ({ id }: Props) => {
  const [{ data }] = useQuery<PlayerLinksQuery, PlayerLinksQueryVariables>({
    query: PLAYER_LINKS_QUERY,
    variables: {
      playerId: Number(id),
    },
    pause: !id,
  });

  const isMobile = useIsMobile();

  const { twitter, lolchess, twitch } = useMemo<{
    twitter?: string;
    twitch?: string;
    lolchess?: string;
  }>(() => {
    return (
      data?.player.links.reduce(
        (prev, curr) => ({
          ...prev,
          [curr.type]: curr.link,
        }),
        {}
      ) ?? {}
    );
  }, [data]);

  const svgIconSize = useMemo(() => (isMobile ? 24 : 32), [isMobile]);
  const imageIconSize = useMemo(() => (isMobile ? 24 : 44), [isMobile]);

  return (
    <StyledSocialMediaContainer>
      {twitter && (
        <ExternalLink link={twitter}>
          <Twitter color={colors.white} size={svgIconSize} />
        </ExternalLink>
      )}
      {twitch && (
        <ExternalLink link={twitch}>
          <Twitch color={colors.white} size={svgIconSize} />
        </ExternalLink>
      )}
      {lolchess && (
        <ExternalLink link={lolchess}>
          <img
            src="/lolchess.png"
            alt="lolchess"
            style={{
              width: `${imageIconSize}px`,
              height: `${imageIconSize}px`,
            }}
          />
        </ExternalLink>
      )}
    </StyledSocialMediaContainer>
  );
};
