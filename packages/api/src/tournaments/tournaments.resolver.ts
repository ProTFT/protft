import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { SetsService } from "../sets/sets.service";
import { StagesService } from "../stages/stages.service";
import { Tournament } from "./tournament.entity";
import { TournamentsService } from "./tournaments.service";

@Resolver(() => Tournament)
export class TournamentsResolver {
  constructor(
    private tournamentsService: TournamentsService,
    private setService: SetsService,
    private stagesService: StagesService,
  ) {}

  @Query(() => [Tournament])
  async tournaments() {
    return this.tournamentsService.findAll();
  }

  @Query(() => Tournament)
  async tournament(@Args("id", { type: () => Int }) id: number) {
    return this.tournamentsService.findOne(id);
  }

  @ResolveField()
  async set(@Parent() tournament: Tournament) {
    const { setId } = tournament;
    return this.setService.findOne(setId);
  }

  @ResolveField()
  async stages(@Parent() tournament: Tournament) {
    const { id } = tournament;
    return this.stagesService.findAllByTournament(id);
  }

  @Mutation(() => Tournament)
  async createTournament(
    @Args({ name: "name" }) name: string,
    @Args({ name: "setId" }) setId: number,
    @Args({ name: "region", nullable: true, type: () => [String] })
    region?: string[],
    @Args({ name: "host", nullable: true }) host?: string,
    @Args({ name: "participantsNumber", nullable: true })
    participantsNumber?: number,
    @Args({ name: "prizePool", nullable: true }) prizePool?: number,
    @Args({ name: "startDate", nullable: true }) startDate?: Date,
    @Args({ name: "endDate", nullable: true }) endDate?: Date,
  ) {
    const payload = {
      name,
      region,
      host,
      participantsNumber,
      prizePool,
      startDate,
      endDate,
      setId,
    };
    return this.tournamentsService.createOne(payload);
  }
}
