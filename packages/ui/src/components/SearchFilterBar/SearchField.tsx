import { useCallback, ChangeEvent, useRef } from "react";
import { SearchInput } from "../SearchInput/SearchInput";

interface Props {
  placeholder: string;
  setSearchQuery?: (query: string) => void;
  searchDelay?: number;
}

export const SearchField = ({
  placeholder,
  setSearchQuery,
  searchDelay = 1000,
}: Props) => {
  let timeout = useRef<ReturnType<typeof setTimeout>>();

  const onChangeSearchInput = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setSearchQuery!(event.target.value);
      }, searchDelay);
    },
    [setSearchQuery, searchDelay]
  );

  return (
    <SearchInput placeholder={placeholder} onChange={onChangeSearchInput} />
  );
};
