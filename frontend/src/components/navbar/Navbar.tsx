import React from 'react';
import { useRouter } from 'next/router';
import styles from './navbar.module.scss';

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <nav className={styles.nav}>
      <ul>
        {/* Desktop version */}
        <li className={`${styles.navItem} ${styles.desktop}`} onClick={() => router.push('/')}>🏠 Home</li>
        <li className={`${styles.navItem} ${styles.desktop}`} onClick={() => router.push('/login')}>🔐 Login</li>
        <li className={`${styles.navItem} ${styles.desktop}`} onClick={() => router.push('/decrypt')}>🔓 Decrypt</li>
        <li className={`${styles.navItem} ${styles.desktop}`} onClick={() => router.push('/history')}>🔍 History</li>
        <li className={`${styles.navItem} ${styles.desktop}`} onClick={() => router.push('/api')}>📚 Swagger</li>

        {/* Mobile version */}
        <li className={`${styles.navItem} ${styles.mobile}`} onClick={() => router.push('/')}>Home</li>
        <li className={`${styles.navItem} ${styles.mobile}`} onClick={() => router.push('/login')}>Login</li>
        <li className={`${styles.navItem} ${styles.mobile}`} onClick={() => router.push('/decrypt')}>Decrypt</li>
        <li className={`${styles.navItem} ${styles.mobile}`} onClick={() => router.push('/history')}>History</li>
        <li className={`${styles.navItem} ${styles.mobile}`} onClick={() => router.push('/api')}>Swagger</li>
      </ul>
    </nav>
  );
};
