import type { GetStaticProps, NextPage } from 'next'
import 'bootstrap/dist/css/bootstrap.min.css'
import Image from 'next/image'
import Carousel from 'react-bootstrap/Carousel'
import axios from '../api/'

type IAds = {
  id: number;
  title?: string;
  description?: string;
  image: string;
  data: []
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get<IAds>('/ad/active')
  return {
    props: {
      data: data
    }
  }
}

const Home: NextPage<IAds> = (data) => {
  return (
    <Carousel className="ads-carousel" controls={false} interval={10000}>
      {data.data?.map((data: IAds, index: number) => {
        return (
          <Carousel.Item key={index}>
            <Image className="background-img" src={data.image} alt={data.title} />
            <Image src={data.image} alt={data.title} />
            <Carousel.Caption>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        )
      })}
    </Carousel>
  )
}

export default Home