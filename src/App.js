/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import RoutesConfig from 'routes';
import { useSelector, useDispatch } from 'react-redux';
// import { signInWithGoogle, logout } from 'services/auth';
import { updateCurrentUser, updateIsLoggedIn } from 'store/user';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

import {
  // createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';
import { auth, googleProvider, db } from './firebase.config';

import './App.scss';

const settings = ['Logout'];

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.currentUser);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const signInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        // console.log(res.user);
        dispatch(updateCurrentUser({ uid: res.user.uid }));
        dispatch(updateIsLoggedIn(true));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const logout = async () => {
    signOut(auth, googleProvider).then((res) => {
      console.log(res);
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    });
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none'
              }}
            >
              EET
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
            {user && isLoggedIn === true ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="User" />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={logout}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ '& button': { m: 1 } }}>
                <Button variant="contained" color="error" onClick={signInWithGoogle}>
                  Signup with google
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <div style={{ marginTop: '20px' }}>
        <RouterProvider router={RoutesConfig} />
      </div>
    </>
  );
}

export default App;
