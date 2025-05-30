import React from 'react';
import styles from './index.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>📺 Projeto vivotv.shop</h1>
      <p className={styles.subtitle}>
        Sistema de autenticação com JWE | Backend NestJS + Jest | Frontend Next.js + SCSS + Jest
      </p>
    </div>
  );
};

export default Home;
