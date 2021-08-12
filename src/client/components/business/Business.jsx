import React from "react";
import {
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  IconButton,
  Button,
  useDisclosure,
  Tag,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaRegHeart } from "react-icons/fa";
import BusinessModal from "./BusinessModal";

import Rating from "../display/Rating";

export default function Business({ business }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <VStack
        onClick={onOpen}
        p="2rem"
        spacing="1rem"
        borderRadius=".3rem"
        shadow="md"
        bg="white"
        cursor="pointer"
      >
        <Image
          src={business.image}
          boxSize="300px"
          objectFit="cover"
          shadow="sm"
          borderRadius=".5rem"
        />
        <VStack w="100%" align="left">
          <HStack spacing="1rem">
            {business.categories.map((b, i) => (
              <Tag key={i}>{b.title}</Tag>
            ))}
          </HStack>
          <Heading fontWeight="medium" textAlign="left" size="sm">
            {business.name}
          </Heading>
          {/* info w/ icons */}
          <HStack w="100%" justify="left" align="center">
            <p>{business.price}</p>
            <Rating rating={business.rating} count={business.review_count} />
          </HStack>
        </VStack>
      </VStack>

      <BusinessModal business={business} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
