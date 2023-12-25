import { useState } from "react";
import { useQuery } from "urql";
import { PageWrapper } from "../../componentsNew/PageWrapper/PageWrapper";
import { Section } from "../../componentsNew/Section/Section";
import { TabHeader } from "../../componentsNew/TabHeader/TabHeader";
import { Table } from "../../componentsNew/Table/Table";
import { Star } from "../../design/iconsNew/Start";
import {
  ResultsByLobbyGroupQueryResponse,
  RESULTS_BY_STAGE_QUERY,
} from "../Tournament/queries";

enum TAB_OPTIONS {
  Players = 1,
  Format = 2,
  Tiebreakers = 3,
}

export const TournamentNew = () => {
  const [selectedOption, setSelectedOption] = useState(TAB_OPTIONS.Players);
  const [{ data: overviewData }] = useQuery<ResultsByLobbyGroupQueryResponse>({
    query: RESULTS_BY_STAGE_QUERY,
    variables: { stageId: 410 },
    // pause: !selectedStage || currentView === ViewType.LOBBY,
  });

  return (
    <PageWrapper>
      <Section
        icon={<Star size={42} />}
        title="Infos"
        extraControls={
          <TabHeader
            options={[
              {
                id: TAB_OPTIONS.Players,
                name: "Players",
              },
              {
                id: TAB_OPTIONS.Format,
                name: "Format",
              },
              {
                id: TAB_OPTIONS.Tiebreakers,
                name: "Tie-breakers",
              },
            ]}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        }
      >
        {selectedOption === TAB_OPTIONS.Players && (
          <Table data={overviewData} />
        )}
        {selectedOption === TAB_OPTIONS.Format && <div>Format</div>}
      </Section>
    </PageWrapper>
  );
};
