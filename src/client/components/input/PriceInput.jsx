import React, { useState } from "react";
import {
  HStack,
  Checkbox,
  CheckboxGroup,
  FormLabel,
  VStack,
} from "@chakra-ui/react";

export default function PriceInput({ label, setValue, value }) {
  const handleValue = (e) => {
    // set price based on checkbox id
    const price = +e.target.id;
    // set value based on price
    if (value.includes(price)) {
      setValue((prev) => prev.filter((p) => p !== price).sort());
    } else {
      setValue((prev) => [...prev, price].sort());
    }
  };

  return (
    <VStack w="100%">
      <HStack w="100%" align="left">
        <FormLabel>{label}</FormLabel>
      </HStack>

      <CheckboxGroup colorScheme="purple" onChange={handleValue} value={value}>
        <HStack w="100%" spacing="2rem">
          <Checkbox id="4" defaultIsChecked onChange={handleValue}>
            $$$$
          </Checkbox>
          <Checkbox id="3" defaultIsChecked onChange={handleValue}>
            $$$
          </Checkbox>
          <Checkbox id="2" defaultIsChecked onChange={handleValue}>
            $$
          </Checkbox>
          <Checkbox id="1" defaultIsChecked onChange={handleValue}>
            $
          </Checkbox>
        </HStack>
      </CheckboxGroup>
    </VStack>
  );
}
