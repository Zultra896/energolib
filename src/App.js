import { useRoutes } from 'react-router';
import { useEffect } from'react';
import Layout from './components/Layout.jsx';
import Layout2 from './components/Layout2.jsx';
import Layout3 from './components/Layout3.jsx';

import Main from './pages/Main.jsx';
import Auth from './pages/Auth.jsx';
import Catalog from './pages/Catalog.jsx';
import About from './pages/About.jsx'
import NewsContainer from './pages/NewsContainer.jsx'
import InfoNews from './pages/InfoNews.jsx'
import Feedback from './pages/Feedback.jsx';
import Book from './pages/Book.jsx'

import User from './pages/user.jsx'
import Admin from './pages/admin.jsx'

import CreateNews from './components/CreateNews.jsx';
import CreateBook from './components/CreateBook.jsx';
import CreateCollection from './components/CreateCollection.jsx';
import CreatePerson from './components/CreatePerson.jsx';

import EditPerson from './components/EditPerson.jsx';

import Collections from './components/Collection.jsx';
import Collection from './pages/Collection.jsx';

import Persons from './pages/Persons.jsx'
import Person from './pages/Person.jsx'

import PrivateRoute from './components/PrivateRoute.jsx'
import PrivateAdminRoute from './components/PrivateAdminRoute.jsx';
import styles from './css/global.module.css';



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
    path: '/admin/news',
    element: (
      <PrivateAdminRoute>
        <CreateNews />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/admin/book',
    element: (
      <PrivateAdminRoute>
        <CreateBook />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/admin/collection', 
    element: (
      <PrivateAdminRoute>
        <CreateCollection />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/admin/collections/:id', 
    element: (
      <PrivateAdminRoute>
        <Collections />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/admin/person',
    element: (
      <PrivateAdminRoute>
        <CreatePerson />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/admin/edit/person/:id', 
    element: (
      <PrivateAdminRoute>
        <EditPerson />
      </PrivateAdminRoute>
    ),
  },
  {
    path: '/persons',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Persons />
      }
    ]
  },
  {
    path: '/persons/:id',
    element: <Layout3 />,
    children: [
      {
        index: true,
        element: <Person />,
      }
    ]
  },
  {
    path: '/collection/:id',
    element: <Layout3 />,
    children: [
      {
        index: true,
        element: <Collection />,
      }
    ]
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
