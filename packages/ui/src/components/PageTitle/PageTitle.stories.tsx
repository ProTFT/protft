import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PageTitle } from ".";

export default {
  title: "Page Title",
  component: PageTitle,
} as ComponentMeta<typeof PageTitle>;

export const Base: ComponentStory<typeof PageTitle> = () => (
  <PageTitle text="Fates World Championship" />
);
