import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useNavigation = (link: string) => {
  const navigate = useNavigate();
  return useCallback(() => {
    navigate(link);
  }, [navigate, link]);
};

export const useExternalNavigation = (link: string, target?: string) => {
  return useCallback(() => {
    window.open(link, target);
  }, [link, target]);
};
