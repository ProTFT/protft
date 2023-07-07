import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Suspense } from "react";
import { Container } from "./Calendar.styled";
import { TournamentCalendar } from "./TournamentCalendar";
import { CalendarWrapper } from "../../components/Calendar/Calendar";

export const Calendar = () => {
  return (
    <Container>
      <Suspense
      // fallback={
      //   <CalendarWrapper>
      //     <FullCalendar
      //       plugins={[dayGridPlugin]}
      //       initialView="dayGridMonth"
      //       defaultAllDay={false}
      //       firstDay={1}
      //     />
      //   </CalendarWrapper>
      // }
      >
        <TournamentCalendar />
      </Suspense>
    </Container>
  );
};
