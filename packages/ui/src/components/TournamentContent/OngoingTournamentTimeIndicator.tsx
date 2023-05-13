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

const formatRemainingTime = (duration: number) => {
  const minutes = Math.floor((duration / (1000 * 60)) % 60);
  const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  const stringHours = hours < 10 ? "0" + hours : hours;
  const stringMinutes = minutes < 10 ? "0" + minutes : minutes;

  return stringHours + ":" + stringMinutes;
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
