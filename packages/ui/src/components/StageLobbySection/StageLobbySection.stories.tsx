import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
} from "@chakra-ui/react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { StageLobbySection } from ".";
import { lobby } from "../../generators/lobby";
import { Lobby, PlayerLobbyResult } from "../../graphql/schema";

export default {
  title: "Stage Lobby Section",
  component: StageLobbySection,
  decorators: [
    (Story) => (
      <Accordion defaultIndex={[0]} allowMultiple allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                Stage X
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <Story />
        </AccordionItem>
      </Accordion>
    ),
  ],
  argTypes: {
    numberOfRounds: {
      control: { type: "input" },
    },
  },
} as ComponentMeta<typeof StageLobbySection>;

const generatePlayers = (numberOfRounds: number) => {
  const possiblePositions = [1, 2, 3, 4, 5, 6, 7, 8];
  const players: PlayerLobbyResult[] = [
    { player: { id: 1, name: "Mortdog" }, positions: [], points: [] },
    { player: { id: 2, name: "Mortdragon" }, positions: [], points: [] },
    { player: { id: 3, name: "Mismatched Socks" }, positions: [], points: [] },
    { player: { id: 4, name: "Becca" }, positions: [], points: [] },
    { player: { id: 5, name: "vclf" }, positions: [], points: [] },
    { player: { id: 6, name: "riannzera" }, positions: [], points: [] },
    { player: { id: 7, name: "aggon" }, positions: [], points: [] },
    { player: { id: 8, name: "jirachy" }, positions: [], points: [] },
  ];
  for (let i = 0; i < numberOfRounds; i++) {
    const randomPositions = Object.assign(possiblePositions).sort(
      () => Math.random() - 0.5
    ) as number[];
    randomPositions.forEach((position, index) => {
      players[index].positions.push(position);
      players[index].points.push(9 - position);
    });
  }
  return players;
};

const lobbyWithNoRounds: Lobby[] = [lobby({})];

export const OneLobbyWithNoResults: ComponentStory<
  typeof StageLobbySection
> = () => <StageLobbySection lobbies={lobbyWithNoRounds} />;

const lobbyWithOneRound: Lobby[] = [
  lobby({ playersResults: generatePlayers(1) }),
];

export const OneLobbyWithOneRound: ComponentStory<
  typeof StageLobbySection
> = () => <StageLobbySection lobbies={lobbyWithOneRound} />;

const lobbyWithSeveralRounds: Lobby[] = [
  lobby({ playersResults: generatePlayers(4) }),
];

export const OneLobbyWithSeveralRounds: ComponentStory<
  typeof StageLobbySection
> = () => <StageLobbySection lobbies={lobbyWithSeveralRounds} />;

export const FinalsLobby: ComponentStory<typeof StageLobbySection> = () => (
  <StageLobbySection lobbies={lobbyWithSeveralRounds} isFinal={true} />
);
