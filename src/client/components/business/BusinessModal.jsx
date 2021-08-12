import React, { useEffect, useState } from "react";
import {
  HStack,
  VStack,
  Image,
  Heading,
  Text,
  IconButton,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Tag,
} from "@chakra-ui/react";
import { FaMapMarkerAlt, FaPhone, FaRegHeart, FaHeart } from "react-icons/fa";
import Rating from "../display/Rating";
import { useFavorites } from "../../hooks";

export default function BusinessModal({ business, isOpen, onClose }) {
  const id = business?.yelp_id || business?.id;
  const { addFavorite, favorites } = useFavorites();
  const favorite = favorites && favorites.find((f) => f.yelp_id === id);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton p="1rem" />

        {/* modal body */}
        <ModalBody w="100%">
          <VStack spacing="1rem">
            <Image
              src={business.image}
              objectFit="cover"
              w="400px"
              h="300px"
              shadow="sm"
              borderRadius=".5rem"
            />
            <VStack w="100%" align="left">
              <HStack spacing="1rem">
                {business?.categories &&
                  business.categories.map((b, i) => (
                    <Tag key={i}>{b.title}</Tag>
                  ))}
              </HStack>
              <Heading size="md">{business.name}</Heading>
              {/* info w/ icons */}
              <HStack color="blackAlpha.600">
                <FaMapMarkerAlt />
                <Text>{business?.location?.address || business.address}</Text>
              </HStack>
              <HStack color="blackAlpha.600">
                <FaPhone />
                <Text>{business.phone?.display || business.display_phone}</Text>
              </HStack>
              <HStack spacing="1rem">
                <p>{business.price}</p>
                <Rating
                  rating={business.rating}
                  count={business.review_count}
                />
              </HStack>
            </VStack>
          </VStack>
        </ModalBody>
        {/* modal footer */}
        <ModalFooter>
          <HStack pb="1rem">
            <IconButton
              color="red"
              onClick={() =>
                addFavorite(
                  favorite ? favorite : business,
                  favorite ? "remove" : "add"
                )
              }
              icon={favorite ? <FaHeart /> : <FaRegHeart />}
            />
            <Button colorScheme="purple">Open In Maps</Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
