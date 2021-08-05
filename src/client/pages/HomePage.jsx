import React from "react";
// components
import { VStack } from "@chakra-ui/layout";
////import CallToAction from "../components/cta/CallToAction";
import Hero from "../components/hero/Hero";
import HomeNav from "../components/navigation/HomeNav";
import SiteFeatures from "../components/details/SiteFeatures";

export default function HomePage() {
  return (
    <VStack
      maxW="100vw"
      width="100%"
      minH="100vh"
      p={["2rem 1rem", "2rem 1rem", "2rem 2rem", "2rem 4rem", "2rem 4rem"]}
      spacing="5rem"
    >
      <HomeNav />
      <Hero />
      <SiteFeatures />
    </VStack>
  );
}
