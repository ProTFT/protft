import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { Card } from "../../componentsNew/Card/Card";
import { CardBadge } from "../../componentsNew/Card/Card.styled";
import { PageWrapper } from "../../componentsNew/PageWrapper/PageWrapper";
import { Section } from "../../componentsNew/Section/Section";
import { Switch } from "../../componentsNew/Switch/Switch";
import {
  TabHeader,
  TabHeaderVariant,
} from "../../componentsNew/TabHeader/TabHeader";
import { Table, TableResult } from "../../componentsNew/Table/Table";
import { TiebreakerRow } from "../../componentsNew/TiebreakerRow/TiebreakerRow";
import { TournamentHeader } from "../../componentsNew/TournamentHeader/TournamentHeader";
import { H3Med500 } from "../../design/fonts/NewFonts";
import { InfoOutlined } from "../../design/iconsNew/InfoOutlined";
import { StatsOutlined } from "../../design/iconsNew/StatsOutlined";
import { StreamOutlined } from "../../design/iconsNew/StreamOutlined";
import { SwordsOutlined } from "../../design/iconsNew/SwordsOutlined";
import { TrophyOutlined } from "../../design/iconsNew/TrophyOutlined";
import { QueryTournamentBySlugArgs, TournamentQuery } from "../../gql/graphql";
import {
  ResultsByLobbyGroupQueryResponse,
  RESULTS_BY_STAGE_QUERY,
  TournamentBySlugQueryResponse,
  TOURNAMENT_BY_SLUG_QUERY,
} from "../Tournament/queries";
import {
  FormatCardsContainer as FormatCardsLayout,
  FormatCardsContent,
  FormatTiebreakersContent,
  InfoCardContainer,
  StageExtraControlsContainer,
  StageHeader,
  StageSelectorContainer,
  TournamentContainer,
} from "./Tournament.styled";

enum TAB_OPTIONS {
  Players = 1,
  Format = 2,
  Tiebreakers = 3,
}

const SECTION_ICON_SIZE = 42;

export const TournamentNew = () => {
  const { tournamentSlug } = useParams();
  const [selectedOption, setSelectedOption] = useState(TAB_OPTIONS.Format);
  const [selectedStage, setSelectedStage] = useState(1);
  const [{ data: tournamentData }] = useQuery<
    TournamentQuery,
    QueryTournamentBySlugArgs
  >({
    query: TOURNAMENT_BY_SLUG_QUERY,
    variables: { slug: tournamentSlug! },
  });
  const [{ data: overviewData }] = useQuery<ResultsByLobbyGroupQueryResponse>({
    query: RESULTS_BY_STAGE_QUERY,
    variables: { stageId: 410 },
    // pause: !selectedStage || currentView === ViewType.LOBBY,
  });

  const treatedData = useMemo<TableResult[]>(() => {
    const fetchedResults = overviewData?.resultsByStage;
    return (
      fetchedResults?.map((result) => ({
        country: result.player.country || "",
        name: result.player.name,
        positions: result.positions,
        totalPoints: result.points.reduce((a, b) => a + b, 0),
      })) ?? ([] as TableResult[])
    );
  }, [overviewData?.resultsByStage]);

  return (
    <>
      <TournamentHeader tournament={tournamentData?.tournamentBySlug} />
      <PageWrapper>
        <TournamentContainer>
          <Section
            icon={<InfoOutlined size={SECTION_ICON_SIZE} />}
            title="Infos"
            extraControls={
              <TabHeader
                options={[
                  {
                    id: TAB_OPTIONS.Format,
                    name: "Format",
                  },
                  // {
                  //   id: TAB_OPTIONS.Players,
                  //   name: "Players",
                  // },
                  {
                    id: TAB_OPTIONS.Tiebreakers,
                    name: "Tiebreakers",
                  },
                ]}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
            }
          >
            {selectedOption === TAB_OPTIONS.Format && (
              <InfoCardContainer>
                <H3Med500>Format</H3Med500>
                <FormatCardsLayout>
                  <Card
                    title="Day 1"
                    extraControl={
                      <CardBadge tooltip={"In your time"}>
                        Sep 25, 01:30PM
                      </CardBadge>
                    }
                  >
                    <FormatCardsContent>
                      <div>
                        <p>128 players will play 6 games</p>
                      </div>

                      <div>
                        <p>Lobbies will shuffle every 2 games</p>
                      </div>

                      <div>
                        <p>Top 64 will advance to Day 2</p>
                      </div>

                      <div>
                        <p>
                          Bonus points are awarded at the end of the day to
                          begin Day 2 with:
                        </p>
                      </div>
                    </FormatCardsContent>
                  </Card>
                </FormatCardsLayout>
              </InfoCardContainer>
            )}
            {selectedOption === TAB_OPTIONS.Tiebreakers && (
              <InfoCardContainer>
                <H3Med500>Tiebreakers</H3Med500>
                <FormatCardsLayout>
                  <Card title="All stages">
                    <FormatTiebreakersContent>
                      <TiebreakerRow />
                      <TiebreakerRow />
                      <TiebreakerRow />
                    </FormatTiebreakersContent>
                  </Card>
                </FormatCardsLayout>
              </InfoCardContainer>
            )}
          </Section>
          <Section
            title="Stages"
            icon={<SwordsOutlined size={SECTION_ICON_SIZE} />}
          >
            <StageHeader>
              <StageSelectorContainer>
                <TabHeader
                  options={[
                    {
                      id: 1,
                      name: "Day 1",
                      variant: TabHeaderVariant.MARKED,
                    },
                    {
                      id: 2,
                      name: "Day 2",
                    },
                    {
                      id: 3,
                      name: "Finals",
                      variant: TabHeaderVariant.INACTIVE,
                    },
                  ]}
                  selectedOption={selectedStage}
                  setSelectedOption={setSelectedStage}
                />
              </StageSelectorContainer>
              <StageExtraControlsContainer>
                <Switch />
              </StageExtraControlsContainer>
            </StageHeader>
            <Table
              numberOfRounds={3}
              qualificationRules={[]}
              results={treatedData}
            />
          </Section>
          {/* <Section
            title="Stats"
            icon={<StatsOutlined size={SECTION_ICON_SIZE} />}
          /> */}
          <Section
            title="Ranking"
            icon={<TrophyOutlined size={SECTION_ICON_SIZE} />}
          ></Section>
          <Section
            title="Streams"
            icon={<StreamOutlined size={SECTION_ICON_SIZE} />}
          ></Section>
        </TournamentContainer>
      </PageWrapper>
    </>
  );
};
