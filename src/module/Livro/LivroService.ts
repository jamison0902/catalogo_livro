import httpService from "../../service/HttpService"
import ApiConfig from "../../service/ApiConfig"
import { ILivro, ILivroForm } from "./Livro.type";

export const getLivroListApi = async () => {
    return await httpService.get<ILivro[]>(ApiConfig.livro);
}

export const createLivroApi = async (data: ILivroForm) => {
    return await httpService.post<ILivro>(ApiConfig.livro, data);
}

export const deleteLivroApi = async (id: number) => {
    const url = `${ApiConfig.livro}/${id}`
    return await httpService.delete(url);
}

export const updateLivroApi = async (id: number, data: ILivroForm) => {
    const url = `${ApiConfig.livro}/${id}`
    return await httpService.put(url, data);
}