import { useRouter } from 'next/router'
import { Ghost } from 'react-kawaii';
import { Center, Text, Box } from '@chakra-ui/react'
import { GetStaticProps } from 'next';
import useSWR from 'swr'
import fetch from '../../lib/fetch'
import MotionBox from '../../components/Motionbox';

type Merge<P, T> = Omit<P, keyof T> & T;


const Challenge = () => {
  const router = useRouter()
  const { slug } = router.query
  return (
    <Box bg="gray.800" h='100vh'>
      <Box d='flex' alignItems={'center'}  mb={40}>
        <MotionBox
          margin="0 auto"
          alignItems={'center'}
          mt='50px'
          justifyItems='center'
          animate={{ y: 20 }}
          transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
        >
          <Center>
            <Ghost size={200} mood="ko" color="#83D1FB" />
          </Center>
        </MotionBox>

      </Box>
      <Text color='white' textAlign={'center'}>slug: {slug}</Text>
    </Box>
  )
}

export default Challenge