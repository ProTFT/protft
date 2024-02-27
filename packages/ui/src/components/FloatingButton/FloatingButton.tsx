import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useTracking } from "../../hooks/useTracking";
import { TrackingEvents } from "../../tracking/Events";
import { FloatingButtonContainer } from "./FloatingButton.styled";

export const FloatingButton = ({ children }: React.PropsWithChildren<{}>) => {
  const { trackEvent } = useTracking();
  const { pathname } = useLocation();
  const trackFeedbackEvent = useCallback(() => {
    trackEvent(TrackingEvents.FEEDBACK_CLICK, {
      page: pathname,
    });
  }, [pathname, trackEvent]);
  return (
    <FloatingButtonContainer onClick={trackFeedbackEvent}>
      {children}
    </FloatingButtonContainer>
  );
};
