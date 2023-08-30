"use client";

import BarGraph from "@/components/BarGraph";
import LineChart from "@/components/BarGraph";

export default function VoteBox() {

    return (
        <button className="bg-white w-[22rem] h-[15rem] z-20 rounded-md transition hover:scale-105 overflow-hidden">
            <div className="w-full h-full p-3 flex flex-col">
                <div className="flex-col flex">
                    <p className={"text-start font-extrabold opacity-70 text-[14px]"}>Tillitsvalgt</p>
                    <p className={"text-start font-extrabold text-[20px]"}>2IMIT</p>
                </div>
                <LineChart/>
            </div>
        </button>
    )
}