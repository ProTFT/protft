import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import { useNavigate } from "react-router-dom";
import { getFlagEmoji } from "../../formatter/FlagEmoji";
import { Player, Tournament } from "../../graphql/schema";
import {
  PlayersQueryResult,
  PlayersQueryVariables,
  PLAYERS_QUERY,
} from "../Players/queries";
import {
  CreatePlayerResult,
  CreatePlayerVariables,
  CreateTournamentResult,
  CreateTournamentVariables,
  CREATE_PLAYER_QUERY,
  CREATE_TOURNAMENT_QUERY,
} from "./queries";

interface PlayerListProps {
  listItemFactory?: (player: Player) => any;
}

export const PlayerList = ({ listItemFactory }: PlayerListProps) => {
  const [{ data: players }] = useQuery<
    PlayersQueryResult,
    PlayersQueryVariables
  >({ query: PLAYERS_QUERY });

  const [filteredPlayers, setFilteredPlayers] = useState<
    PlayersQueryResult | undefined
  >(players);

  const [filterQuery, setFilterQuery] = useState<string>("");
  const defaultFactory = (player: Player) => (
    <Text key={player.id}>
      {getFlagEmoji(player.country!)}
      {player.name}
    </Text>
  );

  return (
    <Section>
      <Text>Player list</Text>
      <Input
        value={filterQuery}
        onChange={(event) => {
          setFilterQuery(event.target.value);
          setFilteredPlayers({
            players: players?.players.filter((player) =>
              player.name.toLowerCase().startsWith(event.target.value)
            ),
          } as PlayersQueryResult | undefined);
        }}
      />
      {filteredPlayers?.players.map(listItemFactory || defaultFactory)}
    </Section>
  );
};

export const Section = React.forwardRef<any, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <Box
      ref={ref}
      padding={3}
      borderWidth="3px"
      borderRadius="10px"
      borderColor="white"
    >
      {children}
    </Box>
  )
);

export const TournamentWizard = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [region, setRegion] = useState<string>();
  const [saveStatus, setSaveStatus] = useState<string>("Waiting");
  const [tournamentInput, setTournamentInput] = useState<Partial<Tournament>>(
    {}
  );

  const [, createPlayer] = useMutation<
    CreatePlayerResult,
    CreatePlayerVariables
  >(CREATE_PLAYER_QUERY);

  const [, createTournament] = useMutation<
    CreateTournamentResult,
    CreateTournamentVariables
  >(CREATE_TOURNAMENT_QUERY);

  const updateState = (
    stateUpdateFn: (value: any) => void,
    event: React.ChangeEvent<HTMLInputElement>
  ) => stateUpdateFn(event.target.value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTournamentInput({
      ...tournamentInput,
      [event.target.name]: event.target.value,
    });
  };

  const saveUser = async () => {
    if (name && country && region) {
      const payload = {
        name,
        country,
        region,
      };
      setSaveStatus("saving");
      createPlayer(payload)
        .then(() => setSaveStatus("saved"))
        .catch(() => setSaveStatus("error"));
    }
  };

  const onCreateTournament = async () => {
    const { name, setId } = tournamentInput;
    if (name && setId) {
      const payload = {
        name,
        setId: Number(setId),
      };
      const result = await createTournament(payload);
      navigate(`${result.data?.createTournament.id}`);
    }
  };

  return (
    <Box display="flex" px="15%" pt={3} flexDir="column">
      <Flex gap={3}>
        <PlayerList />
        <Section>
          <Text>Add Player</Text>
          <Text>Name</Text>
          <Input onChange={(event) => updateState(setName, event)}></Input>

          <Text>Country</Text>
          <Input onChange={(event) => updateState(setCountry, event)}></Input>

          <Text>Region</Text>
          <Input onChange={(event) => updateState(setRegion, event)}></Input>

          <Button onClick={saveUser}>Save</Button>
          <Text>{saveStatus}</Text>
        </Section>
        <Section>
          Tournament
          <Text>Name</Text>
          <Input name="name" onChange={(event) => handleChange(event)}></Input>
          <Text>Set ID</Text>
          <Input name="setId" onChange={(event) => handleChange(event)}></Input>
          <Text>Stages</Text>
          <Button onClick={onCreateTournament}>Save</Button>
        </Section>
      </Flex>
    </Box>
  );
};
