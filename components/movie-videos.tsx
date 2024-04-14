import exp from "constants";
import { API_URL } from "@/app/constants";
import styles from "@/styles/movie-videos.module.css";

async function getVideos(id:string) {
    console.log(`Fetching Video ${Date.now()}`);
    await new Promise(resolve => setTimeout(resolve, 4000));
    const response = await fetch(`${API_URL}/${id}/videos`);
    const video = await response.json(); 
    return video; //response.json();
    //throw new Error("Somthing Broke!");
}

export default async function MovieVideos({id}:{id:string}){
    const videos = await getVideos(id);
    return <div className={styles.container}>
        {videos.map((video:any) => (
            <iframe
                key={video.id} 
                src={`https://youtube.com/embed/${video.key}`}
                allowFullScreen
                title={video.name}
            />
        ))}
    </div>;
}