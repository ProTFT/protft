import { SetMetadata } from "@nestjs/common";
import { CacheKey as CacheKeyType } from "./cache.types";

export const CacheKey = (cacheKey: CacheKeyType) =>
  SetMetadata("cacheKey", cacheKey);
