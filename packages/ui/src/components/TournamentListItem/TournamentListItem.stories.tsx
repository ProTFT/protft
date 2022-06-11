import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { TournamentListItem } from ".";
import { Tournament } from "../../graphql/schema";
export default {
  title: "Tournament List Item",
  component: TournamentListItem,
} as ComponentMeta<typeof TournamentListItem>;

export const Base: ComponentStory<typeof TournamentListItem> = () => (
  <TournamentListItem tournament={{} as Tournament} />
);
