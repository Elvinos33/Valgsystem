"use client";

export default function Login({setShowLogin, setShowCreateAccount}) {

    function handleOutsideClick() {
        setShowLogin(false)
    }
    function handleRegisterClick() {
        setShowCreateAccount(true)
        setShowLogin(false)
    }

    return (
        <div className="flex items-center justify-center">
            <div className=" bg-white rounded-md z-10">
                <form className={"flex flex-col gap-2 p-4"}>
                    <p className="text-center font-bold my-4 text-[20px]">Logg Inn</p>
                    <input type="text" placeholder={"E-post"} className="rounded-md h-10 p-2 bg-gray-100"/>
                    <input type="text" placeholder={"Passord"} className="rounded-md h-10 p-2 bg-gray-100"/>
                    <button className={"p-4 bg-slate-200 mt-4 rounded-md transition hover:bg-black hover:text-white"}>
                        Logg Inn
                    </button>
                </form>
                <div className="flex flex-col items-center text-[13px] pb-2">
                    <span>Har du ikke en bruker?</span>
                    <button onClick={handleRegisterClick} className={"font-bold hover:underline"}>Lag bruker</button>
                </div>
            </div>
            <div onClick={handleOutsideClick} className="absolute inset-0 bg bg-gray-500 opacity-50 z-0"></div>
        </div>
    )
}