// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import AppLayout from '../components/AppLayout';
import '../styles/global.scss'; // ✅ Apenas aqui você importa CSS global

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
