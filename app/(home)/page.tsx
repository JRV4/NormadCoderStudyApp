import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@/styles/global.css";
import Movie from "@/components/movie";
import WindowBase from "@/components/window-base";

import { API_URL } from "../constants";

export const metadata : Metadata = {
    title : "Home",
    description : 'Description for Home',
};


async function getMovies() {
    //await new Promise(resolve => setTimeout(resolve, 2000)); 
    console.log("i am fetching!!!");
    const response = await fetch(API_URL);
    const movies = await response.json(); 
    return movies;
    //return fetch(URL).then(response => response.json());
}

export default async function Page(){
    return (
        <div className="h-[calc(100vh-3rem-2.5rem)] w-full text-gray-500 bg-gray-200 flex">
            <WindowBase />
        </div>
    );
}