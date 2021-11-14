import axios from "./axios";
import { useEffect, useState } from "react";
import requests from "./requests"
import "./Banner.css"

const Banner = () => {
    const [movie, setMovie] = useState({});

    useEffect(() => {
        axios.get(requests.fetchNetflixOriginals)
        .then(response => {
            const rand = Math.random() * (response.data.results.length-1); //Random number between 0 - 19.
            setMovie(response.data.results[Math.floor(rand)]);
        }).catch(err => console.log(err));
    }, []);

    console.log(movie);
    const URL = "https://image.tmdb.org/t/p/original"+movie?.backdrop_path;

    return(
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: `url(${URL})`,
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">{movie?.name || movie?.title || movie?.original_title}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">{movie?.overview}</h1>
            </div>
        </header>
    )
}

export default Banner;