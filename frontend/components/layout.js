import React from 'react';
import Navbar from '../components/navbar';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();

  const hideNavbar = router.pathname === '/login' || router.pathname === '/register';

  return (
    <div>
      {!hideNavbar && <Navbar />}
      <main>{children}</main>
    </div>
  );
};

export default Layout;