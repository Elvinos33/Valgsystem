"use client";
import {useState} from "react";
import {useForm} from "react-hook-form";
import BarChart from "@/components/BarGraph";
import makeRequest from "@/functions/makeRequest";
import {RiMailSendLine} from "react-icons/ri";

export default function VotingOverlay({setShowOverlay, group, candidata}) {

    const {register, handleSubmit, reset} = useForm()
    const [selectedCandidate, setSelectedCandidate] = useState('')

    function handleOutsideClick() {
        setShowOverlay(false)
    }

    function handleVoteClick(candidate) {
        setSelectedCandidate(candidate)
    }

    async function onSubmit(data){
        const groupAndCandidate = {group: group, candidate: selectedCandidate}
        const finalObject = Object.assign(data, groupAndCandidate)
        const response = await makeRequest('voting/vote', "POST", finalObject)
        const responseData = await response.json()


        if (responseData.success) {
            alert("Du har stemt!")
            reset()
            setSelectedCandidate('')
            setShowOverlay(false)
        } else if (responseData.access) {
            alert("Du har ikke tilgang til dette valget.")
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
                        <div className="flex-1 h-full flex flex-col border-r">
                            <p className="text-center font-bold text-[20px] pb-5">RESULTATER</p>
                            <div className={"flex h-full flex-col justify-end"}>
                                <BarChart can1={candidata[0].name} can2={candidata[1].name} vote1={candidata[0].vote} vote2={candidata[1].vote}/>
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className={"text-center font-bold text-[20px] pb-5"}>STEM</p>
                            <div className="flex flex-col gap-20 w-full p-5">
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between gap-4">
                                        <input type="text" placeholder={"Kode"} className={"p-5 px-10 bg-slate-100 rounded-md border"} {...register("key", {required: true})}/>
                                        <button disabled={!selectedCandidate} className={`py-5 text-white px-10 transition  ${selectedCandidate ? 'bg-celestialBlue hover:brightness-110' : 'bg-slate-300 opacity-70'} rounded-md`}><RiMailSendLine/></button>
                                    </form>
                                </div>
                                <div className={"flex flex-col gap-10 border p-5 rounded-md"}>
                                    <div className={"flex justify-between items-center"}>
                                        <p className="text-[20px]">{candidata[0].name}</p>
                                        <button onClick={() => handleVoteClick(candidata[0].name)} className={`p-1 rounded-md border`}>
                                            <div className={`transition p-4 ${selectedCandidate === candidata[0].name ? 'bg-celestialBlue' : 'bg-slate-100 hover:brightness-75'} rounded-full`}>

                                            </div>
                                        </button>
                                    </div>
                                    <div className={"flex gap-10 justify-between items-center"}>
                                        <p className="text-[20px]">{candidata[1].name}</p>
                                        <button onClick={() => handleVoteClick(candidata[1].name)} className={`p-1 rounded-md border`}>
                                            <div className={`transition p-4 ${selectedCandidate === candidata[1].name ? 'bg-celestialBlue' : 'bg-slate-100 hover:brightness-75'} rounded-full`}>

                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={handleOutsideClick} className="absolute inset-0 bg bg-gray-500 opacity-50 z-10"></div>
        </div>
    )
}
