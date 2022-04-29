import type { NextPage } from "next";
import React from "react";
import {
  chakra,
  Box,
  Avatar,
  Flex,
  useColorModeValue,
  Text,
  Container
} from "@chakra-ui/react";
interface IProps {
  image: string;
  title?: string;
  description: string;
}
const CardTeam: NextPage<IProps> = ({
  image,
  title,
  description,
}) => {
  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      mt={50}
    >
      <Container maxWidth="90ch">
        <Box
          mx="auto"
          py={4}
          px={8}
          bg={useColorModeValue("white", "gray.800")}
          shadow="lg"
          rounded="lg"
        >
          <Flex justifyContent={{ base: "center", md: "end" }} mt={-16}>
            <Avatar
              w={20}
              h={20}
              objectFit="cover"
              rounded="full"
              borderStyle="solid"
              borderColor="purple.500"
              borderWidth={4}
              src={image}
            />
          </Flex>

          <chakra.h2
            fontSize={{ base: "2xl", md: "3xl" }}
            mt={{ base: 2, md: 0 }}
            fontWeight="bold"
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
           Anúncios
          </chakra.h2>

          <chakra.p mt={2} color={useColorModeValue("gray.600", "gray.200")}>
            {description}
          </chakra.p>

          <Flex justifyContent="end" mt={4}>
            <Text
              fontSize="xl"
              color={useColorModeValue("brand.500", "brand.300")}
            >
              {title}
            </Text>
          </Flex>
        </Box>
      </Container>
    </Flex>
  );
};

export default CardTeam