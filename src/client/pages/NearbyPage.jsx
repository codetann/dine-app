import React from "react";
import { useReadOnly } from "../hooks";
import { SimpleGrid } from "@chakra-ui/react";
import Map from "../components/map/Map";
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";
import Business from "../components/business/Business";

export default function NearbyPage() {
  const { nearby, location } = useReadOnly();

  return (
    <AuthPage pos={"flex-start"}>
      <FadeTransition>
        <SimpleGrid columns={[1, 1, 2, 3, 4]} spacing="2rem">
          {nearby.map((b, i) => (
            <Business key={i} business={b} />
          ))}
        </SimpleGrid>
      </FadeTransition>
    </AuthPage>
  );
}
