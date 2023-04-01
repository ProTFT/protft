import { useMemo } from "react";
import { useQuery } from "urql";
import { Drawer } from "../../../../components/Drawer/Drawer";
import {
  TournamentStreamQueryResponse,
  TOURNAMENT_STREAM_QUERY,
} from "./queries";
import { VideoList } from "./VideoList";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tournamentId?: number;
}

export const StreamDrawer = ({ isOpen, onClose, tournamentId }: Props) => {
  const [{ data }] = useQuery<TournamentStreamQueryResponse>({
    query: TOURNAMENT_STREAM_QUERY,
    variables: { tournamentId: Number(tournamentId) },
  });

  const { streams, vods } = useMemo(
    () => ({
      streams: data?.streamsOfTournament.filter((s) => !s.isVOD),
      vods: data?.streamsOfTournament.filter((s) => s.isVOD),
    }),
    [data?.streamsOfTournament]
  );

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      {streams?.length && <VideoList title="Streams" videos={streams} />}
      {vods?.length && <VideoList title="VODs" videos={vods} />}
    </Drawer>
  );
};
