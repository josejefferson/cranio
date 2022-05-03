import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'
import axios from '../api/'

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
            <img className="background-img" src={data.image} />
            <img src={data.image} />
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