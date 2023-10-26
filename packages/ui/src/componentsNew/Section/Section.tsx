import { ReactElement, useCallback, useState } from "react";
import { Title700 } from "../../design/fonts/NewFonts";
import { ChevronDown } from "../../design/iconsNew/ChevronDown";
import {
  SectionBody,
  SectionContainer,
  SectionHeader,
  SectionHeaderControls,
  SectionCollapsible,
  SectionCollapseButton,
  SectionTitle,
} from "./Section.styled";

export interface SectionProps {
  icon?: ReactElement;
  title?: string;
  extraControls?: ReactElement;
}

export const Section = ({
  icon,
  title,
  extraControls,
  children,
}: React.PropsWithChildren<SectionProps>) => {
  const [isOpen, setIsOpen] = useState(true);

  const [collapsibleClass, setCollapsibleClass] = useState("open");

  const onClickArrow = useCallback(() => {
    setIsOpen((curr) => !curr);
    setCollapsibleClass(isOpen ? "open" : "closed");
  }, [isOpen]);

  return (
    <SectionContainer>
      <SectionHeader>
        <SectionTitle>
          {icon}
          <Title700>{title}</Title700>
        </SectionTitle>
        <SectionHeaderControls>{extraControls}</SectionHeaderControls>
        <SectionCollapseButton isOpen={isOpen}>
          <ChevronDown
            dataTestId="section-open-button"
            onClick={onClickArrow}
          />
        </SectionCollapseButton>
      </SectionHeader>
      <SectionCollapsible isOpen={isOpen} className={collapsibleClass}>
        <SectionBody>{children}</SectionBody>
      </SectionCollapsible>
    </SectionContainer>
  );
};
