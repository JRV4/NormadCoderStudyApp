import { useState, useEffect, Suspense } from "react";
import { API_URL } from "@/app/constants";
import  WindowBase from "./window-base";

export default function App01(props:any){
    const [movies, setMovies] = useState<any[]>([]);

    // onload
    useEffect(() => {
        console.log(`props.key=${props.idx}`);
        const _movies = getMovies();
    }, []);
    
    async function getMovies() {
        //await new Promise(resolve => setTimeout(resolve, 2000)); 
        const response = await fetch(API_URL);
        const movies = await response.json(); 
        setMovies(movies);
        return movies;
        //return fetch(URL).then(response => response.json());
    }

    return (
        <WindowBase closeFunc={props.closeFunc} id={props.id}>
            <Suspense>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Vote</th>
                    </tr>
                </thead>
                <tbody>
                    {movies == null ? "" : movies.map((movie : any) => (
                    <tr key={movie.id}>
                        <td>{movie.id}</td>
                        <td>{movie.title}</td>
                        <td>⭐️{movie.vote_average.toFixed(1)}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            </Suspense>
        </WindowBase>
    );
}