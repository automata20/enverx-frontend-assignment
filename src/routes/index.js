import { createBrowserRouter } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Dashboard from 'pages/Dashboard';
// import VisualChart from 'components/VisualChart';

// router configuration for RouterProvider element in react-router
const RoutesConfig = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/auth',
    children: [
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'signup',
        element: <Signup />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  // {
  //   path: '/visualize',
  //   element: <VisualChart />
  // },
  {
    path: '*',
    element: <>Page Not Found</>
  }
]);

export default RoutesConfig;