"use client";
import {useState, useEffect} from "react";
import BarChart from "@/components/BarGraph";
import makeRequest from "@/functions/makeRequest";

export default function VotingOverlay({setShowLogin, loggedIn, setShowOverlay, group, candidata, user}) {

    function handleOutsideClick() {
        setShowOverlay(false)
    }
    function handleLoginClick() {
        setShowLogin(true)
    }

    async function handleVoteClick(data) {
        const response = await makeRequest('voting/vote', "POST", data)
        const responseData = await response.json()

        if (responseData.success === true) {
            alert("Du har stemt!")
        } else {
            alert("Uventet feil har oppstått. Prøv igjen")
        }
    }



    return (
        <div className="flex items-start justify-center">
            <div className="absolute bg-white rounded-md z-30">
                <div className={"bg-white w-[60rem] h-[40rem] rounded-md flex flex-col gap-2 p-5"}>
                    <div className="">
                        <p className={"text-center font-extrabold text-[24px]"}>{group}</p>
                    </div>
                    <div className="flex h-full">
                        <div className="flex-1 h-full border-r">
                            <p className="text-center font-bold text-[20px]">RESULTATER</p>
                            <BarChart can1={"hello"} can2={"hello"} vote1={candidata[0].vote} vote2={candidata[1].vote}/>
                        </div>
                        <div className="flex-1 flex items-center justify-center">

                            {loggedIn ?(
                            <>
                                <div className="flex flex-col gap-20 w-full p-5">
                                    <div className={"flex justify-between items-center"}>
                                        <p className="text-[1.5rem] font-bold">{candidata[0].name}</p>
                                        <button onClick={() => handleVoteClick({"voter": user.id, "candidate": candidata[0].name})} className={"py-3 px-5 bg-slate-300 rounded-md text-gray-700 transition hover:bg-slate-600 hover:text-white"}>STEM</button>
                                    </div>
                                    <div className={"flex gap-10 justify-between items-center"}>
                                        <p className="text-[1.5rem] font-bold">{candidata[1].name}</p>
                                        <button onClick={() => handleVoteClick({"voter": user.id, "candidate": candidata[1].name})} className={"py-3 px-5 bg-slate-300 rounded-md text-gray-700 transition hover:bg-slate-600 hover:text-white"}>STEM</button>
                                    </div>
                                </div>
                            </>
                            ) : (
                            <>
                                <button onClick={handleLoginClick} className="bg-slate-300 text-gray-700 p-5 rounded-md font-bold transition hover:bg-slate-600 hover:text-white">Logg Inn For å Stemme</button>
                            </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={handleOutsideClick} className="absolute inset-0 bg bg-gray-500 opacity-50 z-10"></div>
        </div>
    )
}