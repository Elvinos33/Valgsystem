import Image from "next/image";

export default function Header({setShowLogin, setShowCreateAccount, loggedIn}) {

    function handleRegisterClick() {
        setShowCreateAccount(true);
    }
    function handleLoginClick() {
        setShowLogin(true);
    }

    return (
        <>
            <div className="max-w-screen py-5 px-10 flex flex-row justify-between items-center bg-slate-100 m-5 rounded-md shadow-md">
                <div className="flex items-center gap-2">
                    <Image src={"https://elvebakken.vgs.no/siteassets/logoer/logo222.png"} alt={"Elvebakken Logo"} width={50} height={50}/>
                    <p className={"font-extrabold text-[1.5rem] text-gray-700 hidden md:block"}>VALG</p>
                </div>
                {!loggedIn &&
                    <div className="flex gap-4">
                        <button onClick={handleLoginClick} className="font-extrabold text-gray-700 transition border-celestialBlue hover:border-b-[3px] hover:text-black">Logg Inn</button>
                        <div className="w-[4px] bg-prussianBlue rounded-md">
                        </div>
                        <button onClick={handleRegisterClick} className="font-extrabold text-gray-700 transition border-celestialBlue hover:border-b-[3px] hover:text-black">Registrer</button>
                    </div>
                }
            </div>
        </>
    )
}