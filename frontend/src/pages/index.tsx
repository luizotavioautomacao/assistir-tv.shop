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

const Result = styled.pre`
  margin-top: 1rem;
  padding: 1rem;
  background: #f0f0f0;
  border-radius: 4px;
  overflow-x: auto;
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
          <Result>{jwe}</Result>
          <FormButton onClick={() => router.push('/decrypt')}>
            Go to Decrypt
          </FormButton>
        </>
      )}
    </Container>
  );
} 