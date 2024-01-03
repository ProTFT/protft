import { useMemo } from "react";
import { S3_FOLDER_PATH } from "../../aws/Constants";
import {
  RegionImage,
  RegionsIndicator,
} from "../../components/RegionIndicator/RegionIndicator";
import { Star } from "../../design/iconsNew/Star";
import { formatDateFromDB } from "../../formatter/Date";
import { RegionCode, regionCodeToName } from "../../formatter/Region";
import { Tournament } from "../../gql/graphql";
import { Badge } from "../Badge/Badge";
import {
  TournamentHeaderContainer,
  TournamentHeaderImage,
  TournamentHeaderTagsContainer,
  TournamentHeaderTitleContainer,
} from "./TournamentHeader.styled";

interface TournamentHeaderProps {
  tournament?: Pick<
    Tournament,
    | "set"
    | "setId"
    | "name"
    | "region"
    | "host"
    | "startDate"
    | "endDate"
    | "prizePool"
    | "currency"
  >;
}

export const TournamentHeader = ({ tournament }: TournamentHeaderProps) => {
  const formattedStartDate = formatDateFromDB(tournament?.startDate);
  const formattedEndDate = formatDateFromDB(tournament?.endDate);
  const tournamentRegion = useMemo<RegionCode>(() => {
    const regions = tournament?.region;
    if (!regions) {
      return RegionCode.WO;
    }
    return regions[0] as RegionCode;
  }, [tournament?.region]);

  return (
    <TournamentHeaderContainer>
      <TournamentHeaderImage
        src={`${S3_FOLDER_PATH}/sets/${tournament?.setId}.webp`}
        alt={tournament?.set.name}
      />
      <TournamentHeaderTitleContainer>
        <p>{tournament?.set.name}</p>
        <h1>{tournament?.name}</h1>
      </TournamentHeaderTitleContainer>
      <TournamentHeaderTagsContainer>
        <Badge icon={<RegionImage countryCode={tournamentRegion} size={1.8} />}>
          {regionCodeToName(tournamentRegion)}
        </Badge>
        <Badge icon={<Star size={24} />}>{tournament?.host}</Badge>
        <Badge icon={<Star size={24} />}>
          {formattedStartDate} - {formattedEndDate}
        </Badge>
        <Badge icon={<Star size={24} />}>
          {tournament?.currency} {tournament?.prizePool}
        </Badge>
      </TournamentHeaderTagsContainer>
    </TournamentHeaderContainer>
  );
};
