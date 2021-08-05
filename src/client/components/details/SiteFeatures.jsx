import React from "react";
import { Stack, Text, HStack, Box, VStack, Heading } from "@chakra-ui/react";
import { FaGlobe, FaBolt, FaDollarSign } from "react-icons/fa";

const FEATURES = [
  {
    icon: <FaGlobe />,
    heading: "Use anywhere",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum voluptatum soluta enim culpa consequuntur nisi officia incidunt temporibus. Nobis, est cupiditate.",
  },
  {
    icon: <FaDollarSign />,
    heading: "Always free",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum voluptatum soluta enim culpa consequuntur nisi officia incidunt temporibus. Nobis, est cupiditate.",
  },
  {
    icon: <FaBolt />,
    heading: "Results are instant",
    text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum voluptatum soluta enim culpa consequuntur nisi officia incidunt temporibus. Nobis, est cupiditate.",
  },
];

export default function SiteFeatures() {
  return (
    <Stack
      spacing={["4rem", "4rem", "9rem"]}
      borderRadius=".5rem"
      w="100%"
      direction={["column", "column", "row"]}
      p="2rem"
      bg="purple.500"
    >
      {FEATURES.map((f, i) => (
        <VStack key={i} align="left" maxW="md" spacing="1rem">
          <HStack>
            <Box
              p=".9rem"
              borderRadius=".5rem"
              bg="whiteAlpha.300"
              color="white"
            >
              {f.icon}
            </Box>
          </HStack>

          <Heading size="md" color="white">
            {f.heading}
          </Heading>
          <Text color="whiteAlpha.700">{f.text}</Text>
        </VStack>
      ))}
    </Stack>
  );
}
