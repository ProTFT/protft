import styled, { css } from "styled-components";

export const CalendarWrapper = styled.div`
  ${({ theme }) => css`
    .fc .fc-toolbar {
      color: ${theme.colors.yellow};
      font-family: VTF Redzone Classic;
    }

    .fc-col-header-cell-cushion {
      color: ${theme.colors.yellow};
      font-family: VTF Redzone Classic;
      font-size: 32px;
    }

    .fc-daygrid-day-top {
      background-color: #1f1f1f;
      font-size: 20px;
      margin-bottom: 1rem;
    }

    .fc-daygrid-day-number {
      color: white;
      font-family: Roboto;
    }

    .fc-event-main {
      font-family: Roboto;
      font-size: 16px;
      padding: 0.2rem;
      cursor: pointer;
    }
  `}
`;
