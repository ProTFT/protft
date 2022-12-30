import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 100%;
  background: linear-gradient(
      0deg,
      rgba(60, 60, 60, 0.5),
      rgba(60, 60, 60, 0.5)
    ),
    url(/background.png);
  background-size: cover;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  padding: 3rem;
`;

export const StyledTournamentTitle = styled.p`
  font-family: VTF Redzone Classic;
  font-weight: 400;
  font-size: 48px;
  line-height: 38px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: transparent;
  background: linear-gradient(#9cc4ff, #cbb3fc, #f3c2ff);
  background-clip: text;
  -webkit-background-clip: text;
`;
