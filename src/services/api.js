import axios from 'axios';

// base da url: https://api.themoviedb.org/3/
//https://api.themoviedb.org/3/movie/now_playing?api_key=f9360ebd931e471cce69056dbf211db7&language=pt-br


const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api;