import { useAppDispatch, useAppSelector } from "../../app/hooks";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { Input } from "../../components/Input";
import { ApiStatus, ILivroForm, IUpdateLivroActionProps } from "./Livro.type";
import { createLivroAction, resetCreateListStatus, updateLivroAction } from "./LivroSlice";
import { RootState } from "../../app/store";
import { useNavigate, useParams } from "react-router-dom";

interface IProps {
  isEditForm?: boolean;
}

const LivroForm = (props: IProps) => {
  const { isEditForm } = props;
  const navigator = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [resumo, setResumo] = useState('');
  const [editora, setEditora] = useState('');
  const [autor, setAutor] = useState('');

  const params = useParams();
  const livroIdToEdit = useRef(parseInt(params.id || ""));

  const { list } = useAppSelector((state: RootState) => state.livro);

  useEffect(() => {
    if (isEditForm && livroIdToEdit.current) {

      const livroData = list.filter((x) => x.id === livroIdToEdit.current);

      if (livroData.length) {
        setTitulo(livroData[0].titulo);
        setResumo(livroData[0].resumo);
        setEditora(livroData[0].editora);
        setAutor(livroData[0].autor);
      }
    }
  }, [isEditForm, list]);

  const { createLivroFormStatus, updateLivroFormStatus } = useAppSelector((state: RootState) => state.livro);
  const dispatch = useAppDispatch();


  const onSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    const data: ILivroForm = { titulo, resumo, editora, autor };

    if (isEditForm) {
      const dirtyFormData: IUpdateLivroActionProps = { id: livroIdToEdit.current, data };
      dispatch(updateLivroAction(dirtyFormData));
    } else {
      dispatch(createLivroAction(data));
    }
  };

  useEffect(() => {
    if (createLivroFormStatus === ApiStatus.success) {
      setTitulo("");
      setResumo("");
      setEditora("");
      setAutor("");
      dispatch(resetCreateListStatus());
    }
  }, [createLivroFormStatus, dispatch]);

  return (
    <Card>
      <Card.Header><h3>Cadastro de Livros</h3></Card.Header>
      <Card.Body>
        <Form onSubmit={onSubmitForm}>
          <Input label='Título' type='text' value={titulo} onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTitulo(e.target.value)
          }} />
          <Input label='Resumo' type='text' value={resumo} onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setResumo(e.target.value)
          }} />
          <Input label='Editora' type='text' value={editora} onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEditora(e.target.value)
          }} />
          <Input label='Autor' type='text' value={autor} onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setAutor(e.target.value)
          }} />
          <input className="m-1 btn btn-primary" type="button" value='Voltar' onClick={() => { navigator("/"); }} />
          <input className="btn btn-primary" type="submit" value={isEditForm ? "Atualizar" : "Cadastrar"} disabled={
            createLivroFormStatus === ApiStatus.loading || updateLivroFormStatus === ApiStatus.loading} />

        </Form>
      </Card.Body>
    </Card>
  );
}

export default LivroForm;