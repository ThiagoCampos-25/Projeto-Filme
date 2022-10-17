import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './Pages/Home';
import Fime from './Pages/Filme';
import Favoritos from "./Pages/Favoritos";

import Erro from './Pages/Erro';

import Header from "./components/Header";


function RoutesApp(){
    return(
    <BrowserRouter>
    <Header/>
    <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/filme/:id" element={ <Fime/>} />
        <Route path="/favoritos" element={<Favoritos/>}/>


        <Route path="*" element={<Erro/>} />
    </Routes>
    </BrowserRouter>

    );
}

export default RoutesApp;