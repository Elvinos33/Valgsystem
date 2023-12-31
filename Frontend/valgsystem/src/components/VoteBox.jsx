import BarChart from "@/components/BarGraph";

export default function VoteBox({group, candidata, onClick }) {

    return (
        <button onClick={onClick} className="shadow-md bg-white w-[20rem] h-[15rem] rounded-md transition hover:scale-105 overflow-hidden z-0">
            <div className="w-full h-full p-3 flex flex-col">
                <div className="flex-col flex">
                    <p className={"text-start font-extrabold opacity-70 text-[14px]"}>Tillitsvalgt</p>
                    <p className={"text-start font-extrabold text-[20px]"}>{group}</p>
                </div>
                <BarChart vote1={candidata[0].vote} vote2={candidata[1].vote} can1={candidata[0].name} can2={candidata[1].name}/>
            </div>
        </button>
    )
}