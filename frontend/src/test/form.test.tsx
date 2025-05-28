import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { FormInput, FormButton, Form } from '../components/Form';


describe('Form Component', () => {
    it('should render form with input and button', () => {
        const mockSubmit = jest.fn();

        render(
            <Form onSubmit={mockSubmit}>
                <FormInput name="email" placeholder="Email" />
                <FormButton>Submit</FormButton>
            </Form>
        );

        // Verifica se os elementos renderizam
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    });

    it('should call onSubmit when form is submitted', () => {
        const mockSubmit = jest.fn((e) => e.preventDefault());

        render(
            <Form onSubmit={mockSubmit}>
                <FormInput name="email" placeholder="Email" />
                <FormButton>Submit</FormButton>
            </Form>
        );

        const button = screen.getByRole('button', { name: /submit/i });

        fireEvent.click(button);

        expect(mockSubmit).toHaveBeenCalledTimes(1);
    });

    it('should allow typing in the input', () => {
        const mockSubmit = jest.fn((e) => e.preventDefault());

        render(
            <Form onSubmit={mockSubmit}>
                <FormInput name="email" placeholder="Email" />
                <FormButton>Submit</FormButton>
            </Form>
        );

        const input = screen.getByPlaceholderText('Email') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'test@example.com' } });

        expect(input.value).toBe('test@example.com');
    });
});
