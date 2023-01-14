import React, { useCallback } from "react";
import { TextIconHorizontalContainer } from "../../../../../../components/Layout/HorizontalContainer/TextIconHorizontalContainer.styled";
import { RegionsIndicator } from "../../../../../../components/RegionIndicator/RegionIndicator";
import { Player } from "../../../../../../graphql/schema";
import { StyledPlayerName } from "../../../../Components/PlayerItem/PlayerItem.styled";
import { Results } from "../LobbyGroup/LobbyGroup";
import {
  StyledTournamentPlayerListSmaller,
  StyledTournamentPlayerListColumn,
  StyledLobbyName,
  StyledResultInput,
  StyledResultsInputContainer,
  StyledFakeTable,
} from "./LobbyContainer.styled";

interface DroppableContainerProps {
  content: Player[];
  name: string;
  roundsPlayed?: number;
  results: Results;
  onChangeResult: (playerId: number, index: number, value: number) => void;
}

export const LobbyContainer = ({
  content,
  name,
  roundsPlayed,
  results,
  onChangeResult,
}: DroppableContainerProps) => {
  const onChange = useCallback(
    (playerId: number, index: number) =>
      ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(target.value);
        onChangeResult(playerId, index, value);
      },
    [onChangeResult]
  );
  return (
    <StyledTournamentPlayerListSmaller>
      <StyledLobbyName>{`Lobby ${name}`}</StyledLobbyName>
      <StyledTournamentPlayerListColumn>
        {content.map((player) => (
          <StyledFakeTable key={player.id}>
            <TextIconHorizontalContainer>
              <RegionsIndicator
                regionCodes={[player.region!]}
                showName={false}
              />
              <StyledPlayerName>{player.name}</StyledPlayerName>
            </TextIconHorizontalContainer>
            <StyledResultsInputContainer>
              {new Array(roundsPlayed).fill(1).map((_, idx) => {
                const { positions } = results[player.id];
                return (
                  <div key={idx}>
                    <StyledResultInput
                      type="number"
                      value={positions[idx]}
                      onChange={onChange(player.id, idx)}
                    />
                  </div>
                );
              })}
            </StyledResultsInputContainer>
          </StyledFakeTable>
        ))}
      </StyledTournamentPlayerListColumn>
    </StyledTournamentPlayerListSmaller>
  );
};
