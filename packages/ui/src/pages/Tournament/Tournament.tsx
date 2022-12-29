import { Suspense, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "urql";
import { StyledHorizontalContainer } from "../../components/Layout/HorizontalContainer/HorizontalContainer.styled";
import { RegionsIndicator } from "../../components/RegionIndicator/RegionIndicator";
import { TournamentContent } from "../../components/TournamentContent/TournamentContent";
import { colors } from "../../design/colors";
import { ArrowRightIcon } from "../../design/icons/ArrowRight";
import { Stage } from "../../graphql/schema";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { useIsMobile } from "../../hooks/useIsMobile";
import { InfoBar } from "./InfoBar/InfoBar";
import {
  ResultsQueryResponse,
  RESULTS_QUERY,
  TournamentQueryResponse,
  TOURNAMENT_QUERY,
} from "./queries";
import {
  StyledBodyContainer,
  StyledDay,
  StyledDaysContainer,
  StyledHeaderContainer,
  StyledStagesBottom,
  StyledStagesSection,
  StyledTitle,
  StyledSubsectionTitle,
  StyledSubsectionContainer,
  StyledStageInfoContainer,
  StyledStageInfoValue,
  StyledBattleIcon,
  StyledDayTitle,
  StyledDaySubtitle,
  StyledResultsContainer,
  StyledTournamentModeButton,
  StyledPlayerName,
  StyledTablePlayerHeader,
  StyledTableRoundHeader,
  StyledTableData,
  StyledTable,
  StyledArrowContainer,
  StyledTablePlayerName,
} from "./Tournament.styled";

export const Tournament = () => {
  const { tournamentId } = useParams();
  const [{ data }] = useQuery<TournamentQueryResponse>({
    query: TOURNAMENT_QUERY,
    variables: { id: Number(tournamentId) },
  });

  useDocumentTitle(`${data?.tournament.name}`);

  const [open, setOpen] = useState(false);
  const [openStage, setOpenStage] = useState<Stage | null>(null);

  const isMobile = useIsMobile();

  return (
    <div>
      <StyledHeaderContainer>
        <TournamentContent tournament={data!.tournament} />
      </StyledHeaderContainer>
      <StyledBodyContainer>
        {isMobile && (
          <InfoBar
            participantsNumber={data?.tournament.participantsNumber}
            prizePool={data?.tournament.prizePool}
          />
        )}
        <StyledStagesSection>
          <StyledHorizontalContainer>
            <StyledBattleIcon />
            <StyledTitle>Stages</StyledTitle>
          </StyledHorizontalContainer>
          <StyledSubsectionContainer>
            <StyledStageInfoContainer>
              <StyledSubsectionTitle>HOST</StyledSubsectionTitle>
              <StyledStageInfoValue>
                {data?.tournament.host}
              </StyledStageInfoValue>
            </StyledStageInfoContainer>
            <StyledStageInfoContainer>
              <StyledSubsectionTitle>SET</StyledSubsectionTitle>
              <StyledStageInfoValue>{`${data?.tournament.set.id} - ${data?.tournament.set.name}`}</StyledStageInfoValue>
            </StyledStageInfoContainer>
          </StyledSubsectionContainer>
        </StyledStagesSection>
        <StyledStagesBottom>
          <StyledDaysContainer>
            {data?.tournament.stages?.map((stage) => (
              <StyledDay
                key={stage.id}
                isFinal={stage.isFinal}
                clicked={openStage?.id === stage.id}
              >
                <StyledDayTitle isFinal={stage.isFinal}>
                  {stage.name}
                </StyledDayTitle>
                {!stage.isFinal && false && (
                  <StyledDaySubtitle>{stage.name}</StyledDaySubtitle>
                )}
                <StyledArrowContainer>
                  <ArrowRightIcon
                    color={stage.isFinal ? colors.pitchBlack : colors.yellow}
                    onClick={() => {
                      setOpen((v) => !v);
                      setOpenStage((open) => (open ? null : stage));
                    }}
                  />
                </StyledArrowContainer>
              </StyledDay>
            ))}
          </StyledDaysContainer>
        </StyledStagesBottom>
        <Suspense fallback={null}>
          <Results open={open} selectedStage={openStage} />
        </Suspense>
      </StyledBodyContainer>
    </div>
  );
};
export const Results = ({
  open,
  selectedStage,
}: {
  open: boolean;
  selectedStage: Stage | null;
}) => {
  const [{ data }] = useQuery<ResultsQueryResponse>({
    query: RESULTS_QUERY,
    variables: { stageId: selectedStage?.id },
    pause: !selectedStage,
  });

  return (
    <StyledResultsContainer show={open}>
      {false && (
        <StyledTournamentModeButton>Lobbies</StyledTournamentModeButton>
      )}
      <StyledTable>
        <thead>
          <tr>
            <StyledTableRoundHeader>#</StyledTableRoundHeader>
            <StyledTablePlayerHeader>Player</StyledTablePlayerHeader>
            <StyledTableRoundHeader>P</StyledTableRoundHeader>
            {new Array(selectedStage?.roundCount).fill(0).map((_, index) => (
              <StyledTableRoundHeader key={index}>{`R${
                index + 1
              }`}</StyledTableRoundHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.resultsByStage.map(({ player, points, positions }, index) => (
            <tr key={player.id}>
              <StyledTableData>{index + 1}</StyledTableData>
              <td>
                <Link to={`/players/${player.id}`}>
                  <StyledTablePlayerName>
                    <RegionsIndicator
                      regionCodes={[player.region!]}
                      showName={false}
                    />
                    <StyledPlayerName>{player.name}</StyledPlayerName>
                  </StyledTablePlayerName>
                </Link>
              </td>
              <StyledTableData>
                {points.reduce((prev, cur) => prev + cur, 0)}
              </StyledTableData>
              {positions.map((position, index) => (
                <StyledTableData key={index} highlighted={position <= 4}>
                  {position}
                </StyledTableData>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledResultsContainer>
  );
};
