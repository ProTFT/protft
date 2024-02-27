import { ReactElement, useCallback, useState } from "react";
import { Title700 } from "../../design/fonts/NewFonts";
import { ChevronDown } from "../../design/iconsNew/ChevronDown";
import { theme } from "../../design/theme";
import {
  SectionBody,
  SectionContainer,
  SectionHeader,
  SectionHeaderControls,
  SectionCollapsible,
  SectionCollapseButton,
  SectionTitle,
  SectionNoDataBadge,
} from "./Section.styled";

export interface SectionProps {
  icon?: ReactElement;
  title?: string;
  extraControls?: ReactElement;
  disabled?: boolean;
}

export const Section = ({
  icon,
  title,
  extraControls,
  children,
  disabled = false,
}: React.PropsWithChildren<SectionProps>) => {
  const [isOpen, setIsOpen] = useState(true);

  const [collapsibleClass, setCollapsibleClass] = useState("open");

  const onClickArrow = useCallback(() => {
    setIsOpen((curr) => !curr);
    setCollapsibleClass(isOpen ? "open" : "closed");
  }, [isOpen]);

  return (
    <SectionContainer>
      <SectionHeader disabled={disabled}>
        <SectionTitle disabled={disabled}>
          {icon}
          <Title700>{title}</Title700>
        </SectionTitle>
        <SectionHeaderControls>
          {disabled ? (
            <SectionNoDataBadge
              color={theme.colors.newDesign.grayScale[70]}
              textColor={theme.colors.newDesign.grayScale[30]}
            >
              no data yet
            </SectionNoDataBadge>
          ) : (
            extraControls
          )}
        </SectionHeaderControls>
        {!disabled && (
          <SectionCollapseButton isOpen={isOpen}>
            <ChevronDown
              dataTestId="section-open-button"
              onClick={onClickArrow}
            />
          </SectionCollapseButton>
        )}
      </SectionHeader>
      <SectionCollapsible isOpen={isOpen} className={collapsibleClass}>
        <SectionBody>{children}</SectionBody>
      </SectionCollapsible>
    </SectionContainer>
  );
};
