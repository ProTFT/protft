import { Box, List, Select } from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "urql";
import { SuspenseElement } from "../../components/SuspendedPage";
import { getFlagEmoji } from "../../formatter/FlagEmoji";
import { Player } from "../../graphql/schema";
import {
  PlayerFilterQueryResult,
  PlayersQueryResult,
  PlayersQueryVariables,
  PLAYERS_QUERY,
  PLAYER_FILTERS_QUERY,
} from "./queries";

export const PlayersContainer = () => {
  const [countryFilter, setCountryFilter] = useState<string | undefined>(
    undefined
  );

  const [{ data: filterData }] = useQuery<PlayerFilterQueryResult>({
    query: PLAYER_FILTERS_QUERY,
  });

  return (
    <Box textAlign="center" display="flex" px="15%" pt={3}>
      <Select onChange={(event) => setCountryFilter(event.target.value)}>
        {filterData?.playerFilterMeta.possibleCountries.map(
          (country: string) => (
            <option key={country} value={country}>
              {getFlagEmoji(country)}
              {country}
            </option>
          )
        )}
      </Select>
      <SuspenseElement element={<Players countryFilter={countryFilter} />} />
    </Box>
  );
};

export const Players = ({ countryFilter }: any) => {
  const [{ data: playersData }] = useQuery<
    PlayersQueryResult,
    PlayersQueryVariables
  >({ query: PLAYERS_QUERY, variables: { country: countryFilter } });

  return (
    <List width="100%">
      {playersData?.players.map((player: Player) => (
        <Link key={player.id} to={String(player.id)}>
          <Box marginTop={4}>
            {getFlagEmoji(player?.country!)}
            {player.name}
          </Box>
        </Link>
      ))}
    </List>
  );
};
