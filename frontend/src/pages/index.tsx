import React from 'react';
import styles from './index.module.scss';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>📺 Projeto vivotv.shop</h1>
      <p className={styles.subtitle}>
        Sistema de autenticação com JWE | Frontend em Next.js + SCSS + Testes
      </p>

      <ul className={styles.links}>
        <li>
          🔐 <a href="/login">Login</a>
        </li>
        <li>
          🔓 <a href="/decrypt">Decrypt</a>
        </li>
        <li>
          📜 <a href="/history">Histórico</a>
        </li>
        <li>
          🧠 <a href="https://github.com/luizotavioautomacao/vivotv.shop"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repositório no GitHub
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Home;
