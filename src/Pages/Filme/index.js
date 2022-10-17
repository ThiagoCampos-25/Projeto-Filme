import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSignInAlt } from "react-icons/fa"; 
import { FaExternalLinkAlt } from "react-icons/fa"; 
import './filme-info.css';

import api from '../../services/api';
import { toast } from 'react-toastify'

function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
    async function loadingFilme(){
        await api.get(`/movie/${id}`, {
            params:{
                api_key: "5e438e4c87674719316a9bec8b35a219",
                language: "pt-BR",
            }
        })
        .then((response) =>{
            setFilme(response.data);
            setLoading(false);
        })
        .catch(()=>{
            navigate("/", {replace: true});
            return;

        })
    }

        loadingFilme();

        return(() =>{
            console.log("Componente desmontado");
        })

    }, [navigate, id])

    function salvarFilme(){
        const minhaLista = localStorage.getItem("@filmes");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Esse filme já esta na sua lista!")
            return;
        }
        
        filmesSalvos.push(filme);
        localStorage.setItem("@filmes", JSON.stringify(filmesSalvos))
        toast.success("Filme salvo com sucesso!")
    }


    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        );
    }

    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>            
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttom'>
                <button onClick={salvarFilme}> <FaSignInAlt size={15} /> Salvar</button>
                <button className='button-a'>
                    <a target="blank" rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>
                       <FaExternalLinkAlt size={15}/> Trailer
                    </a>
                </button>
            </div>
        </div>
    );
}

export default Filme;