"use client";

import {useForm} from "react-hook-form";
import makeRequest from "@/functions/makeRequest";

export default function CreateAccount({setShowCreateAccount, setShowLogin}) {

    const {register, handleSubmit, reset} = useForm();

    function onSubmit(data) {
        if (data.password === data.confirmPassword) {
            makeRequest("users/register", "POST", data)
            reset()
            setShowCreateAccount(false)
            setShowLogin(true)
        } else {
            alert("Passwords do not match!")
        }

    }

    function handleOutsideClick() {
        setShowCreateAccount(false)
    }

    function handleLoginClick() {
        setShowCreateAccount(false)
        setShowLogin(true)
    }

    return (
        <div className="flex items-start justify-center">
            <div className="absolute bg-white rounded-md z-50">
                <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 p-4"}>
                    <p className="text-center font-bold my-4 text-[20px]">Lag en bruker</p>
                    <input type="email" placeholder={"E-post"} {...register("email", {required: true})} className="rounded-md h-10 p-2 bg-gray-100"/>
                    <input type="password" placeholder={"Passord"} {...register("password", {required: true})} className="rounded-md h-10 p-2 bg-gray-100"/>
                    <input type="password" placeholder={"Bekreft Passord"} {...register("confirmPassword", {required: true})} className="rounded-md h-10 p-2 bg-gray-100"/>
                    <button className={"p-4 bg-slate-200 mt-4 rounded-md transition hover:bg-slate-600 hover:text-white"}>
                        Registrer
                    </button>
                </form>
                <div className="flex flex-col items-center text-[13px] pb-2">
                    <span>Har du allerede en bruker?</span>
                    <button onClick={handleLoginClick} className={"font-bold hover:underline"}>Logg Inn</button>
                </div>
            </div>
            <div onClick={handleOutsideClick} className="absolute inset-0 bg bg-gray-500 opacity-50 z-40"></div>
        </div>
    )
}