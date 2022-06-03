import { Badge, Box, Image, Text } from '@chakra-ui/react'
import { Button, Ratio } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md'

export default function Challenges({ challenge }: any) {
  return (
    <Box borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Ratio aspectRatio="16x9" hidden={!challenge.image}>
        <Image src={challenge.image} alt={''} objectFit="cover" fallbackSrc="https://dummyimage.com/640x360/cccccc/555555&text=NO+IMAGE" />
      </Ratio>

      <Box p={4}>
        <Text noOfLines={3}>{challenge.question}</Text>
        <Badge>{challenge.topic}</Badge>

        <Box mt={2}>
          <Button variant="outline-primary"><MdEdit /></Button>
          <Button variant="outline-danger"><MdDelete /></Button>
        </Box>
      </Box>
    </Box>
  )
}