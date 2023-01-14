import { useCallback, useState } from "react";
import { useMutation } from "urql";
import { ProTFTButton } from "../../../../../../components/Button/Button";
import {
  GenerateLobbiesResult,
  GenerateLobbiesVariables,
  GENERATE_LOBBIES_MUTATION,
} from "../queries";

interface Props {
  stageId: number;
}

export const GenerateLobbies = ({ stageId }: Props) => {
  const [roundsPerLobby, setRoundsPerLobby] = useState<number>(0);
  const [, generateLobbies] = useMutation<
    GenerateLobbiesResult,
    GenerateLobbiesVariables
  >(GENERATE_LOBBIES_MUTATION);

  const onGenerateLobbies = useCallback(async () => {
    const result = await generateLobbies({
      stageId: Number(stageId!),
      roundsPerLobbyGroup: roundsPerLobby,
    });
    if (result.error) {
      alert(result.error);
    }
  }, [generateLobbies, roundsPerLobby, stageId]);

  return (
    <>
      <input
        type="number"
        value={roundsPerLobby}
        onChange={(event) =>
          setRoundsPerLobby(() => Number(event.target.value))
        }
      />
      <ProTFTButton onClick={onGenerateLobbies}>Generate Lobbies</ProTFTButton>
    </>
  );
};
