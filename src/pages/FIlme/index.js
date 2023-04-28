import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../services/api';
import './filme-info.css';
import { toast } from 'react-toastify'

function Filme(){
    const { id  } = useParams();
    const navigate = useNavigate();

    const [filme, setFilme] = useState ({});
    const [loading, setLoading] = useState(true);

    useEffect (()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key:"f9360ebd931e471cce69056dbf211db7",
                    language:"pt-BR"
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("FILME NÃO ENCONTRADO")
                navigate("/", { replace: true })
                return;
            })
        }

        loadFilme();


        return () =>
            console.log("COMPONENTE FOI DESMONTADO")
    },
     [navigate, id])
    
    function salvarFilme () {
        const minhaLista = localStorage.getItem("@totalFlix");

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some( (filmesSalvo) => filmesSalvo.id === filme.id )

        if (hasFilme){
            toast.warn("Esse filme ja está na sua litsta")
            return;
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@totalFlix", JSON.stringify(filmesSalvos));
        toast.success("Filme salvo com sucesso")
    }

    if (loading){
        return(
            <div className="filme-info">
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }


    return(
        <div className="filme-info">
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`}  alt={filme.title} />

            <h3>Sinopse</h3>
            <span>{filme.overview}</span>

            <div className="infocontainer">

                <div className="avaliacao">
                    <strong>Avaliação: {filme.vote_average} /10.0 </strong>
                </div>

                <div className="duracao">
                    <strong>Duração: {filme.runtime} Minutos</strong>
                </div>

                <div className="lancamento">
                    <strong>Data de Lançamento: {filme.release_date}</strong>
                </div>
            </div>

            <div className="area-buttons">
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a target="blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} trailer pt-br`}>Trailer</a>
                </button>

            </div>

            
        </div>
    )
}

export default Filme;