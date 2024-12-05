import { useRoutes } from 'react-router';
import { useEffect } from'react';
import Layout from './components/Layout.jsx';
import Main from './pages/Main.jsx';
import Auth from './pages/Auth.jsx';
import About from './pages/About.jsx'
import NewsContainer from './pages/NewsContainer.jsx'
import InfoNews from './pages/InfoNews.jsx'
import Feedback from './pages/Feedback.jsx';

const routes = [
  {
  path: '/Auth/*',
  element: <Auth />
  },
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
