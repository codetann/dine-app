import React, { useEffect, useState } from "react";
import { Button, Heading, position, VStack } from "@chakra-ui/react";
import FadeTransition from "../components/animations/FadeTransition";
import AuthPage from "../components/layout/AuthPage";
import {
  SimpleNumberInput,
  DistanceInput,
  PriceInput,
} from "../components/input";
import { useSockets, useUser } from "../hooks";

export default function CreateRoomPage() {
  // - State - //
  const [limitValue, setLimitValue] = useState(10);
  const [distanceValue, setDistanceValue] = useState(10);
  const [priceValue, setPriceValue] = useState([1, 2, 3, 4]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // - Hooks - //
  const { createRoom } = useSockets();
  const { user } = useUser();
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);
  // - Action Handlers - //
  const handleCreate = () => {
    console.log(location);
    createRoom(user.name, {
      price: priceValue,
      distance: distanceValue,
      limit: limitValue,
      location: { lat: latitude, long: longitude },
    });
  };
  return (
    <AuthPage>
      <FadeTransition>
        <Heading p="0 0 2rem 0" textAlign="center">
          Customize Settings
        </Heading>
        <VStack
          w="100%"
          maxW="lg"
          bg="white"
          borderRadius=".5rem"
          shadow="md"
          align="center"
          justify="center"
          p="3rem"
          spacing="2rem"
        >
          <SimpleNumberInput
            label="Number of results"
            value={limitValue}
            setValue={setLimitValue}
          />

          <DistanceInput
            label="Max distance (miles)"
            value={distanceValue}
            setValue={setDistanceValue}
          />

          <PriceInput
            label="Filter by price"
            value={priceValue}
            setValue={setPriceValue}
          />

          <Button onClick={handleCreate} colorScheme="purple" w="100%">
            Create
          </Button>
        </VStack>
      </FadeTransition>
    </AuthPage>
  );
}
