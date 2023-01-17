import React, { createContext, useCallback, useContext, useState } from "react";
import { StyledContainer } from "./Toast.styled";

interface ToastContext {
  toast: JSX.Element;
  show: () => void;
}

export const Toast = ({ visible }: { visible: boolean }) => {
  return (
    <StyledContainer show={visible}>Operation successfull</StyledContainer>
  );
};

const toastContext = createContext<ToastContext>({} as ToastContext);

export function ProvideToast({ children }: React.PropsWithChildren<{}>) {
  const provideToast = useProvideToast();
  return (
    <toastContext.Provider value={provideToast}>
      {children}
    </toastContext.Provider>
  );
}

export const useToast = () => {
  return useContext(toastContext);
};

export const useProvideToast = () => {
  const [visible, setVisible] = useState(false);
  const show = useCallback(() => {
    setVisible(true);
    setTimeout(() => setVisible(false), 2500);
  }, []);
  const toast = <Toast visible={visible} />;
  return {
    toast,
    show,
  };
};
