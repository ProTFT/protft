import { useCallback, useState } from "react";
import { useMutation } from "urql";
import { ProTFTButton } from "../../../../../../components/Button/Button";
import { useToast } from "../../../../Components/Toast/Toast";
import {
  GenerateLobbiesResult,
  GenerateLobbiesVariables,
  GENERATE_LOBBIES_MUTATION,
} from "../queries";
import {
  StyledContainer,
  StyledInput,
  StyledText,
} from "./GenerateLobbies.styled";

interface Props {
  stageId: number;
  refetchLobbyGroups: () => void;
  onSetManual: () => void;
}

export const GenerateLobbies = ({
  stageId,
  refetchLobbyGroups,
  onSetManual,
}: Props) => {
  const [roundsPerLobby, setRoundsPerLobby] = useState<number>(0);
  const [, generateLobbies] = useMutation<
    GenerateLobbiesResult,
    GenerateLobbiesVariables
  >(GENERATE_LOBBIES_MUTATION);

  const { show } = useToast();

  const onGenerateLobbies = useCallback(async () => {
    const result = await generateLobbies({
      stageId: Number(stageId!),
      roundsPerLobbyGroup: roundsPerLobby,
    });
    if (result.error) {
      return alert(result.error);
    }
    show();
    refetchLobbyGroups();
  }, [generateLobbies, roundsPerLobby, stageId, show, refetchLobbyGroups]);

  return (
    <StyledContainer>
      <StyledText>How many rounds until lobby swap?</StyledText>
      <StyledInput
        type="number"
        value={roundsPerLobby}
        onChange={(event) =>
          setRoundsPerLobby(() => Number(event.target.value))
        }
      />
      <ProTFTButton onClick={onGenerateLobbies}>Generate Lobbies</ProTFTButton>
      <ProTFTButton onClick={onSetManual}>Create manually</ProTFTButton>
    </StyledContainer>
  );
};
