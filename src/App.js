import { useRoutes } from 'react-router';
import { useEffect } from'react';
import Layout from './components/Layout.jsx';
import LayoutBook from './components/Layout2.jsx';
import Main from './pages/Main.jsx';
import Auth from './pages/auth.jsx';
import Catalog from './pages/Catalog.jsx';
// import axios from 'axios';
import About from './pages/About.jsx'
import NewsContainer from './pages/NewsContainer.jsx'
import InfoNews from './pages/InfoNews.jsx'
import Feedback from './pages/Feedback.jsx';

import Book from './pages/Book.jsx'
import User from './pages/user.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'


const routes = [
  {
  path: '/Auth/*',
  element: <Auth />
  },
  {
    path: '/user',
    element: (
      <PrivateRoute>
        <LayoutBook />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <User />, // Защищённый компонент
      },
    ],
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
    element: <LayoutBook />,
    children: [
      {
        index: true,
        element: <Book />,
      }
    ]
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
      path: 'Feedback',
      element: <Feedback />,
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
