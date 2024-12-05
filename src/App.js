import { useRoutes } from 'react-router';
import { useEffect } from'react';
import Layout from './components/Layout.jsx';
import Main from './pages/Main.jsx';
import Auth from './pages/auth.jsx';
import Catalog from './pages/Catalog.jsx';
// import axios from 'axios';
import About from './pages/About.jsx'
import NewsContainer from './pages/NewsContainer.jsx'
import InfoNews from './pages/InfoNews.jsx'

import Book from './pages/Book.jsx'


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
    path: '/book/:id',
    element: <Book />,
  }
  ,
  {  
  path: '/',
  element: <Layout />,
  children: [
    {
      index: true,
      element: <Main />,
    },
    {
      path: 'About',
      element: <About />,
    },
    {
      path: 'NewsContainer',
      element: <NewsContainer />,
      children: [
        {
          path: 'InfoNews',
          element: <InfoNews />,
        }
      ]
    }
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
