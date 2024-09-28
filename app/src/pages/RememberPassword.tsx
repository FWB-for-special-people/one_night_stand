import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import BackButton from '../inputs/BackButton.tsx';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      console.log('Wysłanie e-maila do:', email);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setMessage(
        'E-mail do resetowania hasła został wysłany. Sprawdź swoją skrzynkę.',
      );
    } catch (err) {
      console.error('Błąd podczas wysyłania e-maila:', err);
      setError(
        'Nie udało się wysłać wiadomości e-mail. Spróbuj ponownie później.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '1rem',
        gap: '1rem'
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: '1rem' }}>
        Przypomnienie hasła
      </Typography>

      <Typography
        variant="body1"
        sx={{ marginBottom: '1rem', textAlign: 'center' }}
      >
        Wpisz swój adres e-mail, a my wyślemy Ci link do zresetowania hasła.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Adres email"
          type="email"
          variant="outlined"
          fullWidth
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ marginBottom: '16px' }}
          disabled={loading}
        />

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Wysyłanie...' : 'Wyślij link resetujący hasło'}
        </Button>
      </form>

      {message && (
        <Typography variant="body2" color="success" sx={{ marginTop: '1rem' }}>
          {message}
        </Typography>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ marginTop: '1rem' }}>
          {error}
        </Typography>
      )}

      <BackButton />
    </Box>
  );
};

export default ForgotPassword;
