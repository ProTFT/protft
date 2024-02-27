import { Stat } from "../../../components/Stat/Stat";
import { InnerSetDropdown } from "./SetDropdown";
import { StyledStatsContainer, StyledStatsSection } from "./Stats.styled";

export const StatsSkeleton = () => {
  return (
    <StyledStatsSection>
      <StyledStatsContainer>
        <Stat title="Matches" value={0} />
        <Stat title="Avg Pos" value={0} />
        <Stat title="Top 4 %" value={0} />
        <Stat title="Top 1 %" value={0} />
        <InnerSetDropdown
          onSelectOption={() => {}}
          selectedOption={1}
          sets={[]}
        />
      </StyledStatsContainer>
    </StyledStatsSection>
  );
};
