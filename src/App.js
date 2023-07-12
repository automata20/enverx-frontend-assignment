/* eslint-disable no-unused-vars */
import { RouterProvider } from 'react-router-dom';
import RoutesConfig from 'routes';
import { Button } from '@mui/material';

import './App.scss';

function App() {
  return (
    <>
      <nav>Nav</nav>
      <Button variant="contained">Sign In With Google</Button>
      <RouterProvider router={RoutesConfig} />
    </>
  );
}

export default App;
