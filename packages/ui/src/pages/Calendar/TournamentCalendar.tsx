import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useCallback, useMemo, useState } from "react";
import { useQuery } from "urql";
import {
  DatesSetArg,
  EventClickArg,
  EventInput,
  EventSourceInput,
} from "@fullcalendar/core";
import { CalendarWrapper } from "../../components/Calendar/Calendar";
import { RegionCode } from "../../formatter/Region";
import { TOURNAMENT_BY_DATE } from "./queries";
import {
  TournamentsByDateQuery,
  TournamentsByDateQueryVariables,
} from "../../gql/graphql";

const regionColors: { [key in RegionCode]: string } = {
  [RegionCode.BR]: "darkgreen",
  [RegionCode.CN]: "darkblue",
  [RegionCode.KR]: "black",
  [RegionCode.EMEA]: "blue",
  [RegionCode.NA]: "red",
  [RegionCode.OCE]: "#C0CC27",
  [RegionCode.LA]: "#CC9527",
  [RegionCode.JP]: "white",
  [RegionCode.SEA]: "brown",
  [RegionCode.WO]: "#BB3CAF",
};

export const TournamentCalendar = () => {
  const [startFilterDate, setStartFilterDate] = useState<string>();
  const [endFilterDate, setEndFilterDate] = useState<string>();
  const [show, setShow] = useState(false);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);

  const [{ data }] = useQuery<
    TournamentsByDateQuery,
    TournamentsByDateQueryVariables
  >({
    query: TOURNAMENT_BY_DATE,
    variables: {
      region: undefined,
      startDate: startFilterDate!,
      endDate: endFilterDate!,
    },
    pause: !startFilterDate || !endFilterDate,
  });

  const events = useMemo<EventSourceInput | undefined>(() => {
    return data?.tournaments.map<EventInput>((tournament) => ({
      id: String(tournament.id),
      start: tournament.startDate,
      end: tournament.endDate,
      title: tournament.name,
      backgroundColor:
        regionColors[((tournament?.region || [])[0] as RegionCode) || ""] ||
        "blue",
    }));
  }, [data?.tournaments]);

  const onChangeMonth = useCallback(({ start, end }: DatesSetArg) => {
    const formatter = Intl.DateTimeFormat("en");
    setStartFilterDate(formatter.format(start));
    setEndFilterDate(formatter.format(end));
  }, []);

  const onEventClick = useCallback((clickEvent: EventClickArg) => {
    clickEvent.jsEvent.preventDefault();
    setTop(clickEvent.jsEvent.pageY);
    setLeft(clickEvent.jsEvent.pageX);
    setShow((curr) => !curr);
  }, []);

  return (
    <CalendarWrapper>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        defaultAllDay={false}
        events={events}
        eventTimeFormat={{
          hour: "2-digit",
          minute: "numeric",
          omitZeroMinute: true,
        }}
        eventDisplay="block"
        eventBorderColor="black"
        firstDay={1}
        datesSet={onChangeMonth}
        rerenderDelay={10}
        eventClick={onEventClick}
        displayEventTime={false}
        fixedWeekCount={false}
      />
      {show && (
        <div
          style={{
            backgroundColor: "blue",
            left,
            top,
            position: "absolute",
            zIndex: 1,
          }}
        >
          Test
        </div>
      )}
    </CalendarWrapper>
  );
};
