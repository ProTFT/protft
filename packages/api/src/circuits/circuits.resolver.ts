import { UseGuards } from "@nestjs/common";
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from "@nestjs/graphql";
import { GqlJwtAuthGuard } from "../auth/jwt-auth.guard";
import { DeleteResponse } from "../lib/dto/delete-return";
import { SetsService } from "../sets/sets.service";
import { Circuit } from "./circuit.entity";
import { CircuitsService } from "./circuits.service";
import { CreateCircuitArgs } from "./dto/create-circuit.args";
import { DeleteCircuitArgs } from "./dto/delete-circuit.args";
import { UpdateCircuitArgs } from "./dto/update-circuit.args";

@Resolver(() => Circuit)
export class CircuitsResolver {
  constructor(
    private circuitsService: CircuitsService,
    private setsService: SetsService,
  ) {}

  @Query(() => [Circuit])
  async circuits() {
    return this.circuitsService.findAll();
  }

  @Query(() => Circuit, { nullable: true })
  async circuit(@Args("id", { type: () => Int }) id: number) {
    return this.circuitsService.findOne(id);
  }

  @ResolveField()
  async set(@Parent() circuit: Circuit) {
    return this.setsService.findOne(circuit.setId);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Circuit)
  async createCircuit(@Args() payload: CreateCircuitArgs) {
    return this.circuitsService.createOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => Circuit)
  async updateCircuit(@Args() payload: UpdateCircuitArgs) {
    return this.circuitsService.updateOne(payload);
  }

  @UseGuards(GqlJwtAuthGuard)
  @Mutation(() => DeleteResponse)
  async deleteCircuit(@Args() payload: DeleteCircuitArgs) {
    return this.circuitsService.deleteOne(payload);
  }
}
