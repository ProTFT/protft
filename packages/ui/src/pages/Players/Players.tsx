import { useQuery } from "urql";
import { StyledSearchFilterBar } from "../../components/SearchFilterBar/SearchFilterBar";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import { StyledContainer } from "../Tournaments/Tournaments.styled";
import { PlayerCard } from "./components/PlayerCard";
import { StyledPlayersList } from "./Players.styled";
import {
  PlayersQueryResult,
  PlayersQueryVariables,
  PLAYERS_QUERY,
} from "./queries";

export const Players = ({ countryFilter, query }: any) => {
  const [{ data: playersData }] = useQuery<
    PlayersQueryResult,
    PlayersQueryVariables
  >({ query: PLAYERS_QUERY, variables: { country: countryFilter } });
  useDocumentTitle("ProTFT");

  return (
    <StyledContainer>
      <StyledSearchFilterBar />
      <StyledPlayersList>
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
      </StyledPlayersList>
    </StyledContainer>
  );
};
