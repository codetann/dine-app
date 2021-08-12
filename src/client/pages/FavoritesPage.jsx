import React, { useEffect } from "react";
import { useFavorites } from "../hooks";
import { SimpleGrid } from "@chakra-ui/react";
import Map from "../components/map/Map";
import AuthPage from "../components/layout/AuthPage";
import FadeTransition from "../components/animations/FadeTransition";
import Business from "../components/business/Business";

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  useEffect(() => {
    console.log(favorites);
  }, [favorites]);

  return (
    <AuthPage pos={"flex-start"}>
      <FadeTransition>
        {!favorites && <div>No favorites found</div>}
        {favorites && (
          <SimpleGrid columns={[1, 1, 2, 3, 4, 4]} spacing="2rem">
            {favorites.map((b, i) => (
              <Business key={i} business={b} />
            ))}
          </SimpleGrid>
        )}
      </FadeTransition>
    </AuthPage>
  );
}
