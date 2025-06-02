import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Form, FormButton } from '../components/Form';
import { authService } from '../services/api';

const Container = styled.div`
  min-height: 100vh;
  padding: 2rem;
  background: #f5f5f5;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  color: #333;
  text-align: center;
`;

const Table = styled.table`
  width: 100%;
  min-width: 600px;
  max-width: 1200px;
  margin: 0 auto;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-collapse: collapse;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  display: block;
  margin-bottom: 2rem;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #ccc transparent;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 10px;
  }
`;



const Th = styled.th`
  padding: 1rem;
  text-align: left;
  border-bottom: 2px solid #eee;
  color: #333;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  color: #666;
`;

const JweCell = styled(Td)`
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media (max-width: 768px) {
    max-width: 150px;
  }
`;

export default function History() {
  const router = useRouter();
  const [history, setHistory] = useState<any[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const data = await authService.getHistory();
      setHistory(data);
      setError('');
    } catch (err) {
      setError('Failed to load history. Please try again.');
    }
  };

  return (
    <Container>
      <Title>Login History</Title>

      {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              <Th>Email</Th>
              <Th>Date</Th>
              <Th>JWE</Th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <Td>{item.email}</Td>
                <Td>{new Date(item.createdAt).toLocaleString()}</Td>
                <JweCell title={item.jwe}>{item.jwe}</JweCell>
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <FormButton onClick={() => router.push('/')}>
          Back to Login
        </FormButton>
      </div>
    </Container>
  );
} 