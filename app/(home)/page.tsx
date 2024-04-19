"use client";

import { Metadata } from "next";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import "@/styles/global.css";
import App01 from "@/components/app01";
import { FcStart, FcAutomatic, FcStackOfPhotos, FcFolder, FcAlarmClock, FcCalendar, FcCalculator } from "react-icons/fc";
import { API_URL } from "../constants";
import BACK_IMG from "../asset/images/macos-wallpaper-by-mohammad.webp";
/*
export const metadata : Metadata = {
    title : "Home",
    description : 'Description for Home',
};
*/
const maxAdditionalSize = 5;

const scaleValue = (
    value: number,
    from: [number, number],
    to: [number, number]
  ) => {
    const scale = (to[1] - to[0]) / (from[1] - from[0]);
    const capped = Math.min(from[1], Math.max(from[0], value)) - from[0];
    return Math.floor(capped * scale + to[0]);
  };

export default function Page(){

    const [windows, setWindows] = useState<any[]>([]);

    const dockRef = useRef<HTMLDivElement>(null);

    const handleAppHover = (ev: React.MouseEvent<HTMLDivElement>) => {
        if (!dockRef.current) return;

        alert("aaaa");
        
        const mousePosition = ev.clientX;
        const iconPositionLeft = ev.currentTarget.getBoundingClientRect().left;
        const iconWidth = ev.currentTarget.getBoundingClientRect().width;

        const cursorDistance = (mousePosition - iconPositionLeft) / iconWidth;
        const offsetPixels = scaleValue(
        cursorDistance,
        [0, 1],
        [maxAdditionalSize * -1, maxAdditionalSize]
        );

        dockRef.current.style.setProperty(
        "--dock-offset-left",
        `${offsetPixels * -1}px`
        );

        dockRef.current.style.setProperty(
        "--dock-offset-right",
        `${offsetPixels}px`
        );
    };

    function CloseWindow(id:string){
        setWindows(oldValues => {
            return oldValues.filter(win => win.props.id !== id);
        });
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
        <div ref={dockRef} className="h-[calc(100dvh-3rem)] w-full text-gray-500 flex flex-col bg_img">
            <div className="w-full h-[calc(100vh-3rem-4.5rem)]">
                {windows}
            </div>
            <div className="flex pb-2 w-full justify-center justify-items-center">
                <div className="flex min-w-max w-20 px-6 py-2 h-16 justify-center justify-items-center space-x-4 bg-gray-100/20 border border-gray-100 rounded-2xl">
                    {/* 
                    <div><button onClick={() => {AddWindow();}}>Multi V</button></div>
                    <div><button onClick={() => {AddWindow();}}>Multi</button></div>
                    <div><button onClick={() => {AddWindow();}}>Single</button></div>
                    <div><button onClick={() => {AddWindow();}}>ISC</button></div>
                    */}
                    <div className="cursor-pointer" onClick={() => {AddWindow();}}><FcStart className="size-12 hover:scale-150 duration-500 hover:-translate-y-4 duration-500"  /></div>
                    <div className="cursor-pointer" ><FcAutomatic className="size-12 hover:scale-150 duration-500 hover:-translate-y-4 duration-500"  /></div>
                    <div className="cursor-pointer" ><FcStackOfPhotos className="size-12 hover:scale-150 duration-500 hover:-translate-y-4 duration-500"  /></div>
                    <div className="cursor-pointer" ><FcFolder className="size-12 hover:scale-150 duration-500 hover:-translate-y-4 duration-500"  /></div>
                    <div className="cursor-pointer" ><FcAlarmClock className="size-12 hover:scale-150 duration-500 hover:-translate-y-4 duration-500"  /></div>
                    <div className="cursor-pointer" ><FcCalendar className="size-12 hover:scale-150 duration-500 hover:-translate-y-4 duration-500"  /></div>
                    <div className="cursor-pointer" ><FcCalculator  className="size-12 hover:scale-150 duration-500 hover:-translate-y-4 duration-500"  /></div>
                </div>
            </div>
        </div>
    );
}