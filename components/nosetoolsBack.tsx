"use client";
import { useState, useEffect, MouseEventHandler, useRef } from "react";

export default function Noisetools(props: any) {
  const PICKERS = {
    None: 0,
    Source: 1,
    Receiver: 2,
    Barrier1: 3,
    Barrier2: 4,
  } as const;
  type PICKERS = (typeof PICKERS)[keyof typeof PICKERS];

  const FIELD_OBJECT = {
    Source: "SOURCE",
    Receiver: "RECEIVER",
    Barrier1: "BARRIER1",
    Barrier2: "BARRIER2",
  } as const;
  type FIELD_OBJECT = (typeof FIELD_OBJECT)[keyof typeof FIELD_OBJECT];

  const [isLoading, setIsLoading] = useState(true);
  const [fieldData, setFieldDataData] = useState({ width: 1100, height: 500 });
  const [soundWaves, setSoundWaves] = useState<any[]>([]);
  //const [spaceLen, setSpaceLen] = useState(25);
  const [rulerAreaHight, setRulerAreaHight] = useState(55);

  let captuerPos = useRef({ x: 0, y: 0, fromBottom: 0 });

  let sourceDataRef = useRef({ fromLeft: 4.5, height: 5 });
  const [sourceData, setSourceData] = useState({ fromLeft: 4.5, height: 5 });

  let receiverDataRef = useRef({ distFromSource: 25, height: 2, fromRight: 4.5 });
  const [receiverData, setReceiverData] = useState({
    distFromSource: 20,
    height: 2,
    fromRight: 4.5,
  });

  let barrier1DataRef = useRef({ distFromSource: 10, height: 5 });
  const [barrier1Data, setBarrier1Data] = useState({ distFromSource: 10, height: 5 });

  let barrier2DataRef = useRef({ distFromSource: 10, height: 5 });
  const [barrier2Data, setBarrier2Data] = useState({ distFromSource: 15, height: 5 });

  const [pxPerMeter, setPxPerMeter] = useState(
    fieldData.width / (receiverData.distFromSource + sourceData.fromLeft + receiverData.fromRight)
  );

  const [fieldRect, setFieldRect] = useState(`0 0 ${fieldData.width} ${fieldData.height}`);

  const [sourceMatrix, setSourceMatrix] = useState(
    `matrix(1 0 0 1 ${getObjectCoord(FIELD_OBJECT.Source, "X")} ${getObjectCoord(
      FIELD_OBJECT.Source,
      "Y"
    )})`
  );

  const [rulerAreaMatrix, setRulerAreaMatrix] = useState(
    `matrix(1 0 0 1 0 ${getObjectCoord("RULER-BACKGROUND", "Y")})`
  );

  const [sourceArrowPts, setSourceArrowPts] = useState(
    `${getObjectCoord(FIELD_OBJECT.Source, "X")}, 5, ${
      getObjectCoord(FIELD_OBJECT.Source, "X") + 5
    }, 0, ${getObjectCoord(FIELD_OBJECT.Source, "X") + 5}, 10`
  );

  const [receiverArrowPts, setrReceiverArrowPts] = useState(
    `${getObjectCoord(FIELD_OBJECT.Receiver, "X") - 5}, 0, ${
      getObjectCoord(FIELD_OBJECT.Receiver, "X") - 5
    }, 10, ${getObjectCoord(FIELD_OBJECT.Receiver, "X") - 5 + 5}, 5`
  );

  const [sourceHUpArrowPts, setSourceHUpArrowPts] = useState(
    `${sourceData.fromLeft / pxPerMeter - pxPerMeter / 2}, ${getObjectCoord(
      FIELD_OBJECT.Source,
      "Y"
    )}, 
        ${sourceData.fromLeft / pxPerMeter - pxPerMeter / 2 - 5}, ${
      getObjectCoord(FIELD_OBJECT.Source, "Y") + 5
    }, 
        ${sourceData.fromLeft / pxPerMeter - pxPerMeter / 2 + 5}, ${
      getObjectCoord(FIELD_OBJECT.Source, "Y") + 5
    } 
        `
  );

  const [sourceDUpArrowPts, setSourceDUpArrowPts] = useState(
    `${sourceData.fromLeft / pxPerMeter - pxPerMeter / 2}, ${getObjectCoord(
      "RULER-BACKGROUND",
      "Y"
    )}, 
        ${sourceData.fromLeft / pxPerMeter - pxPerMeter / 2 - 5}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 5
    }, 
        ${sourceData.fromLeft / pxPerMeter - pxPerMeter / 2 + 5}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 5
    } 
        `
  );

  const [receiverHUpArrowPts, setReceiverHUpArrowPts] = useState(
    `${getObjectCoord(FIELD_OBJECT.Receiver, "X")}, ${getObjectCoord(FIELD_OBJECT.Receiver, "Y")}, 
        ${getObjectCoord(FIELD_OBJECT.Receiver, "X") - 5}, ${
      getObjectCoord(FIELD_OBJECT.Receiver, "Y") + 5
    }, 
        ${getObjectCoord(FIELD_OBJECT.Receiver, "X") + 5}, ${
      getObjectCoord(FIELD_OBJECT.Receiver, "Y") + 5
    } 
        `
  );

  const [receiverHDnArrowPts, seReceiverHDnArrowPts] = useState(
    `${getObjectCoord(FIELD_OBJECT.Receiver, "X")}, ${getObjectCoord("RULER-BACKGROUND", "Y")}, 
        ${getObjectCoord(FIELD_OBJECT.Receiver, "X") - 5}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 5
    }, 
        ${getObjectCoord(FIELD_OBJECT.Receiver, "X") + 5}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 5
    } 
        `
  );

  const [receiverPickerArrowPts, setReceiverPickerArrowPts] = useState(
    `${getObjectCoord(FIELD_OBJECT.Receiver, "X")}, ${getObjectCoord(FIELD_OBJECT.Receiver, "Y")}, 
        ${getObjectCoord(FIELD_OBJECT.Receiver, "X") - 7}, ${
      getObjectCoord(FIELD_OBJECT.Receiver, "Y") + 7
    }, 
        ${getObjectCoord(FIELD_OBJECT.Receiver, "X") + 7}, ${
      getObjectCoord(FIELD_OBJECT.Receiver, "Y") + 7
    }`
  );

  //////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Barrier Arrow & Picker
  // Barrier1
  const [barrier1HArrowPts, setBarrier1HArrowPts] = useState({
    up: `${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${getObjectCoord(
      FIELD_OBJECT.Barrier1,
      "Y"
    )}, 
        ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") - 5}, ${
      getObjectCoord(FIELD_OBJECT.Barrier1, "Y") + 5
    }, 
        ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 5}, ${
      getObjectCoord(FIELD_OBJECT.Barrier1, "Y") + 5
    } 
        `,
    down: `${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${getObjectCoord(
      "RULER-BACKGROUND",
      "Y"
    )}, 
        ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") - 5}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 5
    }, 
        ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 5}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 5
    } 
        `,
  });

  // Barrier2
  const [barrier2HArrowPts, setBarrier2HArrowPts] = useState({
    up: `${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${getObjectCoord(
      FIELD_OBJECT.Barrier2,
      "Y"
    )}, 
        ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") - 5}, ${
      getObjectCoord(FIELD_OBJECT.Barrier2, "Y") + 5
    }, 
        ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") + 5}, ${
      getObjectCoord(FIELD_OBJECT.Barrier2, "Y") + 5
    } 
        `,
    down: `${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${getObjectCoord(
      "RULER-BACKGROUND",
      "Y"
    )}, 
        ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") - 5}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 5
    }, 
        ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") + 5}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 5
    } 
        `,
  });

  const [barrier2PickerArrowPts, setBarrier2PickerArrowPts] = useState(
    `${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${getObjectCoord(FIELD_OBJECT.Barrier2, "Y")}, 
        ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") - 7}, ${
      getObjectCoord(FIELD_OBJECT.Barrier2, "Y") + 7
    }, 
        ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") + 7}, ${
      getObjectCoord(FIELD_OBJECT.Barrier2, "Y") + 7
    } 
        `
  );

  // Barrier's EffectAreaPts
  const [barrierEffectAreaPts, setBarrierEffectAreaPts] = useState({
    Ba1: `${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${getObjectCoord(
      FIELD_OBJECT.Barrier1,
      "Y"
    )},
        ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 200}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 2
    },
        ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 200}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 2
    },
        ${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 2
    }`,

    Ba2: `${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${getObjectCoord(
      FIELD_OBJECT.Barrier2,
      "Y"
    )}, 
        ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") + 200}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 2
    },
        ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") + 200}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 2
    },
        ${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${
      getObjectCoord("RULER-BACKGROUND", "Y") - 2
    }`,

    leftRulerStart: getObjectCoord(FIELD_OBJECT.Source, "X"),
    leftRulerEnd: getObjectCoord(FIELD_OBJECT.Barrier1, "X"),
    leftRulerStartArrowPts: `${getObjectCoord(FIELD_OBJECT.Source, "X") + 5}, 2, ${getObjectCoord(
      FIELD_OBJECT.Source,
      "X"
    )}, 5, ${getObjectCoord(FIELD_OBJECT.Source, "X") + 5}, 8`,
    leftRulerEndArrowPts: `${getObjectCoord(FIELD_OBJECT.Barrier1, "X") - 5}, 2, ${getObjectCoord(
      FIELD_OBJECT.Barrier1,
      "X"
    )}, 5, ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") - 5}, 8`,
    midRulerStart: getObjectCoord(FIELD_OBJECT.Barrier1, "X"),
    midRulerEnd: getObjectCoord(FIELD_OBJECT.Barrier2, "X"),
    midRulerStartArrowPts: `${getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 5}, 2, ${getObjectCoord(
      FIELD_OBJECT.Barrier1,
      "X"
    )}, 5, ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 5}, 8`,
    midRulerEndArrowPts: `${getObjectCoord(FIELD_OBJECT.Barrier2, "X") - 5}, 2, ${getObjectCoord(
      FIELD_OBJECT.Barrier2,
      "X"
    )}, 5, ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") - 5}, 8`,
    rightRulerStart: getObjectCoord(FIELD_OBJECT.Barrier2, "X"),
    rightRulerEnd: fieldData.width - sourceData.fromLeft * pxPerMeter,
    rightRulerLength: barrier1Data.distFromSource - barrier2Data.distFromSource,
    rightRulerStartArrowPts: `${
      getObjectCoord(FIELD_OBJECT.Barrier2, "X") + 5
    }, 2, ${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, 5, ${
      getObjectCoord(FIELD_OBJECT.Barrier2, "X") + 5
    }, 8`,
    rightRulerEndArrowPts: `${fieldData.width - sourceData.fromLeft * pxPerMeter - 5}, 2, ${
      fieldData.width - sourceData.fromLeft * pxPerMeter
    }, 5, ${fieldData.width - sourceData.fromLeft * pxPerMeter - 5}, 8`,
  });

  const [linePathSToR, setLinePathSToR] = useState(
    `${getObjectCoord(FIELD_OBJECT.Source, "X")}, ${getObjectCoord(
      FIELD_OBJECT.Source,
      "Y"
    )}, ${getObjectCoord(FIELD_OBJECT.Receiver, "X")}, ${getObjectCoord(
      FIELD_OBJECT.Receiver,
      "Y"
    )}`
  );

  let captured = useRef(PICKERS.None);

  const [ba1Transform, setBa1Transform] = useState(
    `translate(${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${getObjectCoord(
      FIELD_OBJECT.Barrier1,
      "Y"
    )}) rotate(270)`
  );

  const [ba2Transform, setBa2Transform] = useState(
    `translate(${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${getObjectCoord(
      FIELD_OBJECT.Barrier2,
      "Y"
    )}) rotate(270)`
  );

  const [recvTransform, setRecvTransform] = useState(
    `translate(${getObjectCoord(FIELD_OBJECT.Receiver, "X")}, ${
      getObjectCoord(FIELD_OBJECT.Receiver, "Y") + 7
    }) rotate(270)`
  );

  let wavesDist = [];
  let field;
  let swaveWidthDistLables: number[] = [];
  let rulerWidthDistLables = useRef<number[]>([0, 0, 0, 0, 0]);

  function drawSoundWaves() {
    let newSoundWaves = [];
    let innter = fieldData.width / pxPerMeter;
    for (let i = 0; i < Math.ceil(fieldData.width / pxPerMeter); i++) {
      newSoundWaves.push(
        <g key={"swave" + (i + 1).toString()}>
          <circle
            key={"swave_circle" + (i + 1).toString()}
            id={"swave_circle" + (i + 1).toString()}
            cx="0"
            cy="0"
            r={(i + 1) * pxPerMeter}
            fill="none"
            stroke={(i + 1) % 10 === 0 ? "#666666" : "#CCCCCC"}
            strokeWidth="1"
          />
          <rect
            key={"swave_dist_box_up" + (i + 1).toString()}
            id={"swave_dist_box" + (i + 1).toString()}
            x={swaveWidthDistLables[Math.floor((i + 1) / 10)] * -0.5}
            y={0 + (i + 1) * pxPerMeter - 8}
            width={swaveWidthDistLables[Math.floor((i + 1) / 10)]}
            height={16}
            fill="#FFFFFF"
          >
            {" "}
          </rect>
          <text
            className={"nts_swave_dist_text"}
            key={"swave_dist_up" + (i + 1).toString()}
            id={"swave_dist" + (i + 1).toString()}
            x="0"
            y={(i + 1) * pxPerMeter}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {(i + 1).toString() + "m"}
          </text>
          <rect
            key={"swave_dist_box_dn" + (i + 1).toString()}
            id={"swave_dist_box" + (i + 1).toString()}
            x={swaveWidthDistLables[Math.floor((i + 1) / 10)] * -0.5}
            y={0 + -1 * (i + 1) * pxPerMeter - 8}
            width={swaveWidthDistLables[Math.floor((i + 1) / 10)]}
            height={16}
            fill="#FFFFFF"
          >
            {" "}
          </rect>
          <text
            className={"nts_swave_dist_text"}
            key={"swave_dist_dn" + (i + 1).toString()}
            id={"swave_dist" + (i + 1).toString()}
            x="0"
            y={(i + 1) * pxPerMeter * -1}
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            {(i + 1).toString() + "m"}
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

    let dist1digit = document.getElementById("dist1digit");
    let dist2digit = document.getElementById("dist2digit");
    let dist3digit = document.getElementById("dist3digit");

    if (m1digit != null && m2digit != null && m3digit != null) {
      swaveWidthDistLables.push(m1digit.getBBox()["width"] * 1.4);
      swaveWidthDistLables.push(m2digit.getBBox()["width"] * 1.4);
      swaveWidthDistLables.push(m3digit.getBBox()["width"] * 1.4);
    }

    if (dist1digit != null && dist2digit != null && dist3digit != null) {
      rulerWidthDistLables.current = [];
      rulerWidthDistLables.current.push(dist1digit.getBBox()["width"] * 1.4);
      rulerWidthDistLables.current.push(dist1digit.getBBox()["width"] * 1.4);
      rulerWidthDistLables.current.push(dist1digit.getBBox()["width"] * 1.4);
    }

    drawSoundWaves();

    window.addEventListener("mouseup", windowMouseUp);
    window.addEventListener("mousemove", onWindowMouseMove);

    //document.nt_capture = 0;

    console.log("useEffect ???");

    return () => {
      //Remove Event Listener When Unmount
      window.removeEventListener("mouseup", windowMouseUp);
      window.removeEventListener("mousemove", onWindowMouseMove);
      console.log("Unmounted");
    };
  }, []);

  useEffect(() => {
    setSourceMatrix(
      `matrix(1 0 0 1 ${getObjectCoord(FIELD_OBJECT.Source, "X")} ${getObjectCoord(
        FIELD_OBJECT.Source,
        "Y"
      )})`
    );

    setSourceHUpArrowPts(
      `${sourceData.fromLeft * pxPerMeter - pxPerMeter / 2}, ${getObjectCoord(
        FIELD_OBJECT.Source,
        "Y"
      )}, 
            ${sourceData.fromLeft * pxPerMeter - pxPerMeter / 2 - 5}, ${
        getObjectCoord(FIELD_OBJECT.Source, "Y") + 5
      }, 
            ${sourceData.fromLeft * pxPerMeter - pxPerMeter / 2 + 5}, ${
        getObjectCoord(FIELD_OBJECT.Source, "Y") + 5
      } 
            `
    );

    setLinePathSToR(
      `${getObjectCoord(FIELD_OBJECT.Source, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Source,
        "Y"
      )}, ${getObjectCoord(FIELD_OBJECT.Receiver, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Receiver,
        "Y"
      )}`
    );

    let ba1NewArea = calcBarrier1EffectArea();
    let ba2NewArea = calcBarrier2EffectArea();

    setBarrierEffectArea();

    sourceDataRef.current = sourceData;
  }, [sourceData]);

  useEffect(() => {
    setBarrier1HArrowPts({
      up: `${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Barrier1,
        "Y"
      )}, 
            ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") - 5}, ${
        getObjectCoord(FIELD_OBJECT.Barrier1, "Y") + 5
      }, 
            ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 5}, ${
        getObjectCoord(FIELD_OBJECT.Barrier1, "Y") + 5
      } 
            `,
      down: `${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${getObjectCoord(
        "RULER-BACKGROUND",
        "Y"
      )}, 
            ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") - 5}, ${
        getObjectCoord("RULER-BACKGROUND", "Y") - 5
      }, 
            ${getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 5}, ${
        getObjectCoord("RULER-BACKGROUND", "Y") - 5
      } 
            `,
    });

    setBa1Transform(
      `translate(${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Barrier1,
        "Y"
      )}) rotate(270)`
    );

    setBarrierEffectArea();

    barrier1DataRef.current = barrier1Data;
  }, [barrier1Data]);

  useEffect(() => {
    setBarrier2HArrowPts({
      up: `${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Barrier2,
        "Y"
      )}, 
            ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") - 5}, ${
        getObjectCoord(FIELD_OBJECT.Barrier2, "Y") + 5
      }, 
            ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") + 5}, ${
        getObjectCoord(FIELD_OBJECT.Barrier2, "Y") + 5
      } 
            `,
      down: `${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${fieldData.height - rulerAreaHight}, 
            ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") - 5}, ${
        fieldData.height - rulerAreaHight - 5
      }, 
            ${getObjectCoord(FIELD_OBJECT.Barrier2, "X") + 5}, ${
        fieldData.height - rulerAreaHight - 5
      } 
            `,
    });

    setBa2Transform(
      `translate(${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Barrier2,
        "Y"
      )}) rotate(270)`
    );
    setBarrierEffectArea();

    barrier2DataRef.current = barrier2Data;
  }, [barrier2Data]);

  useEffect(() => {
    setReceiverHUpArrowPts(
      `${sourceData.fromLeft * pxPerMeter + receiverData.distFromSource * pxPerMeter}, ${
        fieldData.height - rulerAreaHight - receiverData.height * pxPerMeter
      }, 
            ${sourceData.fromLeft * pxPerMeter + receiverData.distFromSource * pxPerMeter - 5}, ${
        fieldData.height - rulerAreaHight - receiverData.height * pxPerMeter + 5
      }, 
            ${sourceData.fromLeft * pxPerMeter + receiverData.distFromSource * pxPerMeter + 5}, ${
        fieldData.height - rulerAreaHight - receiverData.height * pxPerMeter + 5
      } 
            `
    );

    setRecvTransform(
      `translate(${sourceData.fromLeft * pxPerMeter + receiverData.distFromSource * pxPerMeter}, ${
        fieldData.height - rulerAreaHight - receiverData.height * pxPerMeter + 7
      }) rotate(270)`
    );

    setLineSourceToReceiver();

    receiverDataRef.current = receiverData;
  }, [receiverData]);

  function setLineSourceToReceiver() {
    let sTorEq = getLineEquation(FIELD_OBJECT.Source, FIELD_OBJECT.Receiver);
    let leftBarrier =
      getObjectCoord(FIELD_OBJECT.Barrier1, "X") <= getObjectCoord(FIELD_OBJECT.Barrier2, "X")
        ? FIELD_OBJECT.Barrier1
        : FIELD_OBJECT.Barrier2;
    let rightBarrier =
      getObjectCoord(FIELD_OBJECT.Barrier1, "X") <= getObjectCoord(FIELD_OBJECT.Barrier2, "X")
        ? FIELD_OBJECT.Barrier2
        : FIELD_OBJECT.Barrier1;
    let sTorLeft = getLineEquationByPos(
      { x: getObjectCoord(FIELD_OBJECT.Source, "X"), y: getObjectCoord(FIELD_OBJECT.Source, "Y") },
      { x: getObjectCoord(rightBarrier, "X"), y: getObjectCoord(rightBarrier, "Y") }
    );
    let ptMid = "";
    let tmpX = 0;
    let tmpY = 0;
    let isEnd = false;
    let leftY = calcLineEquationY(sTorEq.a, sTorEq.b, getObjectCoord(leftBarrier, "X"));
    let leftY2 = calcLineEquationY(sTorLeft.a, sTorLeft.b, getObjectCoord(leftBarrier, "X"));

    if (leftY > getObjectCoord(leftBarrier, "Y")) {
      if (leftY2 > getObjectCoord(leftBarrier, "Y")) {
        tmpX = getObjectCoord(leftBarrier, "X");
        tmpY = getObjectCoord(leftBarrier, "Y");
        ptMid = `${getObjectCoord(leftBarrier, "X")}, ${getObjectCoord(leftBarrier, "Y")}, `;
      } else {
        ptMid = `${getObjectCoord(rightBarrier, "X")}, ${getObjectCoord(rightBarrier, "Y")}, `;
        isEnd = true;
      }
    }

    if (!isEnd) {
      sTorEq = getLineEquationByPos(
        { x: tmpX, y: tmpY },
        {
          x: getObjectCoord(FIELD_OBJECT.Receiver, "X"),
          y: getObjectCoord(FIELD_OBJECT.Receiver, "Y"),
        }
      );
      leftY = calcLineEquationY(sTorEq.a, sTorEq.b, getObjectCoord(rightBarrier, "X"));

      if (leftY > getObjectCoord(rightBarrier, "Y")) {
        ptMid += `${getObjectCoord(rightBarrier, "X")}, ${getObjectCoord(rightBarrier, "Y")}, `;
      }
    }

    setLinePathSToR(
      `${getObjectCoord(FIELD_OBJECT.Source, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Source,
        "Y"
      )}, ${ptMid} ${getObjectCoord(FIELD_OBJECT.Receiver, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Receiver,
        "Y"
      )}`
    );
  }

  function setBarrierEffectArea() {
    let ba1NewArea = calcBarrier1EffectArea();
    let ba2NewArea = calcBarrier2EffectArea();

    let leftBarrier =
      getObjectCoord(FIELD_OBJECT.Barrier1, "X") <= getObjectCoord(FIELD_OBJECT.Barrier2, "X")
        ? barrier1Data
        : barrier2Data;
    let rightBarrier =
      getObjectCoord(FIELD_OBJECT.Barrier1, "X") <= getObjectCoord(FIELD_OBJECT.Barrier2, "X")
        ? barrier2Data
        : barrier1Data;

    let leftBarrierName =
      getObjectCoord(FIELD_OBJECT.Barrier1, "X") <= getObjectCoord(FIELD_OBJECT.Barrier2, "X")
        ? FIELD_OBJECT.Barrier1
        : FIELD_OBJECT.Barrier2;
    let rightBarrierName =
      getObjectCoord(FIELD_OBJECT.Barrier1, "X") <= getObjectCoord(FIELD_OBJECT.Barrier2, "X")
        ? FIELD_OBJECT.Barrier2
        : FIELD_OBJECT.Barrier1;

    setBarrierEffectAreaPts({
      Ba1: `${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Barrier1,
        "Y"
      )},
            ${ba1NewArea.newAreaX}, ${ba1NewArea.newAreaY},
            ${fieldData.width}, ${getObjectCoord("RULER-BACKGROUND", "Y")},
            ${getObjectCoord(FIELD_OBJECT.Barrier1, "X")}, ${getObjectCoord(
        "RULER-BACKGROUND",
        "Y"
      )}`,

      Ba2: `${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${getObjectCoord(
        FIELD_OBJECT.Barrier2,
        "Y"
      )},
            ${ba2NewArea.newAreaX}, ${ba2NewArea.newAreaY},
            ${fieldData.width}, ${getObjectCoord("RULER-BACKGROUND", "Y")},
            ${getObjectCoord(FIELD_OBJECT.Barrier2, "X")}, ${getObjectCoord(
        "RULER-BACKGROUND",
        "Y"
      )}`,

      leftRulerStart: sourceData.fromLeft * pxPerMeter,
      leftRulerEnd: getObjectCoord(leftBarrierName, "X"),
      leftRulerStartArrowPts: `${sourceData.fromLeft * pxPerMeter + 5}, 2, ${
        sourceData.fromLeft * pxPerMeter
      }, 5, ${sourceData.fromLeft * pxPerMeter + 5}, 8`,
      leftRulerEndArrowPts: `${getObjectCoord(leftBarrierName, "X") - 5}, 2, ${getObjectCoord(
        leftBarrierName,
        "X"
      )}, 5, ${getObjectCoord(leftBarrierName, "X") - 5}, 8`,
      midRulerStart: getObjectCoord(leftBarrierName, "X"),
      midRulerEnd: getObjectCoord(rightBarrierName, "X"),
      midRulerStartArrowPts: `${getObjectCoord(leftBarrierName, "X") + 5}, 2, ${getObjectCoord(
        leftBarrierName,
        "X"
      )}, 5, ${getObjectCoord(leftBarrierName, "X") + 5}, 8`,
      midRulerEndArrowPts: `${getObjectCoord(rightBarrierName, "X") - 5}, 2, ${getObjectCoord(
        rightBarrierName,
        "X"
      )}, 5, ${getObjectCoord(rightBarrierName, "X") - 5}, 8`,
      rightRulerStart: getObjectCoord(rightBarrierName, "X"),
      rightRulerEnd: fieldData.width - receiverData.fromRight * pxPerMeter,
      rightRulerLength: receiverData.distFromSource - rightBarrier.distFromSource,
      rightRulerStartArrowPts: `${getObjectCoord(rightBarrierName, "X") + 5}, 2, ${getObjectCoord(
        rightBarrierName,
        "X"
      )}, 5, ${getObjectCoord(rightBarrierName, "X") + 5}, 8`,
      rightRulerEndArrowPts: `${fieldData.width - receiverData.fromRight * pxPerMeter - 5}, 2, ${
        fieldData.width - receiverData.fromRight * pxPerMeter
      }, 5, ${fieldData.width - receiverData.fromRight * pxPerMeter - 5}, 8`,
    });

    console.log(
      `leftRuler = [${barrierEffectAreaPts.leftRulerStart}, ${barrierEffectAreaPts.leftRulerEnd}] midRuler = [${barrierEffectAreaPts.midRulerStart}, ${barrierEffectAreaPts.midRulerEnd}] rightRuler = [${barrierEffectAreaPts.rightRulerStart}, ${barrierEffectAreaPts.rightRulerEnd}]`
    );

    setLineSourceToReceiver();
  }

  function calcBarrier1EffectArea(): { newAreaX: number; newAreaY: number } {
    let newAreaY = 0;
    let newAreaX = 0;
    let eqConst = getLineEquation(FIELD_OBJECT.Source, FIELD_OBJECT.Barrier1); //Source위치와 Barrier1간의 직선의 방정식 F1()을 구한다.
    let calcY = calcLineEquationY(eqConst.a, eqConst.b, getObjectCoord(FIELD_OBJECT.Barrier2, "X"));

    if (barrier1Data.distFromSource > barrier2Data.distFromSource) {
      //Barrier2가 왼쪽에 있다면
      if (
        calcY >= getObjectCoord(FIELD_OBJECT.Barrier2, "Y") ||
        getObjectCoord(FIELD_OBJECT.Barrier2, "Y") < getObjectCoord(FIELD_OBJECT.Barrier1, "Y")
      ) {
        eqConst = getLineEquation(FIELD_OBJECT.Barrier2, FIELD_OBJECT.Barrier1);
        newAreaY = calcLineEquationY(eqConst.a, eqConst.b, fieldData.width);
        newAreaX = fieldData.width;
      } else {
        newAreaY = calcLineEquationY(eqConst.a, eqConst.b, fieldData.width);
        newAreaX = fieldData.width;
      }
    } else {
      newAreaY = calcLineEquationY(eqConst.a, eqConst.b, fieldData.width);
      newAreaX = fieldData.width;
    }

    return { newAreaX, newAreaY };
  }

  function calcBarrier2EffectArea(): { newAreaX: number; newAreaY: number } {
    let newAreaY = 0;
    let newAreaX = 0;
    let eqConst = getLineEquation(FIELD_OBJECT.Source, FIELD_OBJECT.Barrier1); //Source위치와 Barrier1간의 직선의 방정식 F1()을 구한다.
    let calcY = calcLineEquationY(eqConst.a, eqConst.b, getObjectCoord(FIELD_OBJECT.Barrier2, "X"));

    console.log(`calcY = ${calcY} Barrier2-Y = ${getObjectCoord(FIELD_OBJECT.Barrier1, "Y")}`);
    if (barrier1Data.distFromSource < barrier2Data.distFromSource) {
      //Barrier2가 왼쪽에 있다면
      if (
        calcY < getObjectCoord(FIELD_OBJECT.Barrier2, "Y") ||
        getObjectCoord(FIELD_OBJECT.Barrier2, "Y") > getObjectCoord(FIELD_OBJECT.Barrier1, "Y")
      ) {
        console.log("ba2 logic pt-1");
        eqConst = getLineEquation(FIELD_OBJECT.Barrier2, FIELD_OBJECT.Barrier1);
        newAreaY = calcLineEquationY(eqConst.a, eqConst.b, fieldData.width);
        newAreaX = fieldData.width;
      } else {
        console.log("ba2 logic pt-2");
        eqConst = getLineEquation(FIELD_OBJECT.Source, FIELD_OBJECT.Barrier2);
        newAreaY = calcLineEquationY(eqConst.a, eqConst.b, fieldData.width);
        newAreaX = fieldData.width;
      }
    } else {
      console.log("ba2 logic pt-3");
      eqConst = getLineEquation(FIELD_OBJECT.Source, FIELD_OBJECT.Barrier2);
      newAreaY = calcLineEquationY(eqConst.a, eqConst.b, fieldData.width);
      newAreaX = fieldData.width;
    }

    return { newAreaX, newAreaY };
  }

  function calcLineEquationY(a: number, b: number, x: number): number {
    return a * x + b;
  }

  function calcLineEquationX(a: number, b: number, y: number): number {
    //Y = aX​ + b
    //X = (Y - b)/a
    return (y - b) / a;
  }

  function getLineEquation(
    fromObj: string,
    toObj: string
  ): { a: number; b: number; radius: number } {
    let a = 0;
    let b = 0;

    let distX = getObjectCoord(fromObj, "X") - getObjectCoord(toObj, "X");
    let distY = getObjectCoord(fromObj, "Y") - getObjectCoord(toObj, "Y");
    let radius = Math.atan2(distY, distX);
    let newBa1AreaY =
      getObjectCoord(fromObj, "Y") + Math.sin(radius) * getObjectCoord(fromObj, "X");
    let angle = (radius * 180) / Math.PI;

    let sX = getObjectCoord(fromObj, "X");
    let sY = getObjectCoord(fromObj, "Y");

    a = distY / distX;
    b = sY - a * sX;

    return { a, b, radius };
  }

  function getLineEquationByPos(
    fromObj: { x: number; y: number },
    toObj: { x: number; y: number }
  ): { a: number; b: number; radius: number } {
    let a = 0;
    let b = 0;

    let distX = fromObj.x - toObj.x;
    let distY = fromObj.y - toObj.y;
    let radius = Math.atan2(distY, distX);
    let newBa1AreaY = fromObj.y + Math.sin(radius) * fromObj.x;
    let angle = (radius * 180) / Math.PI;

    let sX = fromObj.x;
    let sY = fromObj.y;

    a = distY / distX;
    b = sY - a * sX;

    return { a, b, radius };
  }

  function getObjectCoord(objectName: string, xy: string): number {
    switch (objectName.toUpperCase() + "-" + xy.toUpperCase()) {
      case "SOURCE-X":
        return sourceData.fromLeft * pxPerMeter;
      case "SOURCE-Y":
        return fieldData.height - rulerAreaHight - sourceData.height * pxPerMeter;
      case "RECEIVER-X":
        return fieldData.width - receiverData.fromRight * pxPerMeter;
      case "RECEIVER-Y":
        return fieldData.height - rulerAreaHight - receiverData.height * pxPerMeter;
      case "BARRIER1-X":
        return sourceData.fromLeft + barrier1Data.distFromSource * pxPerMeter;
      case "BARRIER1-Y":
        return fieldData.height - rulerAreaHight - barrier1Data.height * pxPerMeter;
      case "BARRIER2-X":
        return sourceData.fromLeft + barrier2Data.distFromSource * pxPerMeter;
      case "BARRIER2-Y":
        return fieldData.height - rulerAreaHight - barrier2Data.height * pxPerMeter;
      case "RULER-BACKGROUND-Y":
        return fieldData.height - rulerAreaHight;
    }

    return 0;
  }

  function setCapturedPicker(v: PICKERS) {
    //document.nt_capture = v;
    captured.current = v;
  }

  function windowMouseUp(e: MouseEvent) {
    setCapturedPicker(PICKERS.None);
  }

  function onSourcePickerMouseDown(e: MouseEventHandler<SVGSVGElement>) {
    let svg = document.querySelector("svg#nt_svg");
    let svgX = svg.getClientRects()[0]["x"];
    let svgY = svg.getClientRects()[0]["y"];

    captuerPos.current.x = svgX + getObjectCoord(FIELD_OBJECT.Source, "X") - e.clientX;
    captuerPos.current.y = svgX + getObjectCoord(FIELD_OBJECT.Source, "Y") - e.clientY;
    captuerPos.current.fromBottom = getObjectCoord(FIELD_OBJECT.Source, "Y") - e.clientY;

    setCapturedPicker(PICKERS.Source);
  }

  function onReceiverPickerMouseDown(e: MouseEventHandler<SVGSVGElement>) {
    let svg = document.querySelector("svg#nt_svg");
    let svgX = svg.getClientRects()[0]["x"];
    let svgY = svg.getClientRects()[0]["y"];

    captuerPos.current.x = svgX + getObjectCoord(FIELD_OBJECT.Receiver, "X") - e.clientX;
    captuerPos.current.y = svgX + getObjectCoord(FIELD_OBJECT.Receiver, "Y") - e.clientY;
    captuerPos.current.fromBottom = getObjectCoord(FIELD_OBJECT.Receiver, "Y") - e.clientY;

    setCapturedPicker(PICKERS.Receiver);
  }

  function onBarrier1PickerMouseDown(e: MouseEventHandler<SVGSVGElement>) {
    let svg = document.querySelector("svg#nt_svg");
    let svgX = svg.getClientRects()[0]["x"];
    let svgY = svg.getClientRects()[0]["y"];

    captuerPos.current.x = svgX + getObjectCoord(FIELD_OBJECT.Barrier1, "X") - e.clientX;
    captuerPos.current.y = svgX + getObjectCoord(FIELD_OBJECT.Barrier1, "Y") - e.clientY;
    captuerPos.current.fromBottom = getObjectCoord(FIELD_OBJECT.Barrier1, "Y") - e.clientY;

    setCapturedPicker(PICKERS.Barrier1);
  }

  function onBarrier1PickerMouseUp(e: MouseEventHandler<SVGSVGElement>) {
    setCapturedPicker(PICKERS.None);
  }

  function onBarrier2PickerMouseDown(e: MouseEventHandler<SVGSVGElement>) {
    let svg = document.querySelector("svg#nt_svg");
    let svgX = svg.getClientRects()[0]["x"];
    let svgY = svg.getClientRects()[0]["y"];

    captuerPos.current.x = svgX + getObjectCoord(FIELD_OBJECT.Barrier2, "X") - e.clientX;
    captuerPos.current.y = svgX + getObjectCoord(FIELD_OBJECT.Barrier2, "Y") - e.clientY;
    captuerPos.current.fromBottom = getObjectCoord(FIELD_OBJECT.Barrier2, "Y") - e.clientY;

    setCapturedPicker(PICKERS.Barrier2);
  }

  function onSvgMouseUp(e: MouseEventHandler<SVGSVGElement>) {
    setCapturedPicker(PICKERS.None);
  }

  function onWindowMouseMove(e: MouseEvent) {
    if (captured.current !== PICKERS.None) {
      onPickerMouseMoveUseRef(e, captured.current);
    }
  }
  function onSvgMouseMove(e: MouseEvent) {
    if (captured.current !== PICKERS.None) {
      onPickerMouseMoveUseRef(e, captured.current);
    }
  }

  function onPickerMouseMoveUseRef(e: MouseEvent, cap: number) {
    //function onPickerMouseMove(e:MouseEventHandler<SVGSVGElement>){
    let svg = document.querySelector("svg#nt_svg");
    if (svg == null) return;

    let svgX = svg.getClientRects()[0]["x"];
    let svgY = svg.getClientRects()[0]["y"];

    if (cap === PICKERS.Source) {
      if (svg !== null && e.movementY !== 0) {
        let swave = svg.querySelector("#swaves");
        let newH: number = sourceDataRef.current.height;

        if (
          svgY + 0 <= e.clientY &&
          svgY + getObjectCoord("RULER-BACKGROUND", "Y") >=
            e.clientY + captuerPos.current.fromBottom
        ) {
          //newH-= e.movementY / pxPerMeter;
          newH =
            Math.round(
              ((getObjectCoord("RULER-BACKGROUND", "Y") -
                e.clientY -
                captuerPos.current.fromBottom) /
                pxPerMeter) *
                10
            ) / 10;

          if (newH < 0) console.log("!@#$%^&");
        }
        newH = newH >= 0 ? newH : 0;

        setSourceData({ fromLeft: sourceDataRef.current.fromLeft, height: newH });
      }
    } else if (cap === PICKERS.Receiver) {
      if (svg !== null && e.movementY !== 0) {
        let r_picker = svg.querySelector("#r_picker");
        let attr = r_picker.getAttribute("transform");

        let newH: number = receiverDataRef.current.height;
        if (
          svgY + 0 <= e.clientY &&
          svgY + getObjectCoord("RULER-BACKGROUND", "Y") >=
            e.clientY + captuerPos.current.fromBottom
        ) {
          //newH-= e.movementY / pxPerMeter;
          newH =
            Math.round(
              ((getObjectCoord("RULER-BACKGROUND", "Y") -
                e.clientY -
                captuerPos.current.fromBottom) /
                pxPerMeter) *
                10
            ) / 10;
        }
        newH = newH >= 0 ? newH : 0;

        setReceiverData({
          distFromSource: receiverDataRef.current.distFromSource,
          fromRight: receiverDataRef.current.fromRight,
          height: newH,
        });
      }
    } else if (cap === PICKERS.Barrier1) {
      if (svg !== null && (e.movementY !== 0 || e.movementX !== 0)) {
        let ba1_picker = svg.querySelector("#ba1_picker");

        let newH: number = barrier1DataRef.current.height; // - (e.movementY / pxPerMeter);
        let newD: number = barrier1DataRef.current.distFromSource;

        if (
          svgX + getObjectCoord(FIELD_OBJECT.Source, "X") <= e.clientX &&
          svgX + getObjectCoord(FIELD_OBJECT.Receiver, "X") >= e.clientX
        ) {
          newD =
            Math.round(
              ((e.clientX -
                svg.getClientRects()[0]["x"] -
                sourceData.fromLeft +
                captuerPos.current.x) /
                pxPerMeter) *
                10
            ) / 10;
        }

        if (
          svgY + 0 <= e.clientY &&
          svgY + getObjectCoord("RULER-BACKGROUND", "Y") >=
            e.clientY + captuerPos.current.fromBottom
        ) {
          newH =
            Math.round(
              ((getObjectCoord("RULER-BACKGROUND", "Y") -
                e.clientY -
                captuerPos.current.fromBottom) /
                pxPerMeter) *
                10
            ) / 10;
        }
        newH = newH >= 0 ? newH : 0;

        setBarrier1Data({ distFromSource: newD, height: newH });
      }
    } else if (cap === PICKERS.Barrier2) {
      if (svg !== null && (e.movementY !== 0 || e.movementX !== 0)) {
        let ba2_picker = svg.querySelector("#ba2_picker");

        let newH: number = barrier2DataRef.current.height; // - (e.movementY / pxPerMeter);
        let newD: number = barrier2DataRef.current.distFromSource;

        if (
          svgX + getObjectCoord(FIELD_OBJECT.Source, "X") <= e.clientX &&
          svgX + getObjectCoord(FIELD_OBJECT.Receiver, "X") >=
            e.clientX + captuerPos.current.fromBottom
        ) {
          newD =
            Math.round(
              ((e.clientX - svg.getClientRects()[0]["x"] + captuerPos.current.x) / pxPerMeter) * 10
            ) / 10;
        }

        if (svgY + 0 <= e.clientY && svgY + getObjectCoord("RULER-BACKGROUND", "Y") >= e.clientY) {
          newH =
            Math.round(
              ((getObjectCoord("RULER-BACKGROUND", "Y") -
                e.clientY -
                captuerPos.current.fromBottom) /
                pxPerMeter) *
                10
            ) / 10;
        }

        newH = newH >= 0 ? newH : 0;

        setBarrier2Data({ distFromSource: newD, height: newH });
      }
    }
  }

  function onPickerMouseMove(e: MouseEvent, cap: number) {
    //function onPickerMouseMove(e:MouseEventHandler<SVGSVGElement>){
    let svg = document.querySelector("svg#nt_svg");
    if (cap === PICKERS.Source) {
      if (svg !== null && e.movementY !== 0) {
        let swave = svg.querySelector("#swaves");
        let attr = swave?.getAttribute("transform");

        //swave.transform.baseVal[0]['matrix']['e'] += e.movementX;
        swave.transform.baseVal?[0]["matrix"]["f"] += e.movementY;

        let newH: number = (sourceData.height -= e.movementY / pxPerMeter);
        setSourceData({ fromLeft: sourceData.fromLeft, height: newH });
        setSourceHUpArrowPts(
          `${sourceData.fromLeft - pxPerMeter / 2}, ${
            fieldData.height - rulerAreaHight - sourceData.height * pxPerMeter
          }, 
                    ${sourceData.fromLeft - pxPerMeter / 2 - 5}, ${
            fieldData.height - rulerAreaHight - sourceData.height * pxPerMeter + 5
          }, 
                    ${sourceData.fromLeft - pxPerMeter / 2 + 5}, ${
            fieldData.height - rulerAreaHight - sourceData.height * pxPerMeter + 5
          } 
                    `
        );
      }
    } else if (cap === PICKERS.Receiver) {
      if (svg !== null && e.movementY !== 0) {
        let r_picker = svg.querySelector("#r_picker");
        let attr = r_picker.getAttribute("transform");

        let newH: number = (receiverData.height -= e.movementY / pxPerMeter);
        newH = newH >= 0 ? newH : 0;

        setReceiverData({
          distFromSource: receiverData.distFromSource,
          fromRight: receiverData.fromRight,
          height: newH,
        });
      }
    } else if (cap === PICKERS.Barrier1) {
      if (svg !== null && (e.movementY !== 0 || e.movementX !== 0)) {
        let ba1_picker = svg.querySelector("#ba1_picker");
        let attr = ba1_picker.getAttribute("transform");

        let newH: number = barrier1Data.height - e.movementY / pxPerMeter;
        let newD: number = barrier1Data.distFromSource + e.movementX / pxPerMeter;

        let limitX =
          ba1_picker.getClientRects()[0]["x"] + ba1_picker.getClientRects()[0]["width"] / 2;
        newD =
          newD >= 0 ? (newD > receiverData.distFromSource ? receiverData.distFromSource : newD) : 0;

        if (receiverData.distFromSource <= barrier1Data.distFromSource && limitX < e.pageX)
          newD = receiverData.distFromSource;
        else if (barrier1Data.distFromSource <= 0 && limitX > e.pageX) newD = 0;
        newH = newH >= 0 ? newH : 0;

        setBarrier1Data({ distFromSource: newD, height: newH });

        console.log(
          `PICKERS.Barrier1 : cap == ${PICKERS.Barrier1 == cap} , ${
            barrier1Data.distFromSource
          }, ${pxPerMeter}`
        );
      }
    } else if (cap === PICKERS.Barrier2) {
      if (svg !== null && (e.movementY !== 0 || e.movementX !== 0)) {
        let ba2_picker = svg.querySelector("#ba2_picker");
        //let attr = ba2_picker.getAttribute("transform");

        let newH: number = barrier2Data.height - e.movementY / pxPerMeter;
        let newD: number = barrier2Data.distFromSource + e.movementX / pxPerMeter;

        let limitX =
          ba2_picker.getClientRects()[0]["x"] + ba2_picker.getClientRects()[0]["width"] / 2;
        newD =
          newD >= 0 ? (newD > receiverData.distFromSource ? receiverData.distFromSource : newD) : 0;
        if (receiverData.distFromSource <= barrier2Data.distFromSource && limitX < e.pageX)
          newD = receiverData.distFromSource;
        else if (barrier2Data.distFromSource <= 0 && limitX > e.pageX) newD = 0;
        newH = newH >= 0 ? newH : 0;
        //console.log(`pageX = ${e.pageX} , pageY = ${e.pageY} screenX = ${e.screenX} screenY = ${e.screenY} newD = ${newD}`);
        setBarrier2Data({ distFromSource: newD, height: newH });
      }
    } else console.log(`captured.current = ${captured.current}`);
  }

  // https://noisetools.net/barriercalculator?source=[5.5]&receiver=[5.4,20]&barrier=[1,2.9,8.8]&walls=[1,1]&display=2
  // https://github.com/svgcamp/svg-arc/blob/master/index.js
  return (
    <div>
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox={fieldRect}
        id="nt_svg"
        className={"nts_noise_field"}
        onMouseMove={onSvgMouseMove}
        onMouseUp={onSvgMouseUp}
      >
        <g id="swaves" transform={sourceMatrix}>
          <g id="swave_picker">
            {soundWaves}
            <g
              className={"nts_ruler_line"}
              transform="rotate(-90, 0, 0)"
              stroke="#000000"
              fill="#000000"
              strokeWidth="0"
              onMouseDown={onSourcePickerMouseDown}
            >
              <circle id="swave_picker" cx="0" cy="0" r="7" strokeWidth="0" />
              <rect x="15" y="-11" width={60} height={20} rx="5" fill="#AAAAAA">
                {" "}
              </rect>
              <text
                className={"nts_source_text"}
                x="17"
                y="0"
                textAnchor="start"
                alignmentBaseline="middle"
              >
                SOURCE
              </text>
            </g>
          </g>
        </g>

        <g id="ba_effect_area">
          <g id="ba1_effect_area">
            <polygon
              points={barrierEffectAreaPts.Ba1}
              stroke="#000000"
              fill="#000000"
              strokeWidth="0"
              fillOpacity="12.5%"
            />
          </g>
          <g id="ba2_effect_area">
            <polygon
              points={barrierEffectAreaPts.Ba2}
              stroke="#000000"
              fill="#000000"
              strokeWidth="0"
              fillOpacity="12.5%"
            />
          </g>
        </g>

        <g id="ruler_area">
          <g transform={rulerAreaMatrix}>
            <g id="ruler_background">
              <rect x="-1" width={fieldData.width + 2} height={rulerAreaHight} fill="#CCCCCC" />
              <line
                x1="-1"
                y1="0"
                x2={fieldData.width + 2}
                y2="0"
                strokeWidth="1"
                stroke="#000000"
              ></line>
            </g>
            <g id="ruler_dist_left" transform="matrix(1 0 0 1 0 15)">
              <g>
                <polygon
                  id="left_dist_st"
                  points={barrierEffectAreaPts.leftRulerStartArrowPts}
                  fill="#000000"
                />
                <line
                  id="left_dist"
                  x1={barrierEffectAreaPts.leftRulerStart + 5}
                  y1="5"
                  x2={barrierEffectAreaPts.leftRulerEnd - 5}
                  y2="5"
                  stroke="#000000"
                  strokeWidth="1"
                />
                <polygon
                  id="left_dist_ed"
                  points={barrierEffectAreaPts.leftRulerEndArrowPts}
                  fill="#000000"
                />
              </g>
              <g>
                <polygon
                  id="mid_dist_st"
                  points={barrierEffectAreaPts.midRulerStartArrowPts}
                  fill="#000000"
                />
                <line
                  id="mid_dist"
                  x1={barrierEffectAreaPts.midRulerStart + 5}
                  y1="5"
                  x2={barrierEffectAreaPts.midRulerEnd - 5}
                  y2="5"
                  stroke="#000000"
                  strokeWidth="1"
                />
                <polygon
                  id="mid_dist_ed"
                  points={barrierEffectAreaPts.midRulerEndArrowPts}
                  fill="#000000"
                />
              </g>
              <g>
                <polygon
                  id="right_dist_st"
                  points={barrierEffectAreaPts.rightRulerStartArrowPts}
                  fill="#000000"
                />
                <line
                  id="right_dist"
                  x1={barrierEffectAreaPts.rightRulerStart + 5}
                  y1="5"
                  x2={barrierEffectAreaPts.rightRulerEnd - 5}
                  y2="5"
                  stroke="#000000"
                  strokeWidth="1"
                />
                <polygon
                  id="right_dist_ed"
                  points={barrierEffectAreaPts.rightRulerEndArrowPts}
                  fill="#000000"
                />
                <rect
                  id="right_dist_box"
                  x={
                    barrierEffectAreaPts.rightRulerStart +
                    (barrierEffectAreaPts.rightRulerEnd - barrierEffectAreaPts.rightRulerStart) /
                      2 +
                    rulerWidthDistLables.current[0] * -0.5
                  }
                  y={-3}
                  width={rulerWidthDistLables.current[0]}
                  height={16}
                  fill="#DDDDDD"
                ></rect>
                <text
                  className={"nts_ruler_dist_s_to_r_text"}
                  x={
                    barrierEffectAreaPts.rightRulerStart +
                    (barrierEffectAreaPts.rightRulerEnd - barrierEffectAreaPts.rightRulerStart) / 2
                  }
                  y="5"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {barrierEffectAreaPts.rightRulerLength.toFixed(1) + "m"}
                </text>
              </g>
            </g>
            <g id="ruler_dist_s_to_r" transform="matrix(1 0 0 1 0 35)">
              <g className={"nts_ruler_line"} stroke="#000000" fill="#000000" strokeWidth="0">
                <polygon id="s_to_r_dist_st" points={sourceArrowPts} />
                <line
                  id="s_to_r_dist"
                  x1={sourceData.fromLeft * pxPerMeter + 5}
                  y1="5"
                  x2={fieldData.width - receiverData.fromRight * pxPerMeter - 5}
                  y2="5"
                  strokeWidth="2"
                ></line>
                <polygon id="s_to_r_dist_ed" points={receiverArrowPts} />
                <rect
                  x={fieldData.width / 2 - 25}
                  width="50"
                  height="10"
                  strokeWidth="0"
                  fill="#CCCCCC"
                ></rect>
                <text
                  className={"nts_ruler_dist_s_to_r_text"}
                  x={fieldData.width / 2}
                  y="5"
                  textAnchor="middle"
                  alignmentBaseline="middle"
                >
                  {receiverData.distFromSource.toString() + "m"}
                </text>
              </g>
            </g>
          </g>
        </g>

        <g>
          <g
            id="s_height_ruler"
            className={"nts_ruler_line"}
            stroke="#000000"
            fill="#000000"
            strokeWidth="0"
          >
            <line
              id="source_ruler"
              x1={sourceData.fromLeft * pxPerMeter - pxPerMeter / 2}
              y1={fieldData.height - rulerAreaHight - sourceData.height * pxPerMeter + 2}
              x2={sourceData.fromLeft * pxPerMeter - pxPerMeter / 2}
              y2={fieldData.height - rulerAreaHight}
              strokeWidth="2"
            ></line>
            <polygon id="s_height_arr_up" points={sourceHUpArrowPts} />
            <polygon id="s_height_arr_dn" points={sourceDUpArrowPts} />
            <rect
              x={sourceData.fromLeft * pxPerMeter - pxPerMeter / 2 - 50}
              y={fieldData.height - rulerAreaHight - (sourceData.height / 2) * pxPerMeter - 10}
              width={40}
              height={20}
              fill="#BBBBBB"
              rx="5"
            ></rect>
            <text
              className={"nts_source_text"}
              x={sourceData.fromLeft * pxPerMeter - pxPerMeter / 2 - 30}
              y={fieldData.height - rulerAreaHight - (sourceData.height / 2) * pxPerMeter + 2}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {(Math.round(sourceData.height * 10) / 10).toString() + "m"}
            </text>
          </g>

          <g id="ba1_area">
            <g
              id="ba1"
              className={"nts_ruler_line"}
              stroke="#000000"
              fill="#000000"
              strokeWidth="0"
              transform="matrix(1 0 0 1 0 0)"
            >
              <line
                id="ba1_line"
                x1={sourceData.fromLeft + barrier1Data.distFromSource * pxPerMeter}
                y1={fieldData.height - rulerAreaHight - barrier1Data.height * pxPerMeter}
                x2={getObjectCoord(FIELD_OBJECT.Barrier1, "X")}
                y2={fieldData.height - rulerAreaHight}
                strokeWidth="4"
              ></line>
            </g>
            <g
              id="ba1_height_ruler"
              className={"nts_ruler_line"}
              stroke="#000000"
              fill="#000000"
              strokeWidth="0"
              transform="matrix(1 0 0 1 15 0)"
            >
              <line
                id="ba1_height_line"
                x1={getObjectCoord(FIELD_OBJECT.Barrier1, "X")}
                y1={getObjectCoord(FIELD_OBJECT.Barrier1, "Y") + 3}
                x2={getObjectCoord(FIELD_OBJECT.Barrier1, "X")}
                y2={fieldData.height - rulerAreaHight}
                strokeWidth="2"
              ></line>
              <polygon id="ba1_height_arr_up" points={barrier1HArrowPts.up} />
              <polygon id="ba1_height_arr_dn" points={barrier1HArrowPts.down} />
              <rect
                id="ba1_height_label_box"
                strokeWidth="0"
                rx="5"
                x={getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 10}
                y={fieldData.height - rulerAreaHight - (barrier1Data.height / 2) * pxPerMeter - 10}
                width={40}
                height={20}
                fill="#BBBBBB"
              ></rect>
              <text
                className={"nts_ruler_dist_s_to_r_text"}
                x={getObjectCoord(FIELD_OBJECT.Barrier1, "X") + 30}
                y={fieldData.height - rulerAreaHight - (barrier1Data.height / 2) * pxPerMeter + 2}
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {barrier1Data.height.toFixed(1) + "m"}
              </text>
            </g>
            <g
              id="ba1_picker"
              className={"nts_ruler_line"}
              stroke="#000000"
              fill="#000000"
              strokeWidth="0"
              onMouseDown={onBarrier1PickerMouseDown}
              transform={ba1Transform}
            >
              {<circle cx="-4" cy="0" r="4" />}
              <g id="ba2_lable">
                <rect
                  x="15"
                  y="-10"
                  width={70}
                  height={20}
                  rx="5"
                  fill="#DDDDDD"
                  fillOpacity="80%"
                />
                <text
                  className={"nts_source_text"}
                  x="20"
                  y="2"
                  textAnchor="start"
                  alignmentBaseline="middle"
                >
                  BARRIER - 1
                </text>
              </g>
            </g>
          </g>
          <g id="ba2_area">
            <g
              id="ba2"
              className={"nts_ruler_line"}
              stroke="#000000"
              fill="#000000"
              strokeWidth="0"
              transform="matrix(1 0 0 1 0 0)"
            >
              <line
                id="ba2_line"
                x1={sourceData.fromLeft + barrier2Data.distFromSource * pxPerMeter}
                y1={fieldData.height - rulerAreaHight - barrier2Data.height * pxPerMeter}
                x2={sourceData.fromLeft + barrier2Data.distFromSource * pxPerMeter}
                y2={fieldData.height - rulerAreaHight}
                strokeWidth="4"
              ></line>
            </g>
            <g
              id="ba2_height_ruler"
              className={"nts_ruler_line"}
              stroke="#000000"
              fill="#000000"
              strokeWidth="0"
              transform="matrix(1 0 0 1 15 0)"
            >
              <line
                id="ba2_height_line"
                x1={sourceData.fromLeft + barrier2Data.distFromSource * pxPerMeter}
                y1={fieldData.height - rulerAreaHight - barrier2Data.height * pxPerMeter + 3}
                x2={sourceData.fromLeft + barrier2Data.distFromSource * pxPerMeter}
                y2={fieldData.height - rulerAreaHight}
                strokeWidth="2"
              ></line>
              <polygon id="ba2_height_arr_up" points={barrier2HArrowPts.up} />
              <polygon id="ba2_height_arr_dn" points={barrier2HArrowPts.down} />
              <rect
                id="ba2_height_label_box"
                strokeWidth="0"
                rx="5"
                x={sourceData.fromLeft + barrier2Data.distFromSource * pxPerMeter + 10}
                y={fieldData.height - rulerAreaHight - (barrier2Data.height / 2) * pxPerMeter - 10}
                width={40}
                height={20}
                fill="#BBBBBB"
              ></rect>
              <text
                id="ba2_height_label_text"
                className={"nts_ruler_dist_s_to_r_text"}
                x={sourceData.fromLeft + barrier2Data.distFromSource * pxPerMeter + 30}
                y={fieldData.height - rulerAreaHight - (barrier2Data.height / 2) * pxPerMeter + 2}
                textAnchor="middle"
                alignmentBaseline="middle"
              >
                {barrier2Data.height.toFixed(1) + "m"}
              </text>
            </g>
            <g
              id="ba2_picker"
              className={"nts_ruler_line"}
              stroke="#000000"
              fill="#000000"
              strokeWidth="0"
              onMouseDown={onBarrier2PickerMouseDown}
              transform={ba2Transform}
            >
              <circle cx="-4" cy="0" r="4" />
              <g id="ba2_lable">
                <rect
                  x="15"
                  y="-10"
                  width={70}
                  height={20}
                  rx="5"
                  fill="#DDDDDD"
                  fillOpacity="80%"
                />
                <text
                  className={"nts_source_text"}
                  x="20"
                  y="2"
                  textAnchor="start"
                  alignmentBaseline="middle"
                >
                  BARRIER - 2
                </text>
              </g>
            </g>
          </g>

          <g id="bd_height_ruler"></g>

          <g
            id="r_height_ruler"
            className={"nts_ruler_line"}
            stroke="#000000"
            fill="#000000"
            strokeWidth="0"
            transform="matrix(1 0 0 1 15 0)"
          >
            <line
              id="receiver_ruler"
              x1={sourceData.fromLeft * pxPerMeter + receiverData.distFromSource * pxPerMeter}
              y1={fieldData.height - rulerAreaHight - receiverData.height * pxPerMeter + 3}
              x2={sourceData.fromLeft * pxPerMeter + receiverData.distFromSource * pxPerMeter}
              y2={fieldData.height - rulerAreaHight}
              strokeWidth="2"
            ></line>
            <polygon id="s_height_arr_up" points={receiverHUpArrowPts} />
            <polygon id="s_height_arr_dn" points={receiverHDnArrowPts} />
            <rect
              strokeWidth="0"
              rx="5"
              x={sourceData.fromLeft * pxPerMeter + receiverData.distFromSource * pxPerMeter + 10}
              y={fieldData.height - rulerAreaHight - (receiverData.height / 2) * pxPerMeter - 10}
              width={40}
              height={20}
              fill="#BBBBBB"
            ></rect>
            <text
              className={"nts_ruler_dist_s_to_r_text"}
              x={sourceData.fromLeft * pxPerMeter + receiverData.distFromSource * pxPerMeter + 30}
              y={fieldData.height - rulerAreaHight - (receiverData.height / 2) * pxPerMeter + 2}
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {(Math.round(receiverData.height * 10) / 10).toString() + "m"}
            </text>
          </g>
          <g
            id="r_picker"
            className={"nts_ruler_line"}
            stroke="#000000"
            fill="#000000"
            strokeWidth="0"
            onMouseDown={onReceiverPickerMouseDown}
            transform={recvTransform}
          >
            <polygon id="r_picker_arr_up" points="0, -7, 0, 7, 7, 0" />
            <g id="r_lable">
              <rect x="15" y="-10" width={72} height={20} rx="5" fill="#AAAAAA" />
              <text
                className={"nts_source_text"}
                x="20"
                y="2"
                textAnchor="start"
                alignmentBaseline="middle"
              >
                RECEIVER
              </text>
            </g>
          </g>
          <g>
            <polyline points={linePathSToR} fill="none" stroke="black" strokeDasharray="5" />
          </g>
        </g>

        <g className={"nts_no_display"}>
          <text
            id="m1digit"
            className={"nts_swave_dist_text"}
            x={fieldData.width / 2}
            y="0"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            0m
          </text>
          <text
            id="m2digit"
            className={"nts_swave_dist_text"}
            x={fieldData.width / 2}
            y="0"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            00m
          </text>
          <text
            id="m3digit"
            className={"nts_swave_dist_text"}
            x={fieldData.width / 2}
            y="0"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            000m
          </text>
          <text
            id="dist1digit"
            className={"nts_ruler_dist_s_to_r_text"}
            x={fieldData.width / 2}
            y="5"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            0.0m
          </text>
          <text
            id="dist2digit"
            className={"nts_ruler_dist_s_to_r_text"}
            x={fieldData.width / 2}
            y="5"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            00.0m
          </text>
          <text
            id="dist3digit"
            className={"nts_ruler_dist_s_to_r_text"}
            x={fieldData.width / 2}
            y="5"
            textAnchor="middle"
            alignmentBaseline="middle"
          >
            000.0m
          </text>
        </g>
      </svg>
    </div>
  );
}
