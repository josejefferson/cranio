import type { HTMLChakraProps } from '@chakra-ui/react'
import type { HTMLMotionProps } from 'framer-motion'

export interface Data { 
  question: string
  createdBy: any
  time: number
  preparationTime: number
  topic: string
  image?: string
  alternatives: Array<{
    title: string
    description?: string
    correct: boolean
    _id: string
  }>
  _id: string
}

export interface Props {
  api: Data
  _id: string
}

export interface Ianswer extends Data {
	active?: boolean
	timeOutCallback?: Function
}

export interface IprosAlternatives extends Data {
  active: boolean
	selected: any;
  handleClick: any
}

export type Iuser = {
  id?: number
  name: string
  shortName?: string
  courseName: string
  registration: string
  canPlayToday?: any
}

export interface IHighlights  {
  _id: string
  title?: string
  description?: string
  image: string
}

export interface Props  {
  highlights: IHighlights[]
  challenges: any
}

type Merge<P, T> = Omit<P, keyof T> & T;

export type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>;
