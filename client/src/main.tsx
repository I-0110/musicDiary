import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Metronome from './components/Metronome/index.js';
import Tuner from './components/Tuner/index.js';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Error from './pages/Error';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/profiles/:profileId',
        element: <Profile />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/metronome',
        element: <Metronome />
      }, {
        path: '/tuner',
        element: <Tuner />
      }
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
