import { useMemo } from "react";
import { formatDateFromDB } from "../../formatter/Date";
import { StyledContainer, StyledDateText } from "./DateIndicator.styled";

interface Props {
  startDate: string;
  endDate: string;
}

export const DateIndicator = ({ startDate, endDate }: Props) => {
  const formattedStartDate = useMemo(
    () => formatDateFromDB(startDate),
    [startDate]
  );
  const formattedEndDate = useMemo(() => formatDateFromDB(endDate), [endDate]);
  return (
    <StyledContainer>
      <img src="/calendar.png" alt="calendar" />
      <StyledDateText>
        {formattedStartDate} - {formattedEndDate}
      </StyledDateText>
    </StyledContainer>
  );
};
