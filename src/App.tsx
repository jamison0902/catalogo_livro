import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './module/Layout';
import LivroForm from './module/Livro/LivroForm';
import LivroList from './module/Livro/LivroList';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LivroList />}></Route>
          <Route path='/add' element={<LivroForm />}></Route>
          <Route path='/edit/:id' element={<LivroForm isEditForm={true}  />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
