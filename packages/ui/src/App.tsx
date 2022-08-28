import * as React from "react";
import "@fontsource/inter/400.css";
import "cal-sans";
import {
  ChakraProvider,
  Box,
  Container,
  Button,
  extendTheme,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Link, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Tournaments } from "./pages/Tournaments/Tournaments";
import { Tournament } from "./pages/Tournament/Tournament";
import { useWindowSize, WindowSize } from "./hooks/useWindowSize";
import { PlayersContainer } from "./pages/Players/Players";
import { Player } from "./pages/Player/Player";
import { SuspenseElement } from "./components/SuspendedPage";
import { TournamentWizard } from "./pages/TournamentWizard/TournamentWizard";
import { StageWizard } from "./pages/StageWizard/StageWizard";
import { LobbiesWizard } from "./pages/LobbiesWizard/LobbiesWizard";
import { ResultsWizard } from "./pages/ResultsWizard/ResultsWizard";

const theme = extendTheme({
  fonts: {
    heading: "Cal Sans, sans-serif",
    body: "Inter, sans-serif",
  },
});

const isSmallScreen = (size?: WindowSize) => {
  return Boolean(size?.width && size?.width < 800);
};

export const App = () => {
  const size = useWindowSize();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sideMenuButtonRef: any = React.useRef();

  return (
    <ChakraProvider theme={theme}>
      <Box w="100%" zIndex={1}>
        <Container
          maxW="container.xl"
          py={5}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link to="/">
            <Button variant="ghost">ProTFT</Button>
          </Link>
          <Box hidden={isSmallScreen(size)}>
            <Link to="/tournaments">
              <Button variant="ghost">Tournaments</Button>
            </Link>
            <Link to="/players">
              <Button variant="ghost">Players</Button>
            </Link>
            {process.env.NODE_ENV !== "production" ? (
              <Link to="/addTournament">
                <Button variant="ghost">Add Tournament</Button>
              </Link>
            ) : (
              <></>
            )}
          </Box>
          <Box>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfJbKrYGkUFTwJqwIWNuRCdzL_UsOkigeeBIy35a3Ab5JV4gQ/viewform?usp=sf_link"
              target="_blank"
              rel="noreferrer"
            >
              <Button variant="solid" colorScheme="yellow">
                Feedback
              </Button>
            </a>
            <ColorModeSwitcher justifySelf="flex-end" />
            {isSmallScreen(size) && (
              <Button ref={sideMenuButtonRef} onClick={onOpen}>
                =
              </Button>
            )}
          </Box>
        </Container>
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          finalFocusRef={sideMenuButtonRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>ProTFT</DrawerHeader>
            <DrawerBody>
              <VStack alignItems="start">
                <Link to="/tournaments" onClick={onClose}>
                  <Button variant="ghost">Tournaments</Button>
                </Link>
                <Link to="/players" onClick={onClose}>
                  <Button variant="ghost">Players</Button>
                </Link>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Routes>
          <Route path="/" element={<SuspenseElement element={<Home />} />} />
          <Route path="tournaments">
            <Route
              index
              element={<SuspenseElement element={<Tournaments />} />}
            />
            <Route
              path=":tournamentId"
              element={<SuspenseElement element={<Tournament />} />}
            />
          </Route>
          <Route path="players">
            <Route
              index
              element={<SuspenseElement element={<PlayersContainer />} />}
            />
            <Route
              path=":playerId"
              element={<SuspenseElement element={<Player />} />}
            />
          </Route>
          <Route path="addTournament">
            <Route
              index
              element={<SuspenseElement element={<TournamentWizard />} />}
            />
            <Route path=":tournamentId">
              <Route
                index
                element={<SuspenseElement element={<StageWizard />} />}
              />
              <Route
                path="lobbies"
                element={<SuspenseElement element={<LobbiesWizard />} />}
              />
              <Route
                path="results"
                element={<SuspenseElement element={<ResultsWizard />} />}
              />
            </Route>
          </Route>
        </Routes>
      </Box>
    </ChakraProvider>
  );
};
