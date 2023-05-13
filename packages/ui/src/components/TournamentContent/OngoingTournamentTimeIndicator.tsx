import { useEffect, useState } from "react";
import { LiveIndicator } from "../LiveIndicator/LiveIndicator";
import {
  TournamentTimeLeft,
  TournamentTimeLeftContainer,
  TournamentTimeLeftSubtitle,
} from "./TournamentContent.styled";

interface Props {
  nextStartTime: number;
}

const formatRemainingTime = (milliseconds: number) => {
  const date = new Date(milliseconds);
  return date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h24",
  });
};

export const OngoingTournamentTimeIndicator = ({ nextStartTime }: Props) => {
  const [remainingTime, setRemainingTime] = useState<number>(
    nextStartTime || 0
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime((curr) => curr - 1000);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  if (nextStartTime <= 0 || (nextStartTime && !remainingTime)) {
    return <LiveIndicator />;
  }
  return (
    <TournamentTimeLeftContainer>
      <TournamentTimeLeftSubtitle>In</TournamentTimeLeftSubtitle>
      <TournamentTimeLeft>
        {formatRemainingTime(remainingTime)}
      </TournamentTimeLeft>
    </TournamentTimeLeftContainer>
  );
};
