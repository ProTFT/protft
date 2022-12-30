import { useCallback, useState } from "react";
import { CheckEmptyIcon } from "../../design/icons/CheckEmpty";
import { CheckMarkedIcon } from "../../design/icons/CheckMarked";

interface Props {
  field: string;
  onChange: (event: [string, boolean]) => void;
}

export const Checkbox = ({ field, onChange }: Props) => {
  const [selected, setSelected] = useState(false);
  const onClick = useCallback(() => {
    setSelected((currentValue) => !currentValue);
    onChange([field, !selected]);
  }, [onChange, selected, field]);

  return selected ? (
    <CheckMarkedIcon onClick={onClick} />
  ) : (
    <CheckEmptyIcon onClick={onClick} />
  );
};
