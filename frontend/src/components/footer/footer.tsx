// src/components/footer/Footer.tsx
import React, { memo } from 'react';
import styles from './footer.module.scss';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div>
        {currentYear} © assistir-tv.shop | TV por assinatura.
        <div style={{ marginTop: '0.3rem' }}>
          Desenvolvido por {' '}
          <a target="_self" href="https://luizotavio.netlify.app" className={styles.footerLink}>
            Luiz Otávio
          </a>
        </div>
      </div>
    </footer>
  );
};

export default memo(Footer);
