import axios from '@/api/index'
import { Box } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  const { data: ranking } = await axios.get('/student/ranking')
  return {
    props: {
      ranking
    }
  }
}

export default function Ranking({ ranking }: any) {
  return (
    <>
      {
        ranking?.map((student: any) => {
          <Box>{student.shortName}</Box>
        })
      }
    </>
  )
}
