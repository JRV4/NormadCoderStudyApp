"use client";
import { useState, useEffect, useRef } from "react";
import { CgArrowsExpandLeft, CgMaximize, CgMinimize, CgClose } from "react-icons/cg";
import { LuGrip } from "react-icons/lu";
import { Rnd } from "react-rnd";



export default function WindowBase(props:any){
    const winref = useRef(null);

    // onload
    useEffect(() => {
        
    }, []);
    
    return(
        <Rnd
            ref={winref} 
            className="border-2 border-gray-800 bg-gray-700/50"
            default={{x: 0, y: 0, width: 400, height: 400,}} minHeight={200} minWidth={200}
        >
            <div 
                 className="flex justify-between px-0.5 py-0 h-6 bg-gray-900 text-gray-100 border-solid border border-gray-800 cursor-pointer text-xs items-center"
            >
                <div className="w-full">window title</div>
                <div className="px-1" onMouseDown={(e) => {e.stopPropagation();}} onMouseMove={(e) => {e.stopPropagation();}}>
                    <CgMinimize className="text-gray-500 hover:text-gray-100 hover:animate-spin" size="18px"/>
                </div>
                <div className="px-1" onMouseDown={(e) => {e.stopPropagation();}} onMouseMove={(e) => {e.stopPropagation();}}>
                    <CgMaximize className="text-gray-500 hover:text-gray-100 hover:animate-spin" size="18px"/>
                </div>
                <div className="px-1" 
                    onMouseDown={(e) => {e.stopPropagation();}} 
                    onMouseMove={(e) => {
                        e.stopPropagation();
                    }}
                    onClick={(e)=>{props.closeFunc(winref.current)}}
                >
                    
                    <CgClose className="text-gray-500 hover:text-gray-100 hover:animate-spin" size="18px"/>
                </div>
            </div>
            <div onMouseDown={(e) => {e.stopPropagation();}} onMouseMove={(e) => {e.stopPropagation();}} 
                className="max-h-[-webkit-fill-available] overflow-y-scroll px-2 py-2 border-solid border border-gray-800 opacity-50 h-[calc(100%-theme(spacing.6))] cursor-default"
            >
                <div className="">
                    {props.children}
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