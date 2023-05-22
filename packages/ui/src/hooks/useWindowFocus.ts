import { useState, useEffect } from "react";

let hidden: string;
let visibilityChange: string;

if (typeof document.hidden !== "undefined") {
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof (document as any).msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof (document as any).webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

export const usePageVisibility = () => {
  const [visibilityStatus, setVisibilityStatus] = useState(
    (document as any)[hidden]
  );

  useEffect(() => {
    function handleVisibilityChange() {
      setVisibilityStatus((document as any)[hidden]);
    }

    document.addEventListener(visibilityChange, handleVisibilityChange);

    return () => {
      document.removeEventListener(visibilityChange, handleVisibilityChange);
    };
  }, []);

  return visibilityStatus;
};
