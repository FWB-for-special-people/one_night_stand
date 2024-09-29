import React, { PropsWithChildren } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Navbar from 'src/pages/Feed/components/NavBarTop.tsx';
import NavBarBottomMobile from 'src/pages/Feed/components/NavBarBottomMobile.tsx';
import NavBarBottomDesktop from 'src/pages/Feed/components/NavBarBottomDesktop.tsx';
// import { useSelector, useDispatch } from 'react-redux';
// import { toggleCollapse } from 'src/store/slices/uiSlice.ts';
// import { RootState } from 'src/store/store.ts';
import { useAtom } from 'jotai';
import { isSideMenuCollapsedAtom } from 'src/atoms.ts';

const Feed: React.FC<PropsWithChildren> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [isSideMenuCollapsed, setIsSideMenuCollapsed] = useAtom(isSideMenuCollapsedAtom);

  // const dispatch = useDispatch();
  // const isCollapsed = useSelector((state: RootState) => state.ui.isCollapsed);
  //
  const handleToggle = () => {
    setIsSideMenuCollapsed(!isSideMenuCollapsed);
  };

  return (
    <Box sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Navbar />

      <Box
        sx={{
          paddingTop: '4.5rem',
          paddingBottom: '3.5rem',
          display: 'flex',
          justifyContent: isMobile ? 'center' : 'flex-start',
          transform: isMobile ? 'none' : isSideMenuCollapsed ? 'translateX(10vw)' : 'translateX(25vw)',
        }}
      >
        <Box
          sx={{
            width: isMobile ? '100%' : isSideMenuCollapsed ? '85%' : '70%',
          }}
        >
          {children}
        </Box>
      </Box>

      {isMobile ? <NavBarBottomMobile /> :
        <NavBarBottomDesktop handleToggle={handleToggle} isCollapsed={isSideMenuCollapsed} />}
    </Box>
  );
};

export default Feed;
