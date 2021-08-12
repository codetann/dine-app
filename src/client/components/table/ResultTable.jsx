import React from "react";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";

export default function ResultTable({ results }) {
  console.log(results);
  return (
    <Table bg="white" shadow="md" borderRadius=".5rem" maxW="xl">
      <TableCaption>Results</TableCaption>
      <Thead>
        <Tr bg="gray.100">
          <Th>Rank</Th>
          <Th>Restaurant</Th>
          <Th>Yes</Th>
          <Th>No</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {results.map((r, i) => (
          <Tr
            key={i}
            bg={i <= 2 ? "green.100" : "none"}
            // color={i <= 2 ? "white" : "none"}
          >
            <Td>{i + 1}</Td>
            <Td>{r.name}</Td>
            <Td>{r.yes}</Td>
            <Td>{r.no}</Td>
            <Td></Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
