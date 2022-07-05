// Represents an entity without the ID, with all properties optional but the ones passed on the second parameter
export type MutationPayload<T, TRequired extends keyof T> = Partial<
  Omit<T, "id">
> &
  Pick<T, TRequired>;
