import { useLayoutEffect } from "react";

export const useScrollLock = (isLock?: boolean) => {
  useLayoutEffect(() => {
    document.body.style.overflow = isLock ? "hidden" : "unset";

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isLock]);
};
