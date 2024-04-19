import { useState, useEffect, Suspense } from "react";
import { API_URL } from "@/app/constants";
import  WindowBase from "./window-base";

export default function App01(props:any){
    const [movies, setMovies] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    // onload
    useEffect(() => {
        const _movies = getMovies();
    }, []);
    
    async function getMovies() {
        //await new Promise(resolve => setTimeout(resolve, 500)); 
        setIsLoading(true);
        const response = await fetch(API_URL);
        const movies = await response.json(); 
        setMovies(movies);
        setIsLoading(false);
        return movies;
        //return fetch(URL).then(response => response.json());
    }

    return (
        <WindowBase closeFunc={props.closeFunc} id={props.id}>
            {/*<Suspense fallback={<div>*** Loading ***</div>}>*/}
            {isLoading ? <div className="flex w-full h-full items-center justify-center">Loading...</div> :
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
}
            { /*</Suspense> */}
        </WindowBase>
    );
}