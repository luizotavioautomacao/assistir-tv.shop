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

const TextArea = styled.textarea`
  width: 100%;
  min-height: 100px;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  resize: vertical;
`;

export default function Decrypt() {
  const router = useRouter();
  const [decryptedData, setDecryptedData] = useState<any>(null);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const jwe = formData.get('jwe') as string;

    try {
      const response = await authService.decrypt({ jwe });
      setDecryptedData(response);
      setError('');
    } catch (err) {
      setError('Failed to decrypt JWE. Please check the input.');
      setDecryptedData(null);
    }
  };

  return (
    <Container>
      <Title>Decrypt JWE</Title>
      <Form onSubmit={handleSubmit}>
        <TextArea
          name="jwe"
          placeholder="Paste your JWE here"
          required
        />
        <FormButton>Decrypt</FormButton>
      </Form>

      {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}

      {decryptedData && (
        <>
          <Result>{JSON.stringify(decryptedData, null, 2)}</Result>
          <FormButton onClick={() => router.push('/history')}>
            View History
          </FormButton>
        </>
      )}
    </Container>
  );
} 