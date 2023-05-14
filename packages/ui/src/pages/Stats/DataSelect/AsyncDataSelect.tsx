import { useCallback, useMemo } from "react";
import AsyncSelect from "react-select/async";
import debounce from "debounce-promise";

export type NonsensicalSelectValue<T> = { value: T; label: string };

export const AsyncDataSelect = <
  T,
  K extends Record<keyof K, T | string | any>
>({
  value,
  onValueChange,
  data,
  valueKey,
  labelKey,
  isLoading,
  placeholder,
  prefix,
  isMulti = false,
  loadOptions,
}: {
  value: T;
  onValueChange: (newValue: T | undefined) => void;
  data?: K[];
  valueKey: keyof K;
  labelKey: keyof K;
  isLoading: boolean;
  placeholder?: string;
  prefix?: (data: K) => string;
  isMulti?: boolean;
  loadOptions: (input: string) => Promise<K[]>;
}) => {
  const formatData = useCallback(
    (inputData?: K[]) => {
      return inputData?.map((t) => ({
        value: t[valueKey],
        label: (prefix ? `(${prefix(t)}) - ` : "") + t[labelKey],
      })) as { value: T; label: string }[];
    },
    [labelKey, prefix, valueKey]
  );

  const options = useMemo(() => {
    return formatData(data);
  }, [formatData, data]);

  const selectedValue = useMemo(() => {
    return options?.find((o) => o.value === value);
  }, [options, value]);

  const loadAsyncInfo = useCallback(
    async (input: string) => {
      const asyncData = await loadOptions(input);
      return formatData(asyncData);
    },
    [formatData, loadOptions]
  );

  const loadOptionsFormatted = useMemo(
    () =>
      debounce(loadAsyncInfo, 1000, {
        leading: true,
      }),
    [loadAsyncInfo]
  );

  return (
    <AsyncSelect<NonsensicalSelectValue<T>>
      styles={{ container: (base) => ({ ...base, width: "100%" }) }}
      placeholder={placeholder}
      isLoading={isLoading}
      value={selectedValue}
      controlShouldRenderValue
      onChange={(newValue) => {
        if (Array.isArray(newValue)) {
          const newValues = newValue.map((v) => v.value);
          return onValueChange(newValues as any);
        }
        onValueChange(newValue?.value);
      }}
      isClearable={true}
      backspaceRemovesValue={true}
      isMulti={Boolean(isMulti) as any}
      loadOptions={loadOptionsFormatted}
      defaultOptions={options}
      cacheOptions={true}
      isSearchable={true}
    />
  );
};
