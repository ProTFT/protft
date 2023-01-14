import React, { useState, useContext, createContext } from "react";
import axios from "axios";

interface AuthContext {
  user: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

const authContext = createContext<AuthContext>({} as AuthContext);
const client = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`.replace("graphql", ""),
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
        setUser(true);
        window.localStorage.setItem("l", String(true));
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
    signin,
    signout,
  };
}
