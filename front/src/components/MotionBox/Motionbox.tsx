import type { HTMLChakraProps } from '@chakra-ui/react'
import { Box } from '@chakra-ui/react'
import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'
import type { FC } from 'react'

type Merge<P, T> = Omit<P, keyof T> & T;

type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>;

const MotionBox: FC<MotionBoxProps> = motion(Box)

export default MotionBox