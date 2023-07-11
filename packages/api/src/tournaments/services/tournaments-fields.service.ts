import { Injectable } from "@nestjs/common";
import { DateTime } from "luxon";
import { StagesService } from "../../stages/stages.service";
import { Tournament } from "../entities/tournament.entity";

@Injectable()
export class TournamentsFieldsService {
  constructor(private stagesService: StagesService) {}

  async findNextStageStartTime({ id, endDate }: Tournament): Promise<number> {
    const currentDate = DateTime.now().toUTC();
    const tournamentEndDate = DateTime.fromISO(endDate.toISOString()).set({
      hour: 23,
      minute: 59,
    });

    if (currentDate > tournamentEndDate) {
      return 0;
    }

    const stages = await this.stagesService.findAllByTournament(id, ["rounds"]);
    const nextStage = stages.find((stage) => {
      const stageDateTime = DateTime.fromISO(stage.startDateTime);
      const stageDateTimeWithDuration = stageDateTime.plus({
        hour: stage.rounds.length,
      });
      if (stageDateTimeWithDuration < currentDate) {
        return false;
      }
      return true;
    });

    if (!nextStage) {
      return 0;
    }

    const nextStageDateTime = DateTime.fromISO(nextStage.startDateTime);
    const diff = nextStageDateTime.diff(currentDate, "milliseconds");
    return diff.milliseconds;
  }
}
