import {API_URL} from "../app/(home)/page";

async function getMovie(id:string){
    console.log(`Fetching Movie ${Date.now()}`);
    await new Promise(resolve => setTimeout(resolve, 2000));
    const response = await fetch(`${API_URL}/${id}`);
    //const movie = await response.json();
    return  response.json();
}

export default async function MovieInfo({id}:{id:string}){
    const movie = await getMovie(id);
    console.log('Movie Info Component Call');
    return (
        <h6>{JSON.stringify(movie)}</h6>
    );
}