// @ts-nocheck
import React from 'react';
import { Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useCardsImagesQuery } from "src/queries/useCardsImagesQuery.ts";
import axios from "axios";
import {API, PrefixedAPI} from "src/constants/api_routes.ts";
import {useAxios} from "src/hooks/useAxios.ts";
import { useNavigate } from 'react-router-dom';


const decodeUnicode = (text) => {
  try {
    return decodeURIComponent(JSON.parse(`"${text}"`));
  } catch (e) {
    return text;
  }
};




const OverlapCard = styled(Card)(({ theme, active }) => ({
  width: '90%',
  maxWidth: '600px',
  height: '500px',
  margin: '0 15px',
  transition: 'transform 0.5s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: '20px',
  position: 'relative',
  // boxShadow: active ? '0 16px 48px rgba(0, 0, 0, 0.3)' : '0 8px 24px rgba(0, 0, 0, 0.1)',
  transform: active ? 'scale(1.0)' : 'scale(0.9)',
  zIndex: active ? 10 : 1,
  backgroundColor: active ? '#e3f2fd' : '#fff',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(0.95)',
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)',
  },

  '@media (max-width: 1024px)': {
    height: '550px',
    maxWidth: '500px',
  },
  '@media (max-width: 768px)': {
    height: '550px',
    maxWidth: '400px',
  },
  '@media (max-width: 480px)': {
    height: '350px',
    maxWidth: '300px',
  },
}));

const Carousel = ({ text }) => {
  const { data, isLoading, isError } = useCardsImagesQuery();
  const [newCard, setNewCard] = React.useState({});
  const axiosInstance = useAxios();
  const navigate = useNavigate();




  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    centerMode: false,
    vertical: false,
    focusOnSelect: true,
    beforeChange: (current, next) => setActiveIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const [activeIndex, setActiveIndex] = React.useState(2);


  const flattenedCards = data?.pages?.reduce((acc, page) => acc.concat(page), []) || [];

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        padding: 0,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1400px',
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden',
          '@media (max-width: 1024px)': {
            maxWidth: '1000px',
          },
          '@media (max-width: 768px)': {
            maxWidth: '600px',
          },
          '@media (max-width: 480px)': {
            maxWidth: '320px',
          },
        }}
      >
        <Slider {...settings}>
          {flattenedCards.map((card, index) => (
            <OverlapCard key={card.id} active={(index === activeIndex).toString()}
            onClick={async () => {
                const response = await axiosInstance.post<TokenResponse>(API.cards, {image_id: card.id, text: text, tags: ["python", "js"]})
                navigate("/")

            }}>

              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

                <Box
                  sx={{
                    height: '70%',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '20px 20px 0 0',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    height: '30%',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {card.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      marginBottom: '0.5rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {card.description}
                  </Typography>

                  <Typography
                    variant="body1"
                    color="primary"
                    sx={{
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical',
                      WebkitLineClamp: 4,
                      textOverflow: 'ellipsis',
                      whiteSpace: 'normal',
                      maxHeight: '7.2em',
                    }}
                  >
                    {decodeUnicode(text)}
                  </Typography>
                </Box>
              </Box>
            </OverlapCard>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default Carousel;