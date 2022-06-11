import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SectionTitle } from ".";

export default {
  title: "Section Title",
  component: SectionTitle,
} as ComponentMeta<typeof SectionTitle>;

export const Base: ComponentStory<typeof SectionTitle> = () => (
  <SectionTitle text="Stages" />
);
