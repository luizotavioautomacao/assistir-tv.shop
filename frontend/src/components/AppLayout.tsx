// src/components/AppLayout.tsx
import React from 'react';
import { Navbar } from './navbar/Navbar';

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default AppLayout;
