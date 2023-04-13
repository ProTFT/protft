import { Resolver } from "@nestjs/graphql";

@Resolver({ isAbstract: true })
export abstract class BaseResolver {
  protected cleanGraphQLFilters = (filters: {
    [key: string]: string | string[] | number[] | undefined;
  }) => {
    return Object.keys(filters)
      .filter(
        (key) =>
          Boolean(filters[key]) &&
          ((Array.isArray(filters[key]) && filters[key].length > 0) ||
            !Array.isArray(filters[key])),
      )
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: filters[key],
        }),
        {},
      );
  };
}
