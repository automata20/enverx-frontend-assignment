/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import RoutesConfig from 'routes';
// import { Button } from '@mui/material';
import CustomAppBar from 'components/CustomAppBar';
import './App.scss';

function App() {
  return (
    <>
      <CustomAppBar />
      {/* <Button variant="contained" onClick={signInWithGoogle}>
        Sign In With Google
      </Button> */}
      <div style={{ marginTop: '20px' }}>
        <RouterProvider router={RoutesConfig} />
      </div>
    </>
  );
}

export default App;
