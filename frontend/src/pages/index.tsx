import React from 'react';
import styles from './index.module.scss';

const list = [
  {
    title: 'Repositório',
    label: 'Github',
    url: 'https://github.com/luizotavioautomacao/vivotv.shop',
  },
];


const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>📺 Projeto vivotv.shop</h1>
      <p className={styles.subtitle}>
        Sistema de autenticação com JWE | Backend NestJS + Jest | Frontend Next.js + SCSS + Jest
      </p>

      <div className={styles.cardGrid}>
        {list.map(({ title, label, url }) => (
          <div key={label} className={styles.card}>
            <h3>{title}</h3>
            <a href={url} target="_blank" rel="noopener noreferrer" className={styles.button}>
              {label}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
