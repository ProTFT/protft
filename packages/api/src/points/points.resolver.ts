import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { PointSchema } from "./point.entity";
import { PointSchemasService } from "./points.service";

@Resolver(() => PointSchema)
export class PointSchemasResolver {
  constructor(private pointSchemasService: PointSchemasService) {}

  @Query(() => [PointSchema])
  async pointSchemas() {
    return this.pointSchemasService.findAll();
  }

  @Query(() => PointSchema, { nullable: true })
  async pointSchema(@Args("id", { type: () => Int }) id: number) {
    return this.pointSchemasService.findOne(id);
  }
}
