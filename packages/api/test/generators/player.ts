import { Player } from "../../src/players/player.entity";
import { BaseProps } from "./base-props";

type PlayerGeneratorParams = Partial<Player>;

export function player({
  id,
  name,
  region,
  country,
  alias,
  slug,
  links,
}: PlayerGeneratorParams): Player {
  const randomId = Math.random() * 999;
  return {
    id: id || randomId,
    name: name || "",
    region: region || "",
    country: country || "",
    alias: alias || [],
    playerStats: null,
    alias: alias || [],
    slug: slug || "",
    links: links || [],
    ...BaseProps(),
  };
}
