import type { NextPage } from "next";
import React from "react";
import { Button, Flex, Heading, chakra, Text, useBreakpointValue, Box, Stack, useColorModeValue } from "@chakra-ui/react";
type IAds = {
  id: number;
  title?: string;
  description?: string;
  image: string;
  data: []
}
const CardTeam: NextPage<IAds> = ({
  image,
  title,
  description,
}) => {
  return (
    <Box
      w="full"
      h="100vh"
      backgroundImage={image}
      bgPos="center"
      bgSize="cover"
      objectFit={'cover'}
      bgAttachment='fixed'
    >
      <Flex
        align="center"
        pos="relative"
        justify="center"
        boxSize="full"
        bg="blackAlpha.700"
      >
        <Flex p={50}
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <Stack
            direction={'column'}
            justifyContent="center"
            alignItems="center"
            w="sm"
            mx="auto"
          >
            <Box
              bg='gray.500'
              h={300}
              w='full'
              rounded={'base'}
              shadow='md'
              bgSize='cover'
              bgPos='center'
              bgImage={image}
            />
            {!title? (<React.Fragment/>) : (
              <Box
                w='full'
                bg={useColorModeValue("white", "gray.800")}
                shadow="lg"
                rounded="lg"
                overflow="hidden"
              >
                <chakra.h3
                  py={2}
                  textAlign="center"
                  fontWeight="bold"
                  textTransform="uppercase"
                  color={useColorModeValue("gray.800", "white")}
                  letterSpacing={1}
                >
                  {title}
                </chakra.h3>
                <Flex
                  alignItems="center"
                  justifyContent="space-between"
                  py={2}
                  px={3}
                  bg={useColorModeValue("gray.200", "gray.700")}
                >
                  <chakra.span
                    fontWeight="bold"
                    color={useColorModeValue("gray.800", "gray.200")}
                  >
                    {description}
                  </chakra.span>
                </Flex>
              </Box>
            )
            }
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
};

export default CardTeam