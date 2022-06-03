import {
  Badge, Box, Image, Heading, Stack, Drawer,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  FormLabel,
  FormControl
} from '@chakra-ui/react'
import React from 'react'
import { Button, ButtonGroup, Card, Ratio } from 'react-bootstrap'
import { MdDelete, MdEdit } from 'react-icons/md'

export default function Ad({ ad }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [title, setTitle] = React.useState(ad.title)
  return (
    <Card style={{ width: '100%', height: '100%' }}>
      <Ratio aspectRatio="16x9">
        <Card.Img variant="top" src={ad.image} style={{ objectFit: 'cover' }} />
      </Ratio>
      <Card.Body className="d-flex flex-column">
        <Heading as="h2" size="lg">{ad.title || '(Sem título)'}</Heading>
        <Card.Subtitle className="mb-2">
          <Badge>Até {new Date(ad.endDate).toLocaleString()}</Badge>
        </Card.Subtitle>
        <Card.Text>{ad.description}</Card.Text>
        <Stack direction="row" spacing={4} mt={2}>
          <Center>
            <Button variant="outline-primary" colorScheme="teal" onClick={onOpen}><MdEdit /></Button>
            <Button variant="outline-danger"><MdDelete /></Button>
          </Center>
        </Stack>
      </Card.Body>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar anúncios</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
          <FormControl mt={4}>
              <FormLabel>Titulo do anúncios</FormLabel>
              <Input placeholder="Titulo do anúncios" value={title}
              onChange={(e) => setTitle(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel>First name</FormLabel>
              <Input ref={initialRef} placeholder="First name" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
    // <Card style={{ width: '100%', height: '100%' }}>
    //   <Ratio aspectRatio="16x9">
    //     <Card.Img variant="top" src={ad.image} style={{ objectFit: 'cover' }} />
    //   </Ratio>
    //   <Card.Body className="d-flex flex-column">
    //     <Card.Title>{ad.title || '(Sem título)'}</Card.Title>
    //     <Card.Subtitle className="mb-2">
    //       <Badge>Até {new Date(ad.endDate).toLocaleString()}</Badge>
    //     </Card.Subtitle>
    //     <Card.Text>{ad.description}</Card.Text>
    //     <div className="d-inline-flex flex-grow-1 align-items-end mt-3">
    //       <ButtonGroup>
    //         <Button variant="outline-primary"><MdEdit /></Button>
    //         <Button variant="outline-danger"><MdDelete /></Button>
    //       </ButtonGroup>
    //     </div>
    //   </Card.Body>
    // </Card>
  )
}