import { useState, useEffect, Suspense } from "react";
import { API_URL } from "@/app/constants";
import  WindowBase from "./window-base";
import {TabProvider, TabList, Tab, TabPanel} from "./tab/tab-provider"

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
            <TabProvider>
                <TabList>
                    <Tab label="Memo - 1"></Tab>
                    <Tab label="Memo - 2"></Tab>
                    <Tab label="Memo - 3"></Tab>
                </TabList>
                <TabPanel>
                    <div className="flex w-full h-full items-center justify-center">Memo - 1</div>
                </TabPanel>
            </TabProvider>
            }
            { /*</Suspense> */}
        </WindowBase>
    );
}