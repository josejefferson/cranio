import { MotionBoxProps } from '@/interface/index'
import { Box } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import type { FC } from 'react'

const MotionBox: FC<MotionBoxProps> = motion(Box)

export default MotionBox
