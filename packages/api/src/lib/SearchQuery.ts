import { Injectable } from "@nestjs/common";
import { ILike } from "typeorm";

@Injectable()
export class SearchQuery {
  public getSearchQueryFilter(searchQuery?: string) {
    return searchQuery
      ? {
          name: ILike(`%${searchQuery.toLowerCase()}%`),
        }
      : {};
  }
}
