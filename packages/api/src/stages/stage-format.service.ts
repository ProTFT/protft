import { Injectable } from "@nestjs/common";
import { LobbiesService } from "../lobbies/lobbies.service";
import { Qualification } from "../qualification/qualification.entity";
import { QualificationService } from "../qualification/qualification.service";
import { RoundsService } from "../rounds/rounds.service";
import { StagesService } from "./stages.service";
import { StageType } from "./types/StageType";

@Injectable()
export class StageFormatService {
  constructor(
    private roundsService: RoundsService,
    private lobbiesService: LobbiesService,
    private qualificationService: QualificationService,
    private stageService: StagesService,
  ) {}

  public async getFormatExplainer(stageId: number): Promise<string[]> {
    const [stage, roundCount, lobbyGroups, qualifications] = await Promise.all([
      this.stageService.findOne(stageId),
      this.roundsService.countByStage(stageId),
      this.lobbiesService.findAllLobbyGroupsByStage(stageId),
      this.qualificationService.findAllByStage(stageId, [
        "stageToQualify",
        "tournamentToQualify",
      ]),
    ]);
    const { numberOfPlayers, stageType, tournamentId } = stage;
    const lobbyGroupCount = lobbyGroups.length;

    return [
      this.getGamesPlayed(numberOfPlayers, roundCount),
      this.getLobbyStructure(roundCount, lobbyGroupCount, stageType),
      this.getQualifications(qualifications, tournamentId),
    ].filter(Boolean);
  }

  private getGamesPlayed(numberOfPlayers: number, roundCount: number) {
    return `${numberOfPlayers} will play ${roundCount} games`;
  }

  private getLobbyStructure(
    roundCount: number,
    lobbyGroupCount: number,
    stageType: StageType,
  ) {
    if (stageType === StageType.GROUP_BASED) {
      return `Players are split into groups`;
    }
    if (lobbyGroupCount === 1) {
      return `Lobbies don't shuffle`;
    }
    const isSymetricShuffle = roundCount % lobbyGroupCount === 0;
    if (!isSymetricShuffle) {
      return `Lobbies shuffle`;
    }
    const numberOfShuffles = roundCount / lobbyGroupCount;
    if (numberOfShuffles === 1) {
      return `Lobbies will shuffle every game`;
    }
    return `Lobbies will shuffle every ${numberOfShuffles} games`;
  }

  private getQualifications(
    qualifications: Qualification[],
    currentTournamentId: number,
  ) {
    if (!qualifications || !qualifications.length) {
      return null;
    }
    return qualifications
      .map((qualification) => {
        const qualifyingToWhere = this.qualifyToWhere(
          qualification,
          currentTournamentId,
        );
        return `Top ${qualification.finalPosition} will advance to ${qualifyingToWhere}`;
      })
      .join("\n");
  }

  private qualifyToWhere(
    qualification: Qualification,
    currentTournamentId: number,
  ): string {
    const isSameTournament =
      qualification.qualifyToTournamentId === currentTournamentId;
    if (isSameTournament) {
      return qualification.stageToQualify.name;
    }

    const isQualifyingToSpecificStage = Boolean(qualification.qualifyToStageId);
    if (isQualifyingToSpecificStage) {
      return `${qualification.tournamentToQualify.name} - ${qualification.stageToQualify.name}`;
    }
    return qualification.tournamentToQualify.name;
  }
}
