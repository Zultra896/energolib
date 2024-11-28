import { useRoutes } from 'react-router';
import { useEffect } from'react';
import Layout from './components/Layout.jsx';
import Main from './pages/Main.jsx';
import Auth from './pages/auth.jsx';
import Catalog from './pages/Catalog.jsx';
// import axios from 'axios';

const routes = [
  {
  path: '/Auth/*',
  element: <Auth />
  },
  {
    path: '/catalog',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Catalog />,
      }
    ]
  },
  {  
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Main />,
    },
  ]
  }
]

function App() {

  useEffect(() => {
    document.body.style.backgroundColor = '#2C3035';
  
    return () => {
      document.body.style.backgroundColor = ''; 
    };
  }, []);

  const elements = useRoutes(routes);
  return (
    <div>
      {elements}
    </div>
  );
}

export default App;
