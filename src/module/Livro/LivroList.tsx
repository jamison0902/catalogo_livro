import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import ExibirModal from "../../components/Modal/ExibirModal";
import { ApiStatus, ILivro } from "./Livro.type";
import { deleteLivroAction, getLivroListAction } from "./LivroSlice";





const LivroList = () => {
    const { list, listStatus } = useAppSelector((state: RootState) => state.livro);
    const dispatch = useAppDispatch();
    const navigator = useNavigate();

    useEffect(() => {
        dispatch(getLivroListAction());
    }, []);


    return (
        <Card>
            <Card.Header><h3>Catálogo de Livro</h3></Card.Header>
            <Card.Body>
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th>Título</th>
                            <th>Resumo</th>
                            <th>Editora</th>
                            <th>Autores</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listStatus === ApiStatus.loading && <tr><td colSpan={5}>Carregando Catálogo</td></tr>}
                        {listStatus === ApiStatus.error && <tr><td colSpan={5}>Erro ao Carregar Catálogo</td></tr>}
                        {listStatus === ApiStatus.ideal &&
                            list.map((livro: ILivro, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>{livro.titulo}</td>
                                        <td>{livro.resumo}</td>
                                        <td>{livro.editora}</td>
                                        <td>{livro.autor}</td>
                                        <td>
                                            <ExibirModal livro={livro} />
                                            <input className="m-1 btn btn-success" type="button" value='Editar' onClick={() => {
                                                navigator(`/edit/${livro.id}`);
                                            }} />
                                            <input className="btn btn-danger" type="button" value='Deletar' onClick={() => {
                                                dispatch(deleteLivroAction(livro.id));
                                            }} />
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default LivroList;


