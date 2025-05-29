import React from 'react';
import { useRouter } from 'next/router';
import styles from './navbar.module.scss';

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <ul>
        <li className={styles.navItem} onClick={() => router.push('/')}>Login</li>
        <li className={styles.navItem} onClick={() => router.push('/decrypt')}>Decrypt</li>
        <li className={styles.navItem} onClick={() => router.push('/history')}>History</li>
      </ul>
    </nav>
  );
};
