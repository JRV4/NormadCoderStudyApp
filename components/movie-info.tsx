import { API_URL } from "@/app/constants";
import styles from "@/styles/movie-info.module.css";
import { unstable_noStore } from "next/cache";

export async function getMovie(id:string){
    unstable_noStore();
    //console.log(`Fetching Movie ${Date.now()}`);
    //await new Promise(resolve => setTimeout(resolve, 5000));
    const response = await fetch(`${API_URL}/${id}`);
    //const movie = await response.json();
    return  response.json();
}

export default async function MovieInfo({id}:{id:string}){
    const movie = await getMovie(id);
    console.log('Movie Info Component Call');
    return (
        <div className={styles.container}>
            <img src={movie.poster_path} className={styles.poster} alt={movie.title} />
            <div className={styles.info}>
                <h1 className={styles.title}>{movie.title}</h1>
                <h3>⭐️{movie.vote_average.toFixed(1)}</h3>
                <p>{movie.overview}</p>
                <a href={movie.homepage} target="_blank">Home Page &rarr;</a>
            </div>
        </div>
    );
}