import { Suspense } from "react";
import MovieVideos from "@/components/movie-videos";
import MovieInfo from "@/components/movie-info";

export const metadata = {
    title: 'Movie Detail',
};


export default async function MovieDetail({params:{id,}
}:{
    params:{id:string}
}){
    return(
        <div>
            <h3>==================================</h3>
            <h3>Movie Detail Page</h3>
            <Suspense fallback={<h1>Loading Movie Info</h1>}>
                <MovieInfo id={id} />
            </Suspense>
            <Suspense fallback={<h1>Loading Movie Videos</h1>}>
                <MovieVideos id={id}/ >
            </Suspense>
        </div>
    );
}