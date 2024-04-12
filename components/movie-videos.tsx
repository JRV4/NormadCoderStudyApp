import exp from "constants";
import {API_URL} from "../app/(home)/page";

async function getVideos(id:string) {
    console.log(`Fetching Video ${Date.now()}`);
    await new Promise(resolve => setTimeout(resolve, 5500));
    const response = await fetch(`${API_URL}/${id}/videos`);
    const video = await response.json(); 
    return video; //response.json();
    //throw new Error("Somthing Broke!");
}

export default async function MovieVideos({id}:{id:string}){
    const videos = await getVideos(id);
    return (
        <h6>{JSON.stringify(videos)}</h6>
    );
}