"use client";
import { useState } from "react";
import { CgArrowsExpandLeft, CgMaximize } from "react-icons/cg";


export default function WindowBase(){
    const [{ x, y }, setPosition] = useState({
        x: 0,
        y: 0,
    });
    
    return(
        <div className="px-0.5 py-0.5 border-solid border-2 border-gray-800 h-96 w-96 shadow-2xl opacity-85 space-y-1 bg-gray-300"
        style={{ transform: `translateX(${x}px) translateY(${y}px)` }}
        >
            <div className="px-2 py-2 border-solid border border-gray-800 cursor-pointer text-xs md:flex md:flex-row flex justify-between items-center"
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
            <div className="px-2 py-2 border-solid border border-gray-800 h-[calc(84%-0px)]">window body</div>
            <div className="flex justify-between items-center">
                <div> </div>
                <CgArrowsExpandLeft size="18px" color="#333" className="cursor-nwse-resize" />
            </div>
        </div>
    );
   
}