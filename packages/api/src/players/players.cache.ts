import { BadRequestException } from "@nestjs/common";
import {
  CacheCollections,
  CacheKeys,
  GraphqlQueryContext,
} from "../cache/cache.types";

export const ExtractPlayerCacheKeyFromRequest = (req: GraphqlQueryContext) => {
  const { id } = req.getContext().req.body.variables as {
    id: number;
  };
  if (!id) {
    throw new BadRequestException("Missing variable for cache!");
  }
  return `${CacheKeys[CacheCollections.PLAYERS]}/${id}`;
};
