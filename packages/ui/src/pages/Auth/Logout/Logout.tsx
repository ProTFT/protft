import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

export const Logout = () => {
  const { signout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    signout();
    navigate("/");
  }, [signout, navigate]);

  return <></>;
};
