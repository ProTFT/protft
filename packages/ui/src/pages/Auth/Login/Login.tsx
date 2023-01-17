import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import {
  StyledButton,
  StyledContainer,
  StyledInput,
  StyledLoginForm,
  StyledText,
} from "./Login.styled";

interface UserInfoPayload {
  username: string;
  password: string;
}

export const Login = () => {
  const { signin, user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirect = (location?.state as any)?.redirect || "/admin/tournaments";
  const [payload, setPayload] = useState<UserInfoPayload>({
    username: "",
    password: "",
  });
  const onChange = useCallback(
    (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setPayload((old) => ({
        ...old,
        [field]: event.target.value,
      }));
    },
    []
  );

  const handleLogin = useCallback(
    ({ username, password }: UserInfoPayload) =>
      async () => {
        await signin(username, password);
      },
    [signin]
  );

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  return (
    <StyledContainer>
      <StyledLoginForm>
        <StyledText>Username</StyledText>
        <StyledInput value={payload.username} onChange={onChange("username")} />
        <StyledText>Password</StyledText>
        <StyledInput
          value={payload.password}
          type="password"
          onChange={onChange("password")}
        />
        <StyledButton onClick={handleLogin(payload)}>Login</StyledButton>
      </StyledLoginForm>
    </StyledContainer>
  );
};
