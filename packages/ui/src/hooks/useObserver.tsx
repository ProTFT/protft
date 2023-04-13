import { RefObject, useEffect } from "react";

export const useObserver = (
  ref: RefObject<HTMLDivElement>,
  callback: () => void
) => {
  useEffect(() => {
    const localRef = ref.current;
    const observer = new IntersectionObserver(
      (entry: IntersectionObserverEntry[]) => {
        if (entry[0].isIntersecting) {
          callback();
        }
      },
      {
        threshold: 0.5,
      }
    );
    observer.observe(ref.current as HTMLDivElement);

    return () => observer.unobserve(localRef as HTMLDivElement);
  }, [callback, ref]);
};
