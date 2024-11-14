import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import layoutStyles from '../css/layout.module.css'

const Layout = () => (
  <div className={layoutStyles.app}>
    <Header />
    <main className={layoutStyles.app__content}>
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default Layout;
