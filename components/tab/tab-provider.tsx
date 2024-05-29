"use client";
import { useState, useEffect, useRef, Children } from "react";

export function TabProvider(props:any){
    return(
        <div className="w-full h-full font-mono">
            {props.children}
        </div>
    );
}

export function TabList(props:any){
    return(
        <div className="w-full flex justify-between items-center">
            {props.children}
        </div>
    );
}


export function Tab(props:any){
    return(
        <div className="w-full flex items-center justify-center font-mono">
            {props.label}
        </div>
    );
}

export function TabPanel(props:any){
    return(
        <div className="w-full h-full flex items-center justify-center">
            {props.children}
        </div>
    );
}