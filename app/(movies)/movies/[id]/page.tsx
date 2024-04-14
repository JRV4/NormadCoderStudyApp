import { Suspense } from "react";
import MovieVideos from "@/components/movie-videos";
import MovieInfo, { getMovie } from "@/components/movie-info";
/*
export const metadata = {
    title: 'Movie Detail',
};
*/
interface IParams{
    params : {id : string};
};
/*
export function generateMetadata({params:{id,}}:IParams) {
    const movie = await getMovie(id);
    return {title : movie.title};
};
*/

export default function MovieDetail({params:{id,}}:IParams){
    return(
        <div>
            <Suspense fallback={<h1>Loading Movie Info</h1>}>
                <MovieInfo id={id} />
            </Suspense>
            <Suspense fallback={<h1>Loading Movie Videos</h1>}>
                <MovieVideos id={id}/ >
            </Suspense>
        </div>
    );
}