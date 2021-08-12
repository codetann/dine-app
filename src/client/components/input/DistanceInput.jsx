import React from "react";
import {
  NumberInputField,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  HStack,
  VStack,
  Heading,
  FormLabel,
  Text,
} from "@chakra-ui/react";

export default function DistanceInput({ value, setValue, label }) {
  const handleChange = (v) => setValue(v);

  return (
    <VStack w="100%">
      <HStack w="100%" align="left">
        <FormLabel>{label}</FormLabel>
      </HStack>

      <HStack w="100%">
        <NumberInput
          maxW="100px"
          mr="2rem"
          value={value}
          onChange={handleChange}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
        <Slider
          colorScheme="purple"
          w="100%"
          focusThumbOnChange={false}
          value={value}
          max={25}
          min={1}
          step={1}
          onChange={handleChange}
        >
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <SliderThumb fontSize="sm" boxSize="20px" />
        </Slider>
      </HStack>
    </VStack>
  );
}
