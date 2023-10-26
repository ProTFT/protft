import React, { useContext, createContext } from "react";
import Plausible from "plausible-tracker";
import { TrackingEventTypeMap } from "../tracking/Events";

type TrackingContext = {
  trackEvent: <T extends keyof TrackingEventTypeMap>(
    type: T,
    props: TrackingEventTypeMap[T]
  ) => void;
};

const trackingContext = createContext<TrackingContext>({} as TrackingContext);

export function ProvideTracking({ children }: React.PropsWithChildren<{}>) {
  const { trackEvent: trackPlausible } = Plausible({
    domain: "protft.com",
    apiHost: "//protft.com",
  });
  const trackEvent = <T extends keyof TrackingEventTypeMap>(
    type: T,
    props: TrackingEventTypeMap[T]
  ): void => {
    trackPlausible(type, {
      props,
    });
  };
  return (
    <trackingContext.Provider value={{ trackEvent }}>
      {children}
    </trackingContext.Provider>
  );
}

export const useTracking = () => {
  return useContext(trackingContext);
};
