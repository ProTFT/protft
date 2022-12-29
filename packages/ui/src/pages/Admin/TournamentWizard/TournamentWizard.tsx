import React, { useState } from "react";
import { useMutation, useQuery } from "urql";
import { useNavigate } from "react-router-dom";
import { getFlagEmoji } from "../../../formatter/FlagEmoji";
import { Player, Tournament } from "../../../graphql/schema";
import {
  PlayersQueryResult,
  PlayersQueryVariables,
  PLAYERS_QUERY,
} from "../../Players/queries";
import {
  CreatePlayerResult,
  CreatePlayerVariables,
  CreateTournamentResult,
  CreateTournamentVariables,
  CREATE_PLAYER_QUERY,
  CREATE_TOURNAMENT_QUERY,
} from "./queries";
import { StyledVerticalContainer } from "../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import {
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledSection,
  StyledText,
  StyledTitle,
} from "./TournamentWizard.styled";

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
    <StyledText key={player.id}>
      {getFlagEmoji(player.country!)}
      {player.name}
    </StyledText>
  );

  return (
    <StyledSection>
      <StyledTitle>Player list</StyledTitle>
      <StyledInput
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
    </StyledSection>
  );
};

export const Section = React.forwardRef<any, React.PropsWithChildren<{}>>(
  ({ children }, ref) => (
    <div ref={ref} style={{ backgroundColor: "blue" }}>
      {children}
    </div>
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
    <StyledContainer>
      <PlayerList />
      <StyledSection>
        <StyledTitle>Add Player</StyledTitle>
        <StyledText>Name</StyledText>
        <StyledInput onChange={(event) => updateState(setName, event)} />

        <StyledText>Country</StyledText>
        <StyledInput onChange={(event) => updateState(setCountry, event)} />

        <StyledText>Region</StyledText>
        <StyledInput onChange={(event) => updateState(setRegion, event)} />

        <StyledButton onClick={saveUser}>Save</StyledButton>
        <StyledText>{saveStatus}</StyledText>
      </StyledSection>
      <StyledSection>
        <StyledTitle>Tournament</StyledTitle>
        <StyledText>Name</StyledText>
        <StyledInput name="name" onChange={(event) => handleChange(event)} />
        <StyledText>Set ID</StyledText>
        <StyledInput name="setId" onChange={(event) => handleChange(event)} />
        <StyledButton onClick={onCreateTournament}>Save</StyledButton>
      </StyledSection>
    </StyledContainer>
  );
};
