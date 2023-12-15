import React, { useState, useContext, createContext } from "react";
import axios from "axios";

enum Roles {
  WEBMASTER = "WM",
  TOURNAMENT_ORGANIZER = "TO",
  PLAYER = "PL",
}

interface AuthContext {
  user: boolean;
  isWebmaster: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

const authContext = createContext<AuthContext>({} as AuthContext);
export const client = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`.replace("graphql", ""),
  withCredentials: true,
});

export function ProvideAuth({ children }: React.PropsWithChildren<{}>) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth(): AuthContext {
  const [user, setUser] = useState<boolean>(() =>
    Boolean(window.localStorage.getItem("l"))
  );
  const [roles, setRoles] = useState<Roles[]>(
    () => JSON.parse(window.localStorage.getItem("lr") || "[]") as Roles[]
  );

  const signin = async (email: string, password: string) => {
    try {
      const response = await client.post(
        "auth/login",
        {
          username: email,
          password,
        },
        { withCredentials: true }
      );
      if (response.status === 202) {
        const resolvedRoles = response.data.roles || [];
        setUser(true);
        setRoles(resolvedRoles);
        window.localStorage.setItem("l", String(true));
        window.localStorage.setItem("lr", JSON.stringify(resolvedRoles));
      } else {
        setUser(false);
      }
    } catch (error) {
      console.log(error);
      setUser(false);
    }
  };

  const signout = async () => {
    try {
      const response = await client.post("auth/logout");
      if (response.status === 202) {
        setUser(false);
        window.localStorage.removeItem("l");
        window.localStorage.removeItem("lr");
      } else {
        setUser(true);
      }
    } catch (error) {
      console.log(error);
      setUser(true);
    }
  };

  return {
    user,
    isWebmaster: roles.includes(Roles.WEBMASTER),
    signin,
    signout,
  };
}
