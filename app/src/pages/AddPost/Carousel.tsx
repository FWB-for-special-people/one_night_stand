// @ts-nocheck
import React from 'react';
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Przykładowe dane kart
const cards = [
  { id: 1, title: 'Card 1', description: 'This is card number 1' },
  { id: 2, title: 'Card 2', description: 'This is card number 2' },
  { id: 3, title: 'Card 3', description: 'This is card number 3' },
  { id: 4, title: 'Card 4', description: 'This is card number 4' },
  { id: 5, title: 'Card 5', description: 'This is card number 5' },
];

// Styled components dla karty z efektem nakładania się
const OverlapCard = styled(Card)(({ theme, active }) => ({
  width: '85%', // Ustaw szerokość karty na 100% kontenera
  maxWidth: '350px', // Maksymalna szerokość karty
  height: '75vh', // Wysokość karty
  margin: '0 20px',
  transition: 'transform 0.5s ease-in-out, box-shadow 0.3s ease-in-out',
  borderRadius: '20px',
  position: 'relative',
  boxShadow: active
    ? '0 16px 48px rgba(0, 0, 0, 0.3)' // Mocniejszy cień dla aktywnej karty
    : '0 8px 24px rgba(0, 0, 0, 0.1)',
  transform: active ? 'scale(1.0)' : 'scale(0.8)',
  zIndex: active ? 10 : 1,
  backgroundColor: active ? '#e3f2fd' : '#fff', // Subtelna zmiana tła
  '&:hover': {
    transform: active ? 'scale(0.9)' : 'scale(0.8)', // Dodatkowe powiększenie przy hover
    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.2)',
  },
}));

const OverlappingCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    beforeChange: (current, next) => setActiveIndex(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Wyświetlaj jedną kartę na tabletach
          centerPadding: '0px',
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerPadding: '0px',
        },
      },
    ],
  };

  const [activeIndex, setActiveIndex] = React.useState(2);

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
        padding: 0, // Usuń padding z głównego kontenera
        overflow: 'hidden', // Dodaj overflow hidden, aby nic nie wychodziło poza kontener
      }}
    >
      <Box
        sx={{
          width: '100%', // Kontener zajmuje 100% szerokości
          maxWidth: '1200px', // Maksymalna szerokość kontenera
          margin: '0 auto',
          position: 'relative',
          overflow: 'hidden', // Ukryj nadmiar treści wychodzącej poza kontener
        }}
      >
        <Slider {...settings}>
          {cards.map((card, index) => (
            <OverlapCard key={card.id} active={index === activeIndex}>
              <CardContent
                sx={{
                  textAlign: 'center',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h4" gutterBottom>
                  {card.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ marginBottom: '1.5rem' }}>
                  {card.description}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: activeIndex === index ? '#1565c0' : '#1976d2',
                    '&:hover': { backgroundColor: '#0d47a1' },
                  }}
                >
                  Learn More
                </Button>
              </CardContent>
            </OverlapCard>
          ))}
        </Slider>
      </Box>
    </Box>
  );
};

export default OverlappingCarousel;