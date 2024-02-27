import { useMemo } from "react";
import { Card } from "../../../../componentsNew/Card/Card";
import { CardBadge } from "../../../../componentsNew/Card/Card.styled";
import { TournamentQuery } from "../../../../gql/graphql";
import {
  FormatCardsContent,
  FormatCardsContainer,
} from "../../Tournament.styled";
import { useTournamentContext } from "../../TournamentContext";

interface FormatProps {
  title: string;
  startTime?: string;
}

type OneStage = Exclude<
  TournamentQuery["tournamentBySlug"]["stages"],
  null | undefined
>[0];

interface FormatStageCardProps {
  stage: OneStage;
}

const FormatStageCard = ({ stage }: FormatStageCardProps) => {
  const localeDateTime = useMemo(() => {
    if (!stage.startDateTime) {
      return null;
    }
    const dateFormatter = Intl.DateTimeFormat(undefined, {
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    return dateFormatter.format(new Date(stage.startDateTime));
  }, [stage.startDateTime]);
  return (
    <Card
      key={stage.id}
      title={stage.name}
      extraControl={
        <CardBadge tooltip={"In your time"}>{localeDateTime}</CardBadge>
      }
    >
      <FormatCardsContent>
        {stage.formatExplainer.map((stageFormat) => (
          <div>
            <p>{stageFormat}</p>
          </div>
        ))}
      </FormatCardsContent>
    </Card>
  );
};

export const Format = ({ title }: FormatProps) => {
  const tournament = useTournamentContext();

  // Sep 25, 01:30PM

  return (
    <FormatCardsContainer>
      {tournament?.stages?.map((stage) => {
        return <FormatStageCard stage={stage} />;
      })}
    </FormatCardsContainer>
  );
};
