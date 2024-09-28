import React, { useState } from 'react';
import { Box, Button, Typography, Fade, Paper } from '@mui/material';

interface UserProps {
  id: string;
  name: string;
  avatar: string;
}

const Avatar: React.FC<UserProps> = ({ name, avatar }) => {
  const [showUserCard, setShowUserCard] = useState(false);

  // Funkcja obsługująca kliknięcie na awatar
  const handleAvatarClick = () => {
    setShowUserCard(true);
  };

  // Funkcja obsługująca kliknięcie na przycisk Follow
  const handleFollowClick = () => {
    setShowUserCard(false);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem', position: 'relative' }}>
      {/* Awatar */}
      <Box
        onClick={handleAvatarClick}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          borderRadius: '50%',
          backgroundColor: '#ffffff',
          border: '2px solid #f0f0f0',
          width: '60px',
          height: '60px',
          overflow: 'hidden',
          backgroundImage: `url(${avatar})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          cursor: 'pointer', // Ustawienie kursora na wskaźnik
          transition: 'transform 0.3s ease-in-out', // Dodanie efektu transformacji
          '&:hover': {
            transform: 'scale(1.1)', // Powiększenie przy najechaniu
          },
        }}
      />

      {/* Kafelek z danymi użytkownika po lewej stronie w stylu iOS */}
      <Fade in={showUserCard} timeout={500}>
        <Paper
          elevation={3}
          sx={{
            padding: '1rem',
            borderRadius: '16px', // Zaokrąglone rogi
            display: showUserCard ? 'flex' : 'none',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1rem',
            width: '250px',
            position: 'absolute', // Pozycjonowanie absolutne względem kontenera głównego
            left: '-270px', // Przesunięcie kafelka w lewo
            top: '50%', // Wyśrodkowanie kafelka w pionie względem awatara
            transform: 'translateY(-50%)', // Wyrównanie środka kafelka do środka awatara
            zIndex: 1, // Ustawienie wyższego indeksu z-index, aby kafelek był nad innymi elementami
            backdropFilter: 'blur(20px)', // Efekt rozmycia dla glassmorphism
            backgroundColor: 'rgba(255, 255, 255, 0.3)', // Półprzezroczyste białe tło
            border: '1px solid rgba(255, 255, 255, 0.3)', // Subtelna, półprzezroczysta ramka
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Delikatny cień
          }}
        >
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', color: '#000', textShadow: '0px 1px 2px rgba(0, 0, 0, 0.1)' }}
          >
            {name}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFollowClick}
            sx={{
              textTransform: 'none',
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)', // Cień dla przycisku w stylu iOS
              padding: '0.5rem 1rem',
              background: 'linear-gradient(135deg, #4caf50 0%, #66bb6a 100%)', // Gradient w stylu iOS
              '&:hover': {
                background: 'linear-gradient(135deg, #43a047 0%, #4caf50 100%)', // Zmiana koloru przycisku po najechaniu
              },
            }}
          >
            Follow
          </Button>
        </Paper>
      </Fade>
    </Box>
  );
};

export default Avatar;