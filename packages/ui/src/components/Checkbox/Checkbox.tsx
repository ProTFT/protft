import { useCallback, useState } from "react";
import { CheckEmptyIcon } from "../../design/icons/CheckEmpty";
import { CheckMarkedIcon } from "../../design/icons/CheckMarked";

interface Props<T> {
  field: T;
  onChange: (event: [T, boolean]) => void;
  checked: boolean;
}

export const Checkbox = <T extends Object>({
  field,
  onChange,
  checked,
}: Props<T>) => {
  const [selected, setSelected] = useState(checked);
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
