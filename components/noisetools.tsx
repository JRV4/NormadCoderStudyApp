"use client";
import { useState, useEffect, MouseEventHandler, useRef } from "react";
import { API_URL } from "@/app/constants";
import  WindowBase from "./window-base";
import styles from "@/styles/noisetools.module.css";

export default function Noisetools(props:any){
    const [isLoading, setIsLoading] = useState(true);
    const [fieldData, setFieldDataData] = useState(
        { width: 1100, height: 500, },
    );
    const [soundWaves, setSoundWaves] = useState<any[]>([]);
    //const [spaceLen, setSpaceLen] = useState(25);
    const [rulerAreaHight, setRulerAreaHight] = useState(55);

    let sourceDataRef = useRef({ fromLeft: 150, height: 5});
    const [sourceData, setSourceData] = useState(
        { fromLeft: 150, height: 5},
    );
    
    let receiverDataRef = useRef({ distFromSource: 25, height: 2, fromRight: 150});
    const [receiverData, setReceiverData] = useState(
        { distFromSource: 25, height: 2, fromRight: 150},
    );

    let barrier1DataRef = useRef({ distFromSource: 10, height: 5});
    const [barrier1Data, setBarrier1Data] = useState(
        { distFromSource: 10, height: 5},
    );

    let barrier2DataRef = useRef({ distFromSource: 10, height: 5});
    const [barrier2Data, setBarrier2Data] = useState(
        { distFromSource: 15, height: 5},
    );

    const [pxPerMeter, setPxPerMeter] = useState(
        (fieldData.width - sourceData.fromLeft - receiverData.fromRight) / receiverData.distFromSource
    );

    const [fieldRect, setFieldRect] = useState(
        `0 0 ${fieldData.width} ${fieldData.height}`,
    );

    const [sourceMatrix, setSourceMatrix] = useState(
        `matrix(1 0 0 1 ${sourceData.fromLeft} ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter)})`,
    );

    const [rulerAreaMatrix, setRulerAreaMatrix] = useState(
        `matrix(1 0 0 1 0 ${fieldData.height - rulerAreaHight})`,
    );

    const [sourceArrowPts, setSourceArrowPts] = useState(
        `${sourceData.fromLeft}, 5, ${sourceData.fromLeft + 5}, 0, ${sourceData.fromLeft + 5}, 10`,
    );

    const [receiverArrowPts, setrReceiverArrowPts] = useState(
        `${fieldData.width - receiverData.fromRight - 5}, 0, ${fieldData.width - receiverData.fromRight - 5}, 10, ${fieldData.width - receiverData.fromRight - 5 + 5}, 5`,
    );

    const [sourceHUpArrowPts, setSourceHUpArrowPts] = useState(
        `${sourceData.fromLeft - (pxPerMeter/2)}, ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter)}, 
        ${sourceData.fromLeft - (pxPerMeter/2) - 5}, ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter) + 5}, 
        ${sourceData.fromLeft - (pxPerMeter/2) + 5}, ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter) + 5} 
        `,
    );

    const [sourceDUpArrowPts, setSourceDUpArrowPts] = useState(
        `${sourceData.fromLeft - (pxPerMeter/2)}, ${fieldData.height - rulerAreaHight}, 
        ${sourceData.fromLeft - (pxPerMeter/2) - 5}, ${fieldData.height - rulerAreaHight - 5}, 
        ${sourceData.fromLeft - (pxPerMeter/2) + 5}, ${fieldData.height - rulerAreaHight - 5} 
        `,
    );

    const [receiverHUpArrowPts, setReceiverHUpArrowPts] = useState(
        `${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter)}, 
        ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 5}, 
        ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 5} 
        `,
    );

    const [receiverHDnArrowPts, seReceiverHDnArrowPts] = useState(
        `${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) }, ${fieldData.height - rulerAreaHight}, 
        ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - 5}, 
        ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - 5} 
        `,
    );

    const [receiverPickerArrowPts, setReceiverPickerArrowPts] = useState(
        `${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter)}, 
        ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) - 7}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 7}, 
        ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) + 7}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 7}`,
    );
    
    // Barrier1 Arrow & Picker
    const [barrier1HUpArrowPts, setBarrier1HUpArrowPts] = useState(
        `${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter)}, 
        ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 5}, 
        ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 5} 
        `,
    );

    const [barrier1HDnArrowPts, setBarrier1HDnArrowPts] = useState(
        `${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) }, ${fieldData.height - rulerAreaHight}, 
        ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - 5}, 
        ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - 5} 
        `,
    );

    const [barrier1PickerArrowPts, setBarrier1PickerArrowPts] = useState(
        `${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter)}, 
        ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) - 7}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 7}, 
        ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 7}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 7} 
        `,
    );

    const [barrier1EffectAreaPts, setBarrier1EffectAreaPts] = useState(
        `${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter)},
        ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 200}, ${fieldData.height - rulerAreaHight - 2},
        ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 200}, ${fieldData.height - rulerAreaHight - 2},
        ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - 2}`,
    );

    // Barrier2 Arrow & Picker
    const [barrier2HUpArrowPts, setBarrier2HUpArrowPts] = useState(
        `${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter)}, 
        ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 5}, 
        ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 5} 
        `,
    );

    const [barrier2HDnArrowPts, setBarrier2HDnArrowPts] = useState(
        `${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) }, ${fieldData.height - rulerAreaHight}, 
        ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - 5}, 
        ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - 5} 
        `,
    );

    const [barrier2PickerArrowPts, setBarrier2PickerArrowPts] = useState(
        `${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter)}, 
        ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) - 7}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 7}, 
        ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 7}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 7} 
        `,
    );

    const [barrier2EffectAreaPts, setBarrier2EffectAreaPts] = useState(
        `${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter)}, 
        ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 200}, ${fieldData.height - rulerAreaHight - 2},
        ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 200}, ${fieldData.height - rulerAreaHight - 2},
        ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - 2}`,
    );


    const PICKERS = {
        None: 0,
        Source: 1,
        Receiver: 2,
        Barrier1: 3,
        Barrier2: 4,
    } as const;
    type PICKERS = typeof PICKERS[keyof typeof PICKERS]; // 'iOS' | 'Android'

    let captured = useRef(PICKERS.None);

    const [ba1Transform, setBa1Transform] = useState(
        `translate(${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter)}) rotate(270)`
    );

    const [ba2Transform, setBa2Transform] = useState(
        `translate(${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter)}) rotate(270)`
    );

    const [recvTransform, setRecvTransform] = useState(
        `translate(${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 7}) rotate(270)`
    );
    
    
    let wavesDist = [];
    let field
    let width_dist_lables:Number[] = [];

    function drawSoundWaves(){
        let newSoundWaves = [];
        let innter = fieldData.width / pxPerMeter;
        for(let i = 0; i < Math.ceil(fieldData.width / pxPerMeter); i++){
            newSoundWaves.push(
                <g key={"swave" + (i+1).toString()}>
                <circle key={"swave_circle" + (i+1).toString()} id={"swave_circle" + (i+1).toString()} cx="0" cy="0" r={(i + 1) * pxPerMeter} fill="none" stroke={(i+1) % 10 === 0 ? "#666666": "#CCCCCC"} strokeWidth="1" />
                <rect key={"swave_dist_box_up" + (i+1).toString()} id={"swave_dist_box" + (i+1).toString()} 
                    x={width_dist_lables[ Math.floor((i + 1) / 10)] * -0.5} 
                    y={0 + (i + 1) * pxPerMeter - 8} 
                    width={width_dist_lables[ Math.floor((i + 1) / 10)]} 
                    height={16} fill="#FFFFFF"> </rect>
                <text className={styles.swave_dist_text} key={"swave_dist_up" + (i+1).toString()} id={"swave_dist" + (i+1).toString()} x="0" y={5 + (i + 1) * pxPerMeter}  textAnchor="middle" alignmentBaseline="middle">
                    <tspan>{(i + 1).toString() + "m"}</tspan>
                </text>
                <rect key={"swave_dist_box_dn" + (i+1).toString()} id={"swave_dist_box" + (i+1).toString()} 
                    x={width_dist_lables[ Math.floor((i + 1) / 10)] * -0.5} 
                    y={0 + -1 * (i + 1) * pxPerMeter - 8} 
                    width={width_dist_lables[ Math.floor((i + 1) / 10)]} 
                    height={16} fill="#FFFFFF"> </rect>
                <text className={styles.swave_dist_text} key={"swave_dist_dn" + (i+1).toString()} id={"swave_dist" + (i+1).toString()} x="0" y={((i + 1) * pxPerMeter - 4) * -1}  textAnchor="middle" alignmentBaseline="middle">
                    <tspan>{(i + 1).toString() + "m"}</tspan>
                </text>
                </g>
            );
        }
        setSoundWaves(newSoundWaves);
    }

    // onload
    useEffect(() => {
        //const _movies = getMovies();
        let m1digit = document.getElementById("m1digit");
        let m2digit = document.getElementById("m2digit");
        let m3digit = document.getElementById("m3digit");

        width_dist_lables.push(m1digit.getBBox()['width'] * 1.4);
        width_dist_lables.push(m2digit.getBBox()['width'] * 1.4);
        width_dist_lables.push(m3digit.getBBox()['width'] * 1.4);

        drawSoundWaves();
        
        window.addEventListener("mouseup", windowMouseUp);
        window.addEventListener("mousemove", onWindowMouseMove);
        
        document.nt_capture = 0;

        return () => {  //Remove Event Listener When Unmount
            window.removeEventListener("mouseup", windowMouseUp);
            window.removeEventListener("mousemove", onWindowMouseMove);
            console.log("Unmounted");
        };
    }, []);

    useEffect(() => {
        setSourceMatrix(`matrix(1 0 0 1 ${sourceData.fromLeft} ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter)})`,);

        setSourceHUpArrowPts(
            `${sourceData.fromLeft - (pxPerMeter/2)}, ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter)}, 
            ${sourceData.fromLeft - (pxPerMeter/2) - 5}, ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter) + 5}, 
            ${sourceData.fromLeft - (pxPerMeter/2) + 5}, ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter) + 5} 
            `,
        );

        sourceDataRef.current = sourceData;
    }, [sourceData]);

    useEffect(() => {
        setBarrier1HUpArrowPts(
            `${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter)}, 
            ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 5}, 
            ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 5} 
            `,
        );

        setBarrier1HDnArrowPts(
            `${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) }, ${fieldData.height - rulerAreaHight}, 
            ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - 5}, 
            ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - 5} 
            `,
        );

        setBarrier1PickerArrowPts(
            `${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter)}, 
            ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) - 7}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 7}, 
            ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 7}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 7} 
            `,
        );
        
        setBa1Transform(`translate(${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter)}) rotate(270)`);

        setBarrier1EffectAreaPts(
            `${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter)}, 
            ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 300}, ${fieldData.height - rulerAreaHight},
            ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 300}, ${fieldData.height - rulerAreaHight},
            ${sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight}`,
        );
        
        barrier1DataRef.current = barrier1Data;
    }, [barrier1Data]);

    useEffect(() => {
        setBarrier2HUpArrowPts(
            `${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter)}, 
            ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 5}, 
            ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 5} 
            `,
        );

        setBarrier2HDnArrowPts(
            `${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) }, ${fieldData.height - rulerAreaHight}, 
            ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - 5}, 
            ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - 5} 
            `,
        );

        setBarrier2PickerArrowPts(
            `${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter)}, 
            ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) - 7}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 7}, 
            ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 7}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 7} 
            `,
        );

        setBa2Transform(`translate(${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter)}) rotate(270)`);

        setBarrier2EffectAreaPts(
            `${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter)}, 
            ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 300}, ${fieldData.height - rulerAreaHight},
            ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 300}, ${fieldData.height - rulerAreaHight},
            ${sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight}`,
        );

        barrier2DataRef.current = barrier2Data;
    }, [barrier2Data]);

    useEffect(() => {
        setReceiverHUpArrowPts(
            `${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter)}, 
            ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) - 5}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 5}, 
            ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) + 5}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 5} 
            `,
        );

        setReceiverPickerArrowPts(
            `${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter)}, 
            ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) - 7}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 7}, 
            ${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) + 7}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 7} 
            `,
        );

        setRecvTransform(
            `translate(${sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter)}, ${fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 7}) rotate(270)`
        )

        receiverDataRef.current = receiverData;
    }, [receiverData]);

    function setCapturedPicker(v:PICKERS){
        document.nt_capture = v;
        captured.current = v;
    }

    function windowMouseUp(e:MouseEvent)
    { 
        setCapturedPicker(PICKERS.None);
    }
    
    function onSourcePickerMouseDown(e:MouseEventHandler<SVGSVGElement>){
        setCapturedPicker(PICKERS.Source);
    }

    function onReceiverPickerMouseDown(e:MouseEventHandler<SVGSVGElement>){
        setCapturedPicker(PICKERS.Receiver);
    }

    function onBarrier1PickerMouseDown(e:MouseEventHandler<SVGSVGElement>){
        setCapturedPicker(PICKERS.Barrier1);
    }

    function onBarrier1PickerMouseUp(e:MouseEventHandler<SVGSVGElement>){
        setCapturedPicker(PICKERS.None);
    }

    function onBarrier2PickerMouseDown(e:MouseEventHandler<SVGSVGElement>){
        setCapturedPicker(PICKERS.Barrier2);
    }
    
    function onSvgMouseUp(e:MouseEventHandler<SVGSVGElement>){
        setCapturedPicker(PICKERS.None);
    }
    
    function onWindowMouseMove(e:MouseEvent){
        if(captured.current !== PICKERS.None){
            console.log(`onWindowsMouseMove ${captured.current}`);
            onPickerMouseMoveUseRef(e, captured.current);
        }
    }    
    function onSvgMouseMove(e:MouseEvent){
        onPickerMouseMoveUseRef(e, captured.current);
    }

    function onPickerMouseMoveUseRef(e:MouseEvent, cap:number){
        //function onPickerMouseMove(e:MouseEventHandler<SVGSVGElement>){
        let svg = document.querySelector('svg#test-svg');
        if(cap === PICKERS.Source){
            if(svg !== null && e.movementY !== 0){
                let swave = svg.querySelector("#swaves");
                let attr = swave.getAttribute("transform");

                let newH:number = sourceDataRef.current.height -= e.movementY / pxPerMeter;

                //if(newH > 0)
                 //   swave.transform.baseVal[0]['matrix']['f'] += e.movementY;

                newH = newH >= 0 ? newH : 0;

                setSourceData({fromLeft:sourceDataRef.current.fromLeft, height: newH});
            } 
        } else if(cap === PICKERS.Receiver){
            if(svg !== null && e.movementY !== 0){
                let r_picker = svg.querySelector("#r_picker");
                let attr = r_picker.getAttribute("transform");

                let newH:number = receiverDataRef.current.height -= e.movementY / pxPerMeter;
                newH = newH >= 0 ? newH : 0;

                setReceiverData({distFromSource:receiverDataRef.current.distFromSource, fromRight:receiverDataRef.current.fromRight, height: newH});   
            }
        } else if(cap === PICKERS.Barrier1){
            if(svg !== null && (e.movementY !== 0 || e.movementX !== 0)){
                let ba1_picker = svg.querySelector("#ba1_picker");
                let attr = ba1_picker.getAttribute("transform");
                
                let newH:number = barrier1DataRef.current.height - (e.movementY / pxPerMeter);
                let newD:number = barrier1DataRef.current.distFromSource + (e.movementX / pxPerMeter);

                let limitX = ba1_picker.getClientRects()[0]['x'] + ba1_picker.getClientRects()[0]['width'] / 2 ;
                newD = newD >= 0 ? (newD > receiverDataRef.current.distFromSource ? receiverDataRef.current.distFromSource : newD)  : 0;
                if(receiverDataRef.current.distFromSource <= barrier1DataRef.current.distFromSource && limitX < e.pageX) newD = receiverDataRef.current.distFromSource;
                else if(barrier1DataRef.current.distFromSource <= 0 && limitX > e.pageX) newD = 0;
                newH = newH >= 0 ? newH : 0;

                setBarrier1Data({distFromSource:newD, height: newH});
            }
        } else if(cap === PICKERS.Barrier2){
            if(svg !== null && (e.movementY !== 0 || e.movementX !== 0)){
                let ba2_picker = svg.querySelector("#ba2_picker");
                //let attr = ba2_picker.getAttribute("transform");
                
                let newH:number = barrier2DataRef.current.height - (e.movementY / pxPerMeter);
                let newD:number = barrier2DataRef.current.distFromSource + (e.movementX / pxPerMeter);

                let limitX = ba2_picker.getClientRects()[0]['x'] + ba2_picker.getClientRects()[0]['width'] / 2 ;
                newD = newD >= 0 ? (newD > receiverDataRef.current.distFromSource ? receiverDataRef.current.distFromSource : newD)  : 0;
                if(receiverDataRef.current.distFromSource <= barrier2DataRef.current.distFromSource && limitX < e.pageX) newD = receiverDataRef.current.distFromSource;
                else if(barrier2DataRef.current.distFromSource <= 0 && limitX > e.pageX) newD = 0;
                newH = newH >= 0 ? newH : 0;
                //console.log(`pageX = ${e.pageX} , pageY = ${e.pageY} screenX = ${e.screenX} screenY = ${e.screenY} newD = ${newD}`);
                setBarrier2Data({distFromSource:newD, height: newH});   
            }
        }
    }

    function onPickerMouseMove(e:MouseEvent, cap:number){
    //function onPickerMouseMove(e:MouseEventHandler<SVGSVGElement>){
        let svg = document.querySelector('svg#test-svg');
        if(cap === PICKERS.Source){
            if(svg !== null && e.movementY !== 0){
                let swave = svg.querySelector("#swaves");
                let attr = swave.getAttribute("transform");

                //swave.transform.baseVal[0]['matrix']['e'] += e.movementX;
                swave.transform.baseVal[0]['matrix']['f'] += e.movementY;


                let newH:number = sourceData.height -= e.movementY / pxPerMeter;
                setSourceData({fromLeft:sourceData.fromLeft, height: newH});
                setSourceHUpArrowPts(
                    `${sourceData.fromLeft - (pxPerMeter/2)}, ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter)}, 
                    ${sourceData.fromLeft - (pxPerMeter/2) - 5}, ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter) + 5}, 
                    ${sourceData.fromLeft - (pxPerMeter/2) + 5}, ${fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter) + 5} 
                    `,
                );
            } 
        } else if(cap === PICKERS.Receiver){
            if(svg !== null && e.movementY !== 0){
                let r_picker = svg.querySelector("#r_picker");
                let attr = r_picker.getAttribute("transform");

                let newH:number = receiverData.height -= e.movementY / pxPerMeter;
                newH = newH >= 0 ? newH : 0;

                setReceiverData({distFromSource:receiverData.distFromSource, fromRight:receiverData.fromRight, height: newH});   
            }
        } else if(cap === PICKERS.Barrier1){
            if(svg !== null && (e.movementY !== 0 || e.movementX !== 0)){
                let ba1_picker = svg.querySelector("#ba1_picker");
                let attr = ba1_picker.getAttribute("transform");
                
                let newH:number = barrier1Data.height - (e.movementY / pxPerMeter);
                let newD:number = barrier1Data.distFromSource + (e.movementX / pxPerMeter);

                let limitX = ba1_picker.getClientRects()[0]['x'] + ba1_picker.getClientRects()[0]['width'] / 2 ;
                newD = newD >= 0 ? (newD > receiverData.distFromSource ? receiverData.distFromSource : newD)  : 0;
                if(receiverData.distFromSource <= barrier1Data.distFromSource && limitX < e.pageX) newD = receiverData.distFromSource;
                else if(barrier1Data.distFromSource <= 0 && limitX > e.pageX) newD = 0;
                newH = newH >= 0 ? newH : 0;

                setBarrier1Data({distFromSource:newD, height: newH});   

                console.log(`PICKERS.Barrier1 : cap == ${PICKERS.Barrier1 == cap} , ${barrier1Data.distFromSource}, ${pxPerMeter}`);
            }
        } else if(cap === PICKERS.Barrier2){
            if(svg !== null && (e.movementY !== 0 || e.movementX !== 0)){
                let ba2_picker = svg.querySelector("#ba2_picker");
                //let attr = ba2_picker.getAttribute("transform");
                
                let newH:number = barrier2Data.height - (e.movementY / pxPerMeter);
                let newD:number = barrier2Data.distFromSource + (e.movementX / pxPerMeter);

                let limitX = ba2_picker.getClientRects()[0]['x'] + ba2_picker.getClientRects()[0]['width'] / 2 ;
                newD = newD >= 0 ? (newD > receiverData.distFromSource ? receiverData.distFromSource : newD)  : 0;
                if(receiverData.distFromSource <= barrier2Data.distFromSource && limitX < e.pageX) newD = receiverData.distFromSource;
                else if(barrier2Data.distFromSource <= 0 && limitX > e.pageX) newD = 0;
                newH = newH >= 0 ? newH : 0;
                //console.log(`pageX = ${e.pageX} , pageY = ${e.pageY} screenX = ${e.screenX} screenY = ${e.screenY} newD = ${newD}`);
                setBarrier2Data({distFromSource:newD, height: newH});   
            }
        }
        else
            console.log(`captured.current = ${captured.current}`)
    }

    // https://noisetools.net/barriercalculator?source=[5.5]&receiver=[5.4,20]&barrier=[1,2.9,8.8]&walls=[1,1]&display=2
    return (
        <WindowBase closeFunc={props.closeFunc} id={props.id}>
            {/*<Suspense fallback={<div>*** Loading ***</div>}>*/}
            
            <svg version = "1.1"
			xmlns = "http://www.w3.org/2000/svg"
			width="1100" height="500"
			viewBox={fieldRect}
			id = "test-svg"

            className={styles.noise_field}
            onMouseMove={onSvgMouseMove}
            onMouseUp={onSvgMouseUp}>
                <g id="swaves" transform={sourceMatrix} >
                    <g id="swave_picker">
                        {soundWaves}
                        <g className={styles.ruler_line} transform="rotate(-90, 0, 0)" stroke="#000000" fill="#000000" strokeWidth="0" onMouseDown={onSourcePickerMouseDown}>
                            <circle id="swave_picker" cx="0" cy="0" r="7" strokeWidth="0"  />
                            <rect x="15" y="-11" width={60} height={20} rx="5" fill="#AAAAAA"> </rect>
                            <text className={styles.source_text} x="17" y="0" textAnchor="start" alignmentBaseline="middle">SOURCE</text>
                        </g>
                    </g>
                </g>
                <g id="ruler_area">
                    <g transform={rulerAreaMatrix} >
                        <g id="ruler_background">
                            <rect x="-1" width={fieldData.width + 2} height={rulerAreaHight} fill="#CCCCCC"/>
                            <line x1="-1" y1="0" x2={fieldData.width + 2} y2="0" strokeWidth="1" stroke="#000000"></line>
                        </g>
                        <g id="ruler_dist_s_to_r" transform="matrix(1 0 0 1 0 15)" >
                            <polygon id="s_to_r_dist_st" points={sourceArrowPts} fill="#000000" />
                            <line id="s_to_r_dist" x1={sourceData.fromLeft + 5} y1="5" x2={fieldData.width - receiverData.fromRight - 5} y2="5" stroke="#000000" strokeWidth="2"></line>
                            <polygon id="s_to_r_dist_ed" points={receiverArrowPts} fill="#000000" />
                        </g>
                        <g id="ruler_dist_s_to_r" transform="matrix(1 0 0 1 0 35)" >
                            <g className={styles.ruler_line} stroke="#000000" fill="#000000" strokeWidth="0" >
                                <polygon id="s_to_r_dist_st" points={sourceArrowPts}  />
                                <line id="s_to_r_dist" x1={sourceData.fromLeft + 5} y1="5" x2={fieldData.width - receiverData.fromRight - 5} y2="5" strokeWidth="2"></line>
                                <polygon id="s_to_r_dist_ed" points={receiverArrowPts} />
                                <rect x={fieldData.width/2 -  25} width="50" height="10" strokeWidth="0"   fill="#CCCCCC"></rect>
                                <text className={styles.ruler_dist_s_to_r_text} x={fieldData.width/2} y="5"  textAnchor="middle" alignmentBaseline="middle">{receiverData.distFromSource.toString() + "m" }</text>
                            </g>
                        </g>
                    </g>
                </g>
                <g>
                    <g id="s_height_ruler" className={styles.ruler_line} stroke="#000000" fill="#000000" strokeWidth="0">
                        <line id="source_ruler" x1={sourceData.fromLeft - (pxPerMeter/2)} y1={fieldData.height - rulerAreaHight - (sourceData.height * pxPerMeter) + 2}
                            x2={sourceData.fromLeft - (pxPerMeter/2)} y2={fieldData.height - rulerAreaHight} strokeWidth="2">
                        </line>
                        <polygon id="s_height_arr_up" points={sourceHUpArrowPts} />
                        <polygon id="s_height_arr_dn" points={sourceDUpArrowPts} />
                        <rect x={sourceData.fromLeft - (pxPerMeter/2) - 50} y={fieldData.height - rulerAreaHight - (sourceData.height / 2 * pxPerMeter) - 10} width={40} height={20} fill="#BBBBBB" rx="5">
                        </rect>
                        <text className={styles.source_text} x={sourceData.fromLeft - (pxPerMeter/2) - 30} y={fieldData.height - rulerAreaHight - (sourceData.height / 2 * pxPerMeter) + 2} textAnchor="middle" alignmentBaseline="middle">
                            {(Math.round(sourceData.height * 10)/10).toString() + "m"}
                        </text>
                    </g>
                    <g id="ba_effect_area">
                        <g id="ba1_effect_area" >
                            <polygon points={barrier1EffectAreaPts} stroke="#000000" fill="#000000" strokeWidth="0" fillOpacity="12.5%" />
                        </g>
                        <g id="ba2_effect_area" >
                            <polygon points={barrier2EffectAreaPts} stroke="#000000" fill="#000000" strokeWidth="0" fillOpacity="12.5%" />
                        </g>
                    </g>
                    <g id="ba1_area">
                        <g id="ba1" className={styles.ruler_line} stroke="#000000" fill="#000000" strokeWidth="0" transform="matrix(1 0 0 1 0 0)" >
                            <line id="ba1_line" x1={sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)} y1={fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 3} 
                                x2={sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)} y2={fieldData.height - rulerAreaHight} strokeWidth="4">
                            </line>
                        </g>
                        <g id="ba1_height_ruler" className={styles.ruler_line} stroke="#000000" fill="#000000" strokeWidth="0" transform="matrix(1 0 0 1 15 0)" >
                            <line id="ba1_height_line" x1={sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)} y1={fieldData.height - rulerAreaHight - (barrier1Data.height * pxPerMeter) + 3} 
                                x2={sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter)} y2={fieldData.height - rulerAreaHight} strokeWidth="2">
                            </line>
                            <polygon id="ba1_height_arr_up" points={barrier1HUpArrowPts} />
                            <polygon id="ba1_height_arr_dn" points={barrier1HDnArrowPts} />
                            <rect id="ba1_height_label_box"  strokeWidth="0"
                                rx="5"
                                x={sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 10} 
                                y={fieldData.height - rulerAreaHight - (barrier1Data.height / 2 * pxPerMeter) - 10} width={40} height={20} fill="#BBBBBB" 
                            >
                            </rect>
                            <text 
                                className={styles.ruler_dist_s_to_r_text}
                                x={sourceData.fromLeft + (barrier1Data.distFromSource * pxPerMeter) + 30} 
                                y={fieldData.height - rulerAreaHight - (barrier1Data.height / 2 * pxPerMeter) + 2}
                                textAnchor="middle" alignmentBaseline="middle">
                                {(Math.round(barrier1Data.height * 10)/10).toString() + "m"}
                            </text>
                        </g>
                        <g id="ba1_picker" className={styles.ruler_line} 
                            stroke="#000000" fill="#000000" strokeWidth="0" 
                            onMouseDown={onBarrier1PickerMouseDown}
                            transform={ba1Transform}
                        >
                            <circle cx="-5" cy="0" r="5" />
                            <g id="ba2_lable">
                                <rect x="15" y="-10" width={70} height={20} rx="5" fill="#DDDDDD" fillOpacity="80%"/>
                                <text  className={styles.source_text} x="20" y="2" textAnchor="start" alignmentBaseline="middle">BARRIER - 1</text>
                            </g>
                        </g>
                    </g>
                    <g id="ba2_area">
                        <g id="ba2" className={styles.ruler_line} stroke="#000000" fill="#000000" strokeWidth="0" transform="matrix(1 0 0 1 0 0)" >
                            <line id="ba2_line" x1={sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)} y1={fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 3} 
                                x2={sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)} y2={fieldData.height - rulerAreaHight} strokeWidth="4">
                            </line>
                        </g>
                        <g id="ba2_height_ruler" className={styles.ruler_line} stroke="#000000" fill="#000000" strokeWidth="0" transform="matrix(1 0 0 1 15 0)" >
                            <line id="ba2_height_line" x1={sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)} y1={fieldData.height - rulerAreaHight - (barrier2Data.height * pxPerMeter) + 3} 
                                x2={sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter)} y2={fieldData.height - rulerAreaHight} strokeWidth="2">
                            </line>
                            <polygon id="ba2_height_arr_up" points={barrier2HUpArrowPts} />
                            <polygon id="ba2_height_arr_dn" points={barrier2HDnArrowPts} />
                            <rect id="ba2_height_label_box" strokeWidth="0"
                                rx="5"
                                x={sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 10} 
                                y={fieldData.height - rulerAreaHight - (barrier2Data.height / 2 * pxPerMeter) - 10} width={40} height={20} fill="#BBBBBB" 
                            >
                            </rect>
                            <text id="ba2_height_label_text"
                                className={styles.ruler_dist_s_to_r_text}
                                x={sourceData.fromLeft + (barrier2Data.distFromSource * pxPerMeter) + 30} 
                                y={fieldData.height - rulerAreaHight - (barrier2Data.height / 2 * pxPerMeter) + 2}
                                textAnchor="middle" alignmentBaseline="middle">
                                {(Math.round(barrier2Data.height * 10)/10).toString() + "m"}
                            </text>
                        </g>
                        <g id="ba2_picker" className={styles.ruler_line} 
                            stroke="#000000" fill="#000000" strokeWidth="0" 
                            onMouseDown={onBarrier2PickerMouseDown}
                            transform={ba2Transform}
                        >
                            <circle cx="-5" cy="0" r="5" />
                            <g id="ba2_lable">
                                <rect x="15" y="-10" width={70} height={20} rx="5" fill="#DDDDDD" fillOpacity="80%"/>
                                <text  className={styles.source_text} x="20" y="2" textAnchor="start" alignmentBaseline="middle">BARRIER - 2</text>
                            </g>
                        </g>
                    </g>
                    

                    <g id="bd_height_ruler">
                    </g>

                    <g id="r_height_ruler" className={styles.ruler_line} stroke="#000000" fill="#000000" strokeWidth="0" transform="matrix(1 0 0 1 15 0)" >
                        <line id="receiver_ruler" x1={sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter)} y1={fieldData.height - rulerAreaHight - (receiverData.height * pxPerMeter) + 3} 
                            x2={sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter)} y2={fieldData.height - rulerAreaHight} strokeWidth="2">
                        </line>
                        <polygon id="s_height_arr_up" points={receiverHUpArrowPts} />
                        <polygon id="s_height_arr_dn" points={receiverHDnArrowPts} />
                        <rect strokeWidth="0"
                            rx="5"
                            x={sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) + 10} 
                            y={fieldData.height - rulerAreaHight - (receiverData.height / 2 * pxPerMeter) - 10} width={40} height={20} fill="#BBBBBB" 
                            
                        >
                        </rect>
                        <text 
                            className={styles.ruler_dist_s_to_r_text}
                            x={sourceData.fromLeft + (receiverData.distFromSource * pxPerMeter) + 30} 
                            y={fieldData.height - rulerAreaHight - (receiverData.height / 2 * pxPerMeter) + 2}
                            textAnchor="middle" alignmentBaseline="middle">
                            {(Math.round(receiverData.height * 10)/10).toString() + "m"}
                        </text>
                    </g>
                    <g id="r_picker" className={styles.ruler_line} 
                            stroke="#000000" fill="#000000" strokeWidth="0" 
                            onMouseDown={onReceiverPickerMouseDown}
                            transform={recvTransform}
                        >
                            <polygon id="r_picker_arr_up" points="0, -7, 0, 7, 7, 0" />
                            <g id="ba2_lable">
                                <rect x="15" y="-10" width={72} height={20} rx="5" fill="#AAAAAA" />
                                <text  className={styles.source_text} x="20" y="2" textAnchor="start" alignmentBaseline="middle">RECEIVER</text>
                            </g>
                        </g>

                </g>
                
                <g className={styles.no_display}>
                    <text id="m1digit" className={styles.swave_dist_text} x={fieldData.width/2} y="5"  textAnchor="middle" alignmentBaseline="middle">0m</text>
                    <text id="m2digit" className={styles.swave_dist_text} x={fieldData.width/2} y="5"  textAnchor="middle" alignmentBaseline="middle">00m</text>
                    <text id="m3digit" className={styles.swave_dist_text} x={fieldData.width/2} y="5"  textAnchor="middle" alignmentBaseline="middle">000m</text>
                </g>
            </svg>
            
            { /*</Suspense> */}
        </WindowBase>
    );
}