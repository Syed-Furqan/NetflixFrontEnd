import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "./axios";
import movieTrailer from "movie-trailer"
import "./Row.css";

const Row = ({title, fetchUrl, isLargeRow}) => {

    const baseUrl = "https://image.tmdb.org/t/p/original"

    const [movies, setMovies] = useState([]);

    const [trailerUrl, settrailer] = useState(null);

    useEffect(() => {

        axios.get(fetchUrl)
        .then(response => {
            setMovies(response.data.results);
        }).catch(err => {
            console.log(`Something went wrong ${err}`);
        });

    }, [fetchUrl]);

    const options = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1
        }
    };

    return (
        <div className="row">
            <h3>{ title }</h3>
            <div className="row__posters">
                {movies.map(movie => (
                    <img onClick={() => {
                        if(trailerUrl){
                            settrailer(null);
                        } else {
                            movieTrailer(movie?.name || movie?.title || movie?.original_title || "" )
                                .then(url => {
                                    const urlParams = new URLSearchParams(new URL(url).search);
                                    settrailer(urlParams.get('v'));
                                })
                                .catch(err => console.log(err));
                        }
                    }}
                        key={movie.id} 
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={options}/>}
        </div>
    );

}

export default Row;