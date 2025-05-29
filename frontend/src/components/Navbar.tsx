import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Nav = styled.nav`
  width: 100%;
  background: #333;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: center;
`;

const NavList = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavItem = styled.li`
  color: white;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <Nav>
      <NavList>
        <NavItem onClick={() => router.push('/')}>Login</NavItem>
        <NavItem onClick={() => router.push('/decrypt')}>Decrypt</NavItem>
        <NavItem onClick={() => router.push('/history')}>History</NavItem>
      </NavList>
    </Nav>
  );
};
