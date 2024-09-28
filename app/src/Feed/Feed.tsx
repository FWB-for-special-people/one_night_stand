import React, { PropsWithChildren } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './components/NavBarTop.tsx';
import NavBarBottomMobile from 'src/Feed/components/NavBarBottomMobile.tsx';
import NavBarBottomDesktop from 'src/Feed/components/NavBarBottomDesktop.tsx';
import { useSelector, useDispatch } from 'react-redux';
import { toggleCollapse } from 'src/store/slices/uiSlice.ts';
import { RootState } from 'src/store/store.ts';

const Feed: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const isCollapsed = useSelector((state: RootState) => state.ui.isCollapsed);

  const handleToggle = () => {
    dispatch(toggleCollapse());
  };

  return (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Navbar />

      <Box
        sx={{
          paddingTop: '5rem',
          paddingBottom: '3.5rem',
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-start',
          transform: isMobile ? 'none' : isCollapsed ? 'translateX(10vw)' : 'translateX(25vw)',
        }}
      >
        <Box
          sx={{
            width: isMobile ? '100%' : isCollapsed ? '85%' : '70%',
          }}
        >
          {children}
        </Box>
      </Box>

      {isMobile ? <NavBarBottomMobile /> :
        <NavBarBottomDesktop handleToggle={handleToggle} isCollapsed={isCollapsed} />}
    </Box>
  );
};

export default Feed;