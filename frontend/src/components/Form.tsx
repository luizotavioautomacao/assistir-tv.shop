import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background: #0070f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #0051b3;
  }
`;

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <FormContainer onSubmit={onSubmit}>{children}</FormContainer>;
};

export const FormInput: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => {
  return <Input {...props} />;
};

export const FormButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return <Button type="submit" {...props} />;
}; 