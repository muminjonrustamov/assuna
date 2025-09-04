import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/navbar/navbar';
import Footer from '../components/footer/footer';

const Layout = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboard && <Navbar />}
      <main>
        <Outlet />
      </main>
      {!isDashboard && <Footer />}
    </>
  );
};

export default Layout;