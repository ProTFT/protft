import { useState } from "react";
import { PageWrapper } from "../../componentsNew/PageWrapper/PageWrapper";
import { Section } from "../../componentsNew/Section/Section";
import { TabHeader } from "../../componentsNew/TabHeader/TabHeader";
import { Table } from "../../componentsNew/Table/Table";
import { Star } from "../../design/iconsNew/Start";

export const TournamentNew = () => {
  const [selectedOption, setSelectedOption] = useState(1);
  return (
    <PageWrapper>
      <Section
        icon={<Star size={42} />}
        title="Infos"
        extraControls={
          <TabHeader
            options={[
              {
                id: 1,
                name: "Players",
              },
              {
                id: 2,
                name: "Format",
              },
              {
                id: 3,
                name: "Tie-breakers",
              },
            ]}
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        }
      >
        <Table />
      </Section>
    </PageWrapper>
  );
};
