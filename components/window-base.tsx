"use client";
import { useState } from "react";
import { CgArrowsExpandLeft, CgMaximize } from "react-icons/cg";
import { LuGrip } from "react-icons/lu";
import { Rnd } from "react-rnd";
import { API_URL } from "@/app/constants";
import Movie from "@/components/movie";

export default async function WindowBase(){
    /*
    const [{ x, y }, setPosition] = useState({
        x: 0,
        y: 0,
    });
    */
    async function getMovies() {
        //await new Promise(resolve => setTimeout(resolve, 2000)); 
        console.log("i am fetching!!!");
        const response = await fetch(API_URL);
        const movies = await response.json(); 
        return movies;
        //return fetch(URL).then(response => response.json());
    }

    //const movies = await getMovies();

    return(
        <Rnd className="border-2 border-gray-800 bg-gray-700"
            default={{
                x: 0,
                y: 0,
                width: 400,
                height: 400,
                
            }}
            minHeight={200}
            minWidth={200}
        >
            <div 
                 className=" px-2 py-2 h-6 bg-gray-900 text-gray-100 border-solid border border-gray-800 cursor-pointer text-xs md:flex md:flex-row flex justify-between items-center"
            >
                <div>window title</div>
            </div>
            <div
                onMouseDown={(e) => {e.stopPropagation();}} 
                onMouseMove={(e) => {e.stopPropagation();}}
                onResize={(e) => {console.log('aaaa');}}
                className="max-h-[-webkit-fill-available] overflow-y-scroll px-2 py-2 border-solid border border-gray-800 h-[calc(100%-theme(spacing.6))] cursor-default"
            >
                <div className="">
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                    <div>aaaaa</div>
                </div>
            </div>
 
        </Rnd>
        
    );
    /*
    return(
        <div className="px-0.25 py-0.25 border-solid border-2 border-gray-800 h-96 w-96 shadow-2xl opacity-85 space-y-0 bg-gray-300"
        style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
        >
            <div className="px-2 py-2 h-6 bg-gray-900 text-gray-100 border-solid border border-gray-800 cursor-pointer text-xs md:flex md:flex-row flex justify-between items-center"
                onMouseDown={(clickEvent: React.MouseEvent<Element, MouseEvent>) => {
                    const mouseMoveHandler = (moveEvent: MouseEvent) => {
                      // 2️⃣
                      const deltaX = moveEvent.screenX - clickEvent.screenX;
                      const deltaY = moveEvent.screenY - clickEvent.screenY;
        
                      // 3️⃣
                      setPosition({
                          x: x + deltaX,
                          y: y + deltaY,
                      });
                    };
        
                    const mouseUpHandler = () => {
                      document.removeEventListener('mousemove', mouseMoveHandler);
                    };
                    
                    document.addEventListener('mousemove', mouseMoveHandler);
                    document.addEventListener('mouseup', mouseUpHandler, { once: true });
                  }}
            >window title bar
            <CgMaximize size="18px" color="#fff" />
            </div>
            <div className="px-2 py-2 border-solid border border-gray-800 h-[calc(90.5%-0px)]">window body</div>
            <div className="flex justify-between items-center">
                <div> </div>
                <LuGrip size="12px" color="#333" className="cursor-nwse-resize" />
            </div>
        </div>
    );
    */
   
}