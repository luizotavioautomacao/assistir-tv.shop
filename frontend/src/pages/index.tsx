import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Form, FormInput, FormButton } from '../components/Form';
import { authService } from '../services/api';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #f5f5f5;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 20px;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  font-family: monospace;
  background: #f0f0f0;
  resize: vertical;
`;


const CopyButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 0.875rem;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);

  &:hover {
    background-color: #f0f0f0;
  }
`;

const TextAreaWrapper = styled.div`
  position: relative;
  width: 100%;
  margin: 1rem auto; /* <-- Centraliza horizontalmente */
  
  @media (max-width: 700px) {
    max-width: 260px;
  }

  @media (min-width: 701px) {
    max-width: 600px;
  }
`;

const CenteredRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default function Login() {
  const router = useRouter();
  const [jwe, setJwe] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const response = await authService.login({ email, password });
      setJwe(response.jwe);
      setError('');
    } catch (err) {
      setError('Failed to login. Please try again.');
      setJwe('');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Texto copiado com sucesso!');
    }).catch((err) => {
      console.error('Erro ao copiar:', err);
    });
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <FormButton>Login</FormButton>
      </Form>

      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}

      {jwe && (
        <>
          <CenteredRow>
            <TextAreaWrapper>
              <TextArea value={jwe} readOnly rows={12} />
              <CopyButton onClick={() => copyToClipboard(jwe)}>📋 Copy</CopyButton>
              {/* <FormButton onClick={() => router.push('/decrypt')}>
                Go to Decrypt
              </FormButton> */}
            </TextAreaWrapper>
          </CenteredRow>
        </>
      )}
    </Container>
  );
} 