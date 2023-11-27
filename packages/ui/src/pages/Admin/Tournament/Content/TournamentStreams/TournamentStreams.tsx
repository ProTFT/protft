import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "urql";
import { ProTFTButton } from "../../../../../components/Button/Button";
import { useRef, useCallback } from "react";
import { TournamentStream } from "../../../../../graphql/schema";
import { useToast } from "../../../Components/Toast/Toast";
import { StyledVerticalContainer } from "../../../../../components/Layout/VerticalContainer/VerticalContainer.styled";
import { TournamentStreamDialog } from "../../../Components/Dialogs/StreamDialog/StreamDialog";
import { DeleteButton } from "../../../Components/DeleteButton/DeleteButton";
import {
  StyledButtonBar,
  StyledStagesContainer,
} from "../TournamentStages/TournamentStages.styled";
import {
  ADD_STREAM_MUTATION,
  CreateStreamResult,
  CreateStreamVariables,
  DeleteStreamResult,
  DeleteStreamVariables,
  DELETE_STREAM_MUTATION,
  TournamentStreamQueryResponse,
  TOURNAMENT_STREAM_QUERY,
} from "./queries";
import {
  StreamCardBody,
  StreamCardDeleteButton,
  StreamList,
  StreamListContainer,
  StreamListItem,
} from "./TournamentStreams.styled";
import { StyledBody } from "../../../../../design/fonts/Fonts";

export const TournamentStreams = () => {
  const { id: tournamentId } = useParams();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const { show } = useToast();

  const [{ data }, refetch] = useQuery<TournamentStreamQueryResponse>({
    query: TOURNAMENT_STREAM_QUERY,
    variables: { tournamentId: Number(tournamentId) },
  });

  const [, createStream] = useMutation<
    CreateStreamResult,
    CreateStreamVariables
  >(ADD_STREAM_MUTATION);

  const [, deleteStream] = useMutation<
    DeleteStreamResult,
    DeleteStreamVariables
  >(DELETE_STREAM_MUTATION);

  const onSubmit = useCallback(
    async (stream: Omit<TournamentStream, "tournamentId" | "isLive">) => {
      const result = await createStream({
        tournamentId: Number(tournamentId),
        isLive: false,
        ...stream,
      });
      if (result.error) {
        return alert(result.error);
      }
      show();
      formRef.current?.reset();
      dialogRef.current?.close();
      refetch();
    },
    [createStream, refetch, show, tournamentId]
  );

  const onDeleteStream = useCallback(
    (tournamentId: number, name: string) => async () => {
      const result = await deleteStream({
        tournamentId: Number(tournamentId),
        name,
      });
      if (result.error) {
        return alert(result.error);
      }
      show();
      formRef.current?.reset();
      dialogRef.current?.close();
      refetch();
    },
    [deleteStream, refetch, show]
  );

  const onClickNewStream = useCallback(() => {
    dialogRef.current?.showModal();
  }, []);

  return (
    <StyledVerticalContainer>
      <TournamentStreamDialog
        dialogRef={dialogRef}
        formRef={formRef}
        onSubmit={onSubmit}
      />
      <StyledButtonBar>
        <ProTFTButton width="20%" onClick={onClickNewStream}>
          Add stream
        </ProTFTButton>
      </StyledButtonBar>
      <StreamListContainer>
        <StreamList>
          {data?.streamsOfTournament.map(
            ({ name, tournamentId, link, language, isVOD }) => (
              <StreamListItem>
                <StreamCardBody>
                  <StyledBody>{name}</StyledBody>
                  <StyledBody>{link}</StyledBody>
                  <StyledBody>Language: {language}</StyledBody>
                  <StyledBody>Type: {isVOD ? "VOD" : "Stream"}</StyledBody>
                </StreamCardBody>
                <StreamCardDeleteButton>
                  <DeleteButton onClick={onDeleteStream(tournamentId, name)} />
                </StreamCardDeleteButton>
              </StreamListItem>
            )
          )}
        </StreamList>
      </StreamListContainer>
    </StyledVerticalContainer>
  );
};
