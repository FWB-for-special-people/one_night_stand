import React from 'react';
import { List, ListItemIcon, ListItemText, AppBar, Toolbar, ListItemButton, IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import CategoryIcon from '@mui/icons-material/Category';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface NavBarBottomDesktopProps {
  handleToggle: () => void;
  isCollapsed: boolean;
}

const NavBarBottomDesktop: React.FC<NavBarBottomDesktopProps> = ({handleToggle, isCollapsed}: NavBarBottomDesktopProps) => {

  const menuTextStyle = {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.875rem',
  }

  return (
      <AppBar
        position="fixed"
        sx={{
          width: isCollapsed ? '7vw' : '20vw',
          height: 'calc(100vh - 4rem)',
          left: 0,
          top: '4rem',
          backgroundColor: 'primary.main',
          paddingTop: '2rem',
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            height: '100%',
          }}
        >
          <List sx={{ flexGrow: 1, width: '100%', gap: '2rem' }}>
            <ListItemButton sx={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: '0.5rem 1rem' }}
                            component="a" href="/">
              <ListItemIcon sx={{ minWidth: '3rem', justifyContent: 'center' }}>
                <HomeIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Strona Główna" sx={{...menuTextStyle}} />}
            </ListItemButton>

            <ListItemButton sx={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: '0.5rem 1rem' }}
                            component="a" href="/categories">
              <ListItemIcon sx={{ minWidth: '3rem', justifyContent: 'center' }}>
                <CategoryIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Kategorie" sx={{...menuTextStyle}} />}
            </ListItemButton>

            <ListItemButton sx={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: '0.5rem 1rem' }}
                            component="a" href="/add-post">
              <ListItemIcon sx={{ minWidth: '3rem', justifyContent: 'center' }}>
                <AddCircleIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Dodaj Post" sx={{...menuTextStyle}} />}
            </ListItemButton>

            <ListItemButton sx={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: '0.5rem 1rem' }}
                            component="a" href="/my-profile">
              <ListItemIcon sx={{ minWidth: '3rem', justifyContent: 'center' }}>
                <AccountCircleIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Mój Profil" sx={{...menuTextStyle}} />}
            </ListItemButton>

            <ListItemButton sx={{ justifyContent: isCollapsed ? 'center' : 'flex-start', padding: '0.5rem 1rem' }}
                            component="a" href="/settings">
              <ListItemIcon sx={{ minWidth: '3rem', justifyContent: 'center' }}>
                <SettingsIcon sx={{ color: 'white' }} />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Ustawienia" sx={{...menuTextStyle}} />}
            </ListItemButton>
          </List>
        </Toolbar>
        <IconButton
          onClick={handleToggle}
          sx={{
            color: 'white',
            alignSelf: isCollapsed ? 'center' : 'flex-end',
            paddingRight: isCollapsed ? 0 : '1rem',
            paddingBottom: '1rem'
          }}
        >
          {isCollapsed ? <ChevronRightIcon fontSize={"large"}/> : <ChevronLeftIcon fontSize={"large"}/>}
        </IconButton>
      </AppBar>
  );
};

export default NavBarBottomDesktop;