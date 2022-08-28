import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  Box,
} from "@chakra-ui/react";
import { Suspense } from "react";
import { Stage } from "../../graphql/schema";
import { NewStageLobbySection } from "../StageLobbySection/index-stage";

interface TournamentStageSectionProps {
  stages?: Stage[] | null;
}

export const TournamentStageSection = ({
  stages,
}: TournamentStageSectionProps) => (
  <Accordion allowMultiple allowToggle display="flex" flexDirection="column">
    {stages?.map(({ id, name, roundCount }) => (
      <AccordionItem key={id} display="flex" flexDir="column">
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {name}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            {isExpanded ? (
              <Suspense fallback={<div>Loading</div>}>
                <NewStageLobbySection stageId={id} roundCount={roundCount} />
              </Suspense>
            ) : (
              <></>
            )}
          </>
        )}
      </AccordionItem>
    ))}
  </Accordion>
);
