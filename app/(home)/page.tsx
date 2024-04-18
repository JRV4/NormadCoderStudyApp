"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import "@/styles/global.css";
import App01 from "@/components/app01";

import { API_URL } from "../constants";
/*
export const metadata : Metadata = {
    title : "Home",
    description : 'Description for Home',
};
*/
export default function Page(){
    const [windows, setWindows] = useState<any[]>([]);

    function CloseWindow(window:any){
        
        setWindows(oldValues => {
            
            return oldValues.filter(win => win.id !== window.id)
        });
        alert(window.id)
       //alert(window);
    }

    function NewWindow(key:string){
        return(<App01 key={key} id={key} closeFunc={CloseWindow}  />); 
    }

    function AddWindow(){
        setWindows([...windows, NewWindow(Date.now().toString())]);
    }

    // onload
    useEffect(() => {
        //const _movies = getMovies();
        //setWindows([...windows, NewWindow(Date.now().toString())]);
    }, []);
    
    useEffect(() => {
        
    }, [windows]);
    
   
    return (
        <div className="h-[calc(100vh-3rem-2.5rem)] w-full text-gray-500 bg-gray-200 flex flex-col">
            <div className="w-full h-[calc(100vh-3rem-4.5rem)]">
                {windows}
            </div>
            <div className="flex h-10 justify-center justify-items-center space-x-4">
                <div><button onClick={() => {AddWindow();}}>Multi V</button></div>
                <div><button onClick={() => {AddWindow();}}>Multi</button></div>
                <div><button onClick={() => {AddWindow();}}>Single</button></div>
                <div><button onClick={() => {AddWindow();}}>ISC</button></div>
            </div>
        </div>
    );
}