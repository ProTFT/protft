import { Resolver } from "@nestjs/graphql";

@Resolver({ isAbstract: true })
export abstract class BaseResolver {
  protected cleanGraphQLFilters = (filters: {
    [key: string]: string | undefined;
  }) => {
    return Object.keys(filters)
      .filter((key) => Boolean(filters[key]))
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: filters[key],
        }),
        {},
      );
  };
}
