import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@/styles/global.css" 

export const metadata : Metadata = {
    title : "Home",
    description : 'Description for Home',
};


export const API_URL = "https://nomad-movies.nomadcoders.workers.dev/movies";

async function getMovies() {
    await new Promise(resolve => setTimeout(resolve, 2000)); 
    console.log("i am fetching!!!");
    const response = await fetch(API_URL);
    const movies = await response.json(); 
    return movies;
    //return fetch(URL).then(response => response.json());
}

export default async function Page(){
    const movies = await getMovies();

    return (
        <div>
            {movies.map((movie : any) => (
                <li key={movie.id}>
                    <Link href={`/movies/${movie.id}`}>{movie.title}</Link>
                </li>
            ))}
        </div>
    );
}