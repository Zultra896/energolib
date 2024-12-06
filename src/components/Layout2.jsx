import { Outlet } from 'react-router-dom';
import Header from './Header';
import layoutStyles from '../css/layout.module.css'

const Layout2 = () => (
  <div className={layoutStyles.app}>
    <Header />
    <main className={layoutStyles.app__content}>
      <Outlet />
    </main>
  </div>
);

export default Layout2;
