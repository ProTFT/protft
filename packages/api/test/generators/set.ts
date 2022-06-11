import { Set } from "../../src/sets/set.entity";

type SetGeneratorParams = Partial<Set>;

export function set({ id, name }: SetGeneratorParams): Set {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    name: name || "",
  };
}
