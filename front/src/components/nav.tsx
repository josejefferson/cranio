/* eslint-disable */
import React from 'react';
import {
  Button, chakra, Flex, HStack,
  IconButton, VisuallyHidden, useColorModeValue, useColorMode
} from '@chakra-ui/react';
import { FaMoon, FaSun } from "react-icons/fa";

export default function NavHero() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <React.Fragment>
      <chakra.header
        borderTop="10px solid #8257e5"
        shadow="md"
        transition="all 0.5s ease-in-out"
        pos="fixed"
        top="0"
        zIndex="10"
        w="full"
        px={{ base: 2, sm: 4 }}
        py={4}
        mb={20}
        boxShadow="none"
        bg={useColorModeValue("#ffffffd6", "#1a202cd1")}
      >
        <Flex alignItems="center" justifyContent="space-between" mx="auto" as="nav">
          <Flex>
            <chakra.a
              href="/"
              title={"EPICE " + new Date().getFullYear()}
              display="flex"
              alignItems="center"
            >
              <VisuallyHidden>EPICE {new Date().getFullYear()}</VisuallyHidden>
            </chakra.a>
            <chakra.h1 as="a"  href="/" fontSize="xl" fontWeight="bold" ml="2" color={useColorModeValue("#18216d", "white")}>
              Cránio {new Date().getFullYear()}
            </chakra.h1>
          </Flex>
          <HStack display="flex" alignItems="center" spacing={1}>
            <HStack spacing={1} direction='row'>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${colorMode === 'light' ? 'Dark' : 'Light'} mode`}
                bg={useColorModeValue("gray.50", "#464460")}
                _hover={{ bg: useColorModeValue("gray.50", "#464460")}}
                color={useColorModeValue("gray.800", "white")}
                boxShadow={"none"}
                ml={{ base: "0", md: "3" }}
                onClick={toggleColorMode}
                icon={colorMode !== 'light' ? <FaMoon /> : <FaSun />}
              />
            </HStack>
          </HStack>
        </Flex>
      </chakra.header>
    </React.Fragment >
  );
};