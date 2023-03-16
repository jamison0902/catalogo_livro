import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastError, toastSucces } from "../../components/ToastyfyConfig";
import { ApiStatus, ILivroForm, ILivroState, IUpdateLivroActionProps } from "./Livro.type";
import { createLivroApi, deleteLivroApi, getLivroListApi, updateLivroApi } from "./LivroService";

const initialState: ILivroState = {
    list: [],
    listStatus: ApiStatus.ideal,
    createLivroFormStatus: ApiStatus.ideal,
    updateLivroFormStatus: ApiStatus.ideal
};

export const getLivroListAction = createAsyncThunk(
    "livro/getLivroListAction",
    async () => {
        const response = await getLivroListApi();
        return response.data;
    });

export const createLivroAction = createAsyncThunk(
    "livro/createLivroAction",
    async (data: ILivroForm) => {
        const response = await createLivroApi(data);
        return response.data;
    });

export const deleteLivroAction = createAsyncThunk(
    "livro/deleteLivroAction",
    async (id: number) => {
        await deleteLivroApi(id);
        return id;
    });

export const updateLivroAction = createAsyncThunk(
    "livro/updateLivroAction",
    async ({ id, data }: IUpdateLivroActionProps) => {
        const response = await updateLivroApi(id, data);
        return response.data;
    });

const livroSlice = createSlice({
    name: "livro",
    initialState,
    reducers: {
        resetCreateListStatus: (state) => {
            state.createLivroFormStatus = ApiStatus.ideal;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getLivroListAction.pending, (state) => {
            state.listStatus = ApiStatus.loading;
        });
        builder.addCase(getLivroListAction.fulfilled, (state, action) => {
            state.listStatus = ApiStatus.ideal;
            state.list = action.payload;
        });
        builder.addCase(getLivroListAction.rejected, (state) => {
            state.listStatus = ApiStatus.error;
        });
        builder.addCase(createLivroAction.pending, (state) => {
            state.createLivroFormStatus = ApiStatus.loading;
        });
        builder.addCase(createLivroAction.fulfilled, (state) => {
            state.createLivroFormStatus = ApiStatus.success;
            toastSucces("Livro Criado com Sucesso");
        });
        builder.addCase(createLivroAction.rejected, (state) => {
            state.createLivroFormStatus = ApiStatus.error;
            toastError("Erro ao Criar Livro");
        });
        builder.addCase(deleteLivroAction.fulfilled, (state, action) => {
            const newList = state.list.filter(x => x.id !== action.payload);
            state.list = newList;
        });
        builder.addCase(updateLivroAction.pending, (state) => {
            state.updateLivroFormStatus = ApiStatus.loading;
        });
        builder.addCase(updateLivroAction.fulfilled, (state) => {
            state.updateLivroFormStatus = ApiStatus.ideal;
            toastSucces("Livro Atualizado com Sucesso");
        });
        builder.addCase(updateLivroAction.rejected, (state) => {
            state.updateLivroFormStatus = ApiStatus.error;
            toastError("Erro ao Atualizar Livro");
        });
    }
});

export default livroSlice.reducer;
export const { resetCreateListStatus } = livroSlice.actions;