import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useMutation } from "urql";
import { PlayersContainer } from "../Players/Players";
import {
  CreatePlayerResult,
  CreatePlayerVariables,
  CREATE_PLAYER_QUERY,
} from "./queries";

const RedBox = ({ id }: { id: number }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(() => ({
    type: "RedBox",
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging,
    }),
  }));
  return (
    <Box
      ref={drag}
      backgroundColor="red"
      margin="10px"
      width="100px"
      height="100px"
    >
      {`ID da Box: ${id}`}
    </Box>
  );
};

const BlueBox = ({ id }: { id: number }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "RedBox",
    drop(item, monitor) {
      console.log(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  return (
    <Box ref={drop} backgroundColor="blue" margin="10px">
      {`ID da Box: ${id}`}
    </Box>
  );
};

export const TournamentWizard = () => {
  const [name, setName] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [region, setRegion] = useState<string>();
  const [{ data, fetching }, executeMutation] = useMutation<
    CreatePlayerResult,
    CreatePlayerVariables
  >(CREATE_PLAYER_QUERY);

  const updateState = (
    stateUpdateFn: (value: string) => void,
    event: React.ChangeEvent<HTMLInputElement>
  ) => stateUpdateFn(event.target.value);

  const saveUser = async () => {
    if (name && country && region) {
      const payload = {
        name,
        country,
        region,
      };
      const result = await executeMutation(payload);
      console.log(result);
      alert(result.data?.createUser.id);
    }
  };

  return (
    <Box display="flex" px="15%" pt={3} flexDir="column">
      <Text>Selecione os participantes</Text>
      <Flex gap={3}>
        <Box
          padding={3}
          borderWidth="3px"
          borderRadius="10px"
          borderColor="white"
          // height="100px"
          // width="100px"
        >
          <Text>Add Player</Text>
          <Text>Name</Text>
          <Input onChange={(event) => updateState(setName, event)}></Input>

          <Text>Country</Text>
          <Input onChange={(event) => updateState(setCountry, event)}></Input>

          <Text>Region</Text>
          <Input onChange={(event) => updateState(setRegion, event)}></Input>

          <Button onClick={saveUser}>Save</Button>
        </Box>
        <Box
          borderWidth="3px"
          borderRadius="10px"
          borderColor="white"
          height="100px"
          width="100px"
        >
          aa
        </Box>
        <Box
          borderWidth="3px"
          borderRadius="10px"
          borderColor="white"
          height="100px"
          width="100px"
        >
          aa
        </Box>
      </Flex>
      {/* <PlayersContainer /> */}
    </Box>
  );
};
