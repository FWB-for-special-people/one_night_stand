import { Box, Button } from '@mui/material';
import { useAtom} from 'jotai';
import { darkModeAtom } from 'src/atoms.ts';

const ThemeSwitcher = () => {
const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
      <Button
        variant={!isDarkMode ? 'contained' : 'outlined'}
        onClick={() => setIsDarkMode(false)}
      >
        Jasny
      </Button>
      <Button
        variant={isDarkMode ? 'contained' : 'outlined'}
        onClick={() => setIsDarkMode(true)}
      >
        Ciemny
      </Button>
    </Box>
  );
};

export default ThemeSwitcher;
