import { useMemo } from "react";
import Select from "react-select";

export type NonsensicalSelectValue<T> = { value: T; label: string };

export const DataSelect = <T, K extends Record<keyof K, T | string | any>>({
  value,
  onValueChange,
  data,
  valueKey,
  labelKey,
  isLoading,
  placeholder,
  prefix,
}: {
  value: T;
  onValueChange: (newValue: T | undefined) => void;
  data?: K[];
  valueKey: keyof K;
  labelKey: keyof K;
  isLoading: boolean;
  placeholder?: string;
  prefix?: (data: K) => string;
}) => {
  const options = useMemo(() => {
    return data?.map((t) => ({
      value: t[valueKey],
      label: (prefix ? `(${prefix(t)}) - ` : "") + t[labelKey],
    })) as { value: T; label: string }[];
  }, [data, labelKey, valueKey, prefix]);

  const selectedValue = useMemo(() => {
    return options.find((o) => o.value === value);
  }, [options, value]);

  return (
    <Select<NonsensicalSelectValue<T>>
      placeholder={placeholder}
      isLoading={isLoading}
      options={options}
      value={selectedValue}
      controlShouldRenderValue
      onChange={(newValue) => onValueChange(newValue?.value)}
    />
  );
};
