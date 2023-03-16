import { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

export interface iProps {
    label: string,
    type?: string,
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: iProps) => {
    const { label, type = "text", value, onChange } = props;
    return (
        <>
            <Form.Group className="mb-3" controlId="formBasicTitulo">
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type} value={value} onChange={onChange} required />
            </Form.Group>
        </>

    )
};

