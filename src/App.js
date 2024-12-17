import { useRoutes } from 'react-router';
import { useEffect } from'react';
import Layout from './components/Layout.jsx';
import Layout2 from './components/Layout2.jsx';
import Layout3 from './components/Layout3.jsx';

import Main from './pages/Main.jsx';
import Auth from './pages/auth.jsx';
import Catalog from './pages/Catalog.jsx';
import About from './pages/About.jsx'
import NewsContainer from './pages/NewsContainer.jsx'
import InfoNews from './pages/InfoNews.jsx'
import Feedback from './pages/Feedback.jsx';

import Book from './pages/Book.jsx'

import User from './pages/user.jsx'
import Admin from './pages/admin.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'
import PrivateAdminRoute from './components/PrivateAdminRoute.jsx';


const routes = [
  {
  path: '/Auth/*',
  element: <Auth />
  },
  {
    path: '/user',
    element: (
      <PrivateRoute>
        <Layout2 />
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
    path: '/admin',
    element: (
      <PrivateAdminRoute>
        <Admin /> {/* Компонент админки */}
      </PrivateAdminRoute>
    ),
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
    element: <Layout2 />,
    children: [
      {
        index: true,
        element: <Book />,
      }
    ]
  },
  {
    path: 'Feedback',
    element: <Layout3 />,
    children: [
      {
        index: true,
        element: <Feedback />,
      }
    ]
  },
  {
    path: '/InfoNews/:id',
    element: <Layout2 />,
    children: [
      {
        index: true,
        element: <InfoNews />,
      }
    ]
  } ,
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
