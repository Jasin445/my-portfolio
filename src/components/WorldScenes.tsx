"use client";

import { useEffect, type CSSProperties } from "react";

type Kind = "dev" | "ops" | "repair" | "robot" | "lab" | "network";
type Prop = { kind: Kind; x: string; size: number; side: "left" | "right" | "center" };

const WORLDS: Record<string, Prop[][]> = {
  home: [
    [{ kind: "dev", x: "20%", size: 270, side: "left" }, { kind: "network", x: "80%", size: 250, side: "right" }],
    [{ kind: "robot", x: "82%", size: 260, side: "right" }, { kind: "lab", x: "50%", size: 220, side: "center" }],
    [{ kind: "ops", x: "20%", size: 280, side: "left" }, { kind: "dev", x: "80%", size: 250, side: "right" }],
    [{ kind: "repair", x: "80%", size: 270, side: "right" }, { kind: "robot", x: "20%", size: 245, side: "left" }],
    [{ kind: "network", x: "20%", size: 250, side: "left" }, { kind: "lab", x: "80%", size: 270, side: "right" }],
  ],
  projects: [
    [{ kind: "dev", x: "18%", size: 270, side: "left" }, { kind: "robot", x: "82%", size: 250, side: "right" }],
    [{ kind: "lab", x: "82%", size: 270, side: "right" }, { kind: "network", x: "50%", size: 220, side: "center" }],
    [{ kind: "ops", x: "18%", size: 280, side: "left" }, { kind: "repair", x: "82%", size: 250, side: "right" }],
    [{ kind: "robot", x: "18%", size: 250, side: "left" }, { kind: "dev", x: "82%", size: 270, side: "right" }],
  ],
  about: [
    [{ kind: "repair", x: "82%", size: 270, side: "right" }, { kind: "dev", x: "18%", size: 250, side: "left" }],
    [{ kind: "ops", x: "18%", size: 280, side: "left" }, { kind: "lab", x: "82%", size: 250, side: "right" }],
    [{ kind: "network", x: "82%", size: 260, side: "right" }, { kind: "robot", x: "50%", size: 230, side: "center" }],
    [{ kind: "dev", x: "18%", size: 250, side: "left" }, { kind: "repair", x: "82%", size: 270, side: "right" }],
  ],
  articles: [
    [{ kind: "dev", x: "18%", size: 260, side: "left" }, { kind: "lab", x: "82%", size: 250, side: "right" }],
    [{ kind: "network", x: "82%", size: 270, side: "right" }, { kind: "robot", x: "18%", size: 245, side: "left" }],
    [{ kind: "ops", x: "18%", size: 270, side: "left" }, { kind: "repair", x: "82%", size: 250, side: "right" }],
    [{ kind: "lab", x: "18%", size: 260, side: "left" }, { kind: "dev", x: "82%", size: 260, side: "right" }],
  ],
  contact: [
    [{ kind: "ops", x: "82%", size: 280, side: "right" }, { kind: "network", x: "18%", size: 245, side: "left" }],
    [{ kind: "repair", x: "18%", size: 270, side: "left" }, { kind: "lab", x: "82%", size: 250, side: "right" }],
    [{ kind: "dev", x: "82%", size: 260, side: "right" }, { kind: "robot", x: "18%", size: 250, side: "left" }],
  ],
};

function IsometricScene({ kind }: { kind: Kind }) {
  return <svg viewBox="0 0 240 190" className="world-art" aria-hidden="true">
    <defs>
      <linearGradient id="deck-top" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#28617a"/><stop offset=".55" stopColor="#16394d"/><stop offset="1" stopColor="#0a202e"/></linearGradient>
      <linearGradient id="deck-side" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#164359"/><stop offset="1" stopColor="#07151f"/></linearGradient>
      <linearGradient id="deck-edge" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#53dcff"/><stop offset="1" stopColor="#0874a0"/></linearGradient>
      <linearGradient id="jacket-volume" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#42c9ee"/><stop offset=".45" stopColor="#087ca6"/><stop offset="1" stopColor="#063956"/></linearGradient>
      <linearGradient id="skin-volume" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f2c09a"/><stop offset=".55" stopColor="#bd815e"/><stop offset="1" stopColor="#754a3d"/></linearGradient>
      <linearGradient id="workwear-volume" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#ffd174"/><stop offset=".5" stopColor="#c48442"/><stop offset="1" stopColor="#754528"/></linearGradient>
    </defs>
    <ellipse cx="120" cy="166" rx="105" ry="17" fill="#00111a" opacity=".78" />
    <path d="m15 145 99-48 111 38v13l-103 49-107-40z" fill="url(#deck-side)" stroke="#092333" strokeWidth="2" />
    <path d="m225 135-103 48v14l103-49z" fill="#0a1b27" stroke="#12364a" />
    <path d="m15 145 107 38v14L15 159z" fill="#123244" stroke="#1a526a" />
    <path d="m15 145 99-48 111 38-103 48z" fill="url(#deck-top)" stroke="url(#deck-edge)" strokeWidth="2" />
    <path d="m29 145 85-41 94 33-85 41z" fill="none" stroke="#61dcff" strokeOpacity=".2" strokeDasharray="4 5" />
    <path d="m18 157 104 37 101-48" fill="none" stroke="#4bd5ff" strokeOpacity=".8" strokeWidth="2" />
    {(kind === "ops" || kind === "network") && <g className="world-machine">
      <path d="m142 28 47 19v83l-47-20z" fill="#17445b" stroke="#5bd8ff" strokeWidth="2" />
      <path d="m98 47 44-19v82l-44 20z" fill="#0c2330" stroke="#2496c2" strokeWidth="2" />
      <path d="m98 47 47 19 44-19-47-19z" fill="#23617a" stroke="#62dcff" strokeWidth="2" />
      {[0, 1, 2].map(i => <g key={i}>
        <path d={`m107 ${62 + i * 22} 29-13v13l-29 13z`} fill="#123347" stroke="#328caf" />
        <path d={`m150 ${46 + i * 22} 28 11v12l-28-11z`} fill="#102d3c" stroke="#317e9c" />
        <circle cx="132" cy={61 + i * 22} r="2.3" fill={i === 1 ? "#d7ff63" : "#39d5ff"} className="world-light" />
      </g>)}
      {kind === "ops" && <g className="world-person">
        <path d="m46 108 2-20q9-11 21-5l10 17-2 26-27 2z" fill="url(#jacket-volume)" stroke="#5bd8ff" strokeWidth="1.5" />
        <path d="m48 89 13 9 17-7 4 7-21 12-16-8z" fill="#064667" />
        <path d="m51 124-5 18m22-18 9 17" stroke="#d7ff63" strokeWidth="7" strokeLinecap="round" />
        <path d="m54 82-2-12q2-12 13-12 12 1 13 13l-7 12z" fill="url(#skin-volume)" />
        <path d="m52 71q1-16 14-16 11 1 13 11l-8-3-17 9z" fill="#172a34" />
        <path d="m74 89 20-9 4 5-19 13" fill="none" stroke="#bd815e" strokeWidth="6" strokeLinecap="round" />
        <path d="m54 67 22 2-2 7-19-1z" fill="#d7ff63" />
      </g>}
      {kind === "network" && <path d="m70 79 27-10m-27 10v29m97-5 25 9m-25-9 1-27" fill="none" stroke="#d7ff63" strokeWidth="1.5" strokeDasharray="3 3" className="world-data-line" />}
    </g>}
    {kind === "dev" && <g className="world-person">
      <path d="m49 105 49-24 53 18-49 25z" fill="#0b1b25" stroke="#55d5ff" strokeWidth="2" />
      <path d="m91 80 27-13 25 9-27 14z" fill="#102a39" stroke="#d7ff63" strokeWidth="2" />
      <path d="m116 90 27-14v22l-27 14z" fill="#17506a" stroke="#49cfff" />
      <path d="m80 82-3-18q2-14 17-15 15 2 16 17l-6 14z" fill="url(#skin-volume)" />
      <path d="m96 51q10 3 11 14l-5 17-7 4 5-14-3-10z" fill="#754a3d" opacity=".7" />
      <path d="m88 66 3-1m9 0 2 1m-7 2-2 5 4 1m-5 4q4 2 8 0" fill="none" stroke="#51372f" strokeWidth="1.5" strokeLinecap="round" />
      <path d="m72 104 3-22q14-13 31-1l15 25-23 13z" fill="url(#jacket-volume)" stroke="#55d5ff" />
      <path d="m105 81 10 10 6 15-12 7z" fill="#064667" opacity=".8" />
      <path d="m74 87-14 18m42-21 17 14" stroke="#bd815e" strokeWidth="7" strokeLinecap="round" />
      <path d="m82 115-4 20m22-10 13 12" stroke="#d7ff63" strokeWidth="8" strokeLinecap="round" />
      <path d="m72 61q2-19 21-18 12 2 13 12l-9-5-20 8z" fill="#15232c" />
      <path d="m69 135 12 3m29 1 12 3" stroke="#49cfff" strokeWidth="3" />
    </g>}
    {kind === "repair" && <g className="world-person">
      <path d="m38 121 58-29 74 25-59 31z" fill="#0c1d28" stroke="#55d5ff" strokeWidth="2" />
      <path d="m70 105 33-16 35 12-34 17z" fill="#163c4f" stroke="#47caff" />
      <path d="m86 106 16-8 18 6-17 9z" fill="#d7ff63" />
      <path d="m114 76-3-14q2-13 14-14 13 2 14 15l-8 15z" fill="url(#skin-volume)" />
      <path d="m104 99 4-17q13-11 29-2l11 27-25 14z" fill="url(#workwear-volume)" stroke="#ffd174" />
      <path d="m137 80 10 27-25 14 2-11z" fill="#754528" opacity=".75" />
      <path d="m109 84-16 16m40-17 17 15" stroke="#d9a17e" strokeWidth="7" strokeLinecap="round" />
      <path d="m93 100 10-9 7 5-9 11m44-5 8-10 6 5-9 13" fill="none" stroke="#d7ff63" strokeWidth="3" />
      <path d="m116 115-9 18m26-12 6 17" stroke="#d7ff63" strokeWidth="8" strokeLinecap="round" />
      <path d="m110 61q0-18 16-19 13 2 15 14l-9-6-18 7z" fill="#24333b" />
    </g>}
    {kind === "robot" && <g className="world-person">
      <path d="m57 131 49-24 63 22-51 25z" fill="#0b1b25" stroke="#40caff" />
      <path d="M91 56h48v54H91z" rx="8" fill="#147398" stroke="#65e3ff" strokeWidth="3" />
      <path d="m99 70 13 2m12-2 9-2" stroke="#d7ff63" strokeWidth="5" strokeLinecap="round" />
      <path d="m115 56 0-12m-8 0h17" stroke="#55d5ff" strokeWidth="3" />
      <path d="m91 70-23 21 2 21m69-42 20 10 10-15m-55 18-10 25m31-25 12 25" fill="none" stroke="#39b6de" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m68 110 7 7m94-72 7 6" stroke="#d7ff63" strokeWidth="4" strokeLinecap="round" />
    </g>}
    {kind === "lab" && <g className="world-person">
      <path d="m64 99 45-22 58 20-45 24z" fill="#0a202d" stroke="#48cfff" strokeWidth="2" />
      <path d="m103 76 26-13 31 11-27 14z" fill="#163d51" stroke="#58d8ff" />
      <path d="m108 76 18-9 21 8-18 9z" fill="#d7ff63" opacity=".8" />
      <path d="m88 83-2-17q3-14 17-14 14 2 15 16l-7 14z" fill="url(#skin-volume)" />
      <path d="m80 107 4-21q15-11 31-1l13 25-26 14z" fill="#7657a6" stroke="#c49aff" />
      <path d="m115 84 13 26-26 14 2-13z" fill="#443564" opacity=".82" />
      <path d="m86 90-13 13m37-16 15 12" stroke="#cf9671" strokeWidth="7" strokeLinecap="round" />
      <path d="m89 119-5 17m21-9 12 13" stroke="#d7ff63" strokeWidth="8" strokeLinecap="round" />
      <circle cx="154" cy="54" r="13" fill="#153b4d" stroke="#4bd3ff" strokeWidth="2" />
      <path d="m148 55 5-7 6 8-6 6z" fill="#d7ff63" />
    </g>}
    {kind === "network" && <g fill="none" stroke="#d7ff63" strokeOpacity=".8" strokeWidth="1.5">
      <path d="m49 66 20-12 20 12-20 12zM69 78v19m20-31v20m-40-20v19m20 0-20 12 20 12 20-12-20-12z" />
      <circle cx="69" cy="54" r="3" fill="#d7ff63"/><circle cx="49" cy="66" r="3" fill="#39d5ff"/><circle cx="89" cy="66" r="3" fill="#39d5ff"/>
    </g>}
    <path d="m22 150 18 7m157-5 19 5" stroke="#d7ff63" strokeOpacity=".75" strokeWidth="2" />
  </svg>;
}

export default function WorldScenes({ page }: { page: keyof typeof WORLDS }) {
  const props = WORLDS[page].flat().slice(0, 5);
  const sides: Prop["side"][] = ["left", "right", "center", "left", "right"];

  useEffect(() => {
    window.dispatchEvent(new Event("scroll"));
  }, [page]);

  return <div className="world-scene-layer" aria-hidden="true">
    <div className="world-scene-track">
      {props.map((prop, index) => {
        const side = sides[index];
        const left = side === "left" ? "36%" : side === "right" ? "64%" : "50%";
        return <div key={`${prop.kind}-${index}`} className={`world-prop world-prop--${side} world-prop--${prop.kind}`} data-side={side} style={{ left, top: `${-190 + index * 55}px`, width: `min(${prop.size}px, max(150px, 28vw))`, "--scene-depth": .5 + index * .1 } as CSSProperties}>
          <IsometricScene kind={prop.kind} />
        </div>;
      })}
    </div>
  </div>;
}
