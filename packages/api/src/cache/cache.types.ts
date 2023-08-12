export interface GraphqlQueryContext {
  getContext: () => {
    req: {
      body: {
        query: string;
        variables: object;
      };
    };
  };
}

export type CacheKey = string | ((request: GraphqlQueryContext) => string);

export enum CacheCollections {
  PLAYERS,
}

export const CacheKeys: { [key in CacheCollections]: string } = {
  [CacheCollections.PLAYERS]: "players",
};
