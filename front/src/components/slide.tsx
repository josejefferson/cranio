import type { NextPage } from "next";
import { Box, Button } from '@chakra-ui/react';
import React from 'react';
import Slider from 'react-slick';
import  CardTeam  from './CardTeam';

const items = [
  {
    image: 'https://i.ibb.co/W5KYg03/luffy.webp',
    title: 'Lucas',
    description: 
    '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!"'
  },
  {
    image: 'https://avatars.githubusercontent.com/u/56506788?v=4',
    title: 'Kyler Kai',
    description: 
    '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!"'
  },
  {
    image: 'https://i.ibb.co/86GcL71/3874767c77058ddda1b1328d4fb71ac7.webp',
    title: 'Iki hiyori',
    description: 
    '"Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!"'
  },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 400,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  autoplay: true,
};

const SliderTeam: NextPage = () => {
  return (
    <Box id="SliderTeam" pb={[8, 16]}>
      <Slider {...settings}>
        {items.map(item => (
          <CardTeam {...item} key={item.title}/>
        ))}
      </Slider>
    </Box>
  );
};

export default SliderTeam