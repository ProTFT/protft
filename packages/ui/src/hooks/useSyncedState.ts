import { useEffect, useState } from "react";

export const useSyncedState = <T, K>(
  apiValue: K,
  transformer: (value: K) => T = (v) => v as unknown as T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [items, setItems] = useState<T>(() => transformer(apiValue));

  useEffect(() => {
    setItems(() => transformer(apiValue));
  }, [apiValue, transformer]);

  return [items, setItems];
};
