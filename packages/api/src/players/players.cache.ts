import { BadRequestException } from "@nestjs/common";
import {
  CacheCollections,
  CacheKeys,
  GraphqlQueryContext,
} from "../cache/cache.types";

export const ExtractPlayerCacheKeyFromRequest = (req: GraphqlQueryContext) => {
  const variables = req.getContext().req.body.variables as {
    id?: number;
    playerId?: number;
  };
  const id = variables.id || variables.playerId;
  if (!id) {
    throw new BadRequestException("Missing variable for cache!");
  }
  return `${CacheKeys[CacheCollections.PLAYERS]}/${id}`;
};
