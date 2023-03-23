import { RegionCode, regionCodeToName } from "../../../formatter/Region";
import { DataSelect } from "../DataSelect/DataSelect";

interface Props {
  value: string;
  onValueChange: (newValue: string | undefined) => void;
}

type SelectRegion = { id: string; label: string };

export const RegionSelect = ({ value, onValueChange }: Props) => {
  const data = {
    regions: Object.values(RegionCode)
      .filter((r) => r !== RegionCode.WO)
      .map((r) => ({ id: r, label: regionCodeToName(r) })),
  };
  const fetching = false;

  return (
    <DataSelect<string, SelectRegion>
      data={data.regions}
      valueKey="id"
      labelKey="label"
      value={value}
      onValueChange={onValueChange}
      isLoading={fetching}
      placeholder="NA, EMEA, China"
    />
  );
};
