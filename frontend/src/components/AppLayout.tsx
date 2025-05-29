// src/components/AppLayout.tsx
import React from 'react';
import { Navbar } from './navbar/Navbar';
import Footer from './footer/footer';

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer></Footer>
    </>
  );
};

export default AppLayout;
