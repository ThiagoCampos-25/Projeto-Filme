import axios from "axios";

/// BASE DA URL = https://api.themoviedb.org/3
/// URL DA API = https://api.themoviedb.org/3/movie/now_playing?api_key=5e438e4c87674719316a9bec8b35a219&language=pt-BR



const api = axios.create({
    baseURL:'https://api.themoviedb.org/3'
});

export default api;