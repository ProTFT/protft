import { Box, Input, Select, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
  const [countryFilter, setCountryFilter] = useState<string>("");

  const [playerNameInput, setPlayerNameInput] = useState<string>("");

  const [{ data: filterData }] = useQuery<PlayerFilterQueryResult>({
    query: PLAYER_FILTERS_QUERY,
  });

  return (
    <Box textAlign="center" display="flex" px="20%" pt={3} flexDir="column">
      <Box display="flex" gap={10}>
        <div>
          <Text>Player name</Text>
          <Input
            onChange={(event) => {
              setPlayerNameInput(event.target.value);
            }}
          ></Input>
        </div>
        <div>
          <Text>Country</Text>
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
        </div>
      </Box>
      <SuspenseElement
        element={
          <Players countryFilter={countryFilter} query={playerNameInput} />
        }
      />
    </Box>
  );
};

export const Players = ({ countryFilter, query }: any) => {
  const [{ data: playersData }] = useQuery<
    PlayersQueryResult,
    PlayersQueryVariables
  >({ query: PLAYERS_QUERY, variables: { country: countryFilter } });
  const borderColor = useColorModeValue("black", "white");

  useEffect(() => {
    document.title = "ProTFT";
  }, []);
  return (
    <Box display="flex" gap={10} flexWrap="wrap">
      {playersData?.players
        .filter((player) =>
          player.name.toLowerCase().includes(query.toLowerCase())
        )
        .map((player: Player) => (
          <Link key={player.id} to={String(player.id)}>
            <Box
              marginTop={4}
              borderColor={borderColor}
              borderWidth="thin"
              padding={2}
              borderRadius="md"
              textAlign="left"
              flex="1 1 0"
            >
              <p>Name: {player.name}</p>
              <p>
                Country: {getFlagEmoji(player?.country!)} {player.country}
              </p>
              <p>Region: {player.region}</p>
            </Box>
          </Link>
        ))}
    </Box>
  );
};
