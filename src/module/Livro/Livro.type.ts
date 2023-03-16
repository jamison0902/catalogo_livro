export interface ILivro {
    id: number;
    titulo: string;
    resumo: string;
    editora: string
    autor: string;
}

export enum ApiStatus {
    "loading",
    "ideal",
    "success",
    "error"
}

export interface ILivroState {
    list: ILivro[],
    listStatus: ApiStatus,
    createLivroFormStatus: ApiStatus,
    updateLivroFormStatus: ApiStatus

}

export interface ILivroForm {
    titulo: string;
    resumo: string;
    editora: string
    autor: string;
}

export interface IUpdateLivroActionProps {
    id: number;
    data: ILivroForm;
  }
  