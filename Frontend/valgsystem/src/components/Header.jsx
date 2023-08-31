import Image from "next/image";

export default function Header() {

    return (
        <>
            <div className="max-w-screen py-5 px-10 flex flex-row justify-between items-center bg-slate-100 m-5 rounded-md shadow-md">
                <div className="flex items-center gap-2">
                    <Image src={"https://elvebakken.vgs.no/siteassets/logoer/logo222.png"} alt={"Elvebakken Logo"} width={50} height={50}/>
                    <p className={"font-extrabold text-[1.5rem] text-gray-700 hidden md:block"}>VALG</p>
                </div>

            </div>
        </>
    )
}