"use client";

import {useForm} from "react-hook-form";
import makeRequest from "@/functions/makeRequest";
import {useState, useEffect} from "react";

export default function Login({setShowLogin, setShowCreateAccount, setLoggedIn, setUser}) {


    const {register, handleSubmit, reset} = useForm();
    const [token, setToken] = useState('')

    async function onSubmit(data) {
        try {
            const response = await makeRequest("users/login", "POST", data);
            const responseData = await response.json();

            setLoggedIn(responseData.success)
            setToken(responseData.token);
            setUser(responseData.user)
        } catch (error) {
            console.error('Error fetching token: ', error);
        }
    }

    useEffect(() => {
        if (token) {
            // Token has been updated, you can use it now
            localStorage.setItem('jwtToken', token);
            console.log(token);
            reset(); // Reset after using the updated token
            setShowLogin(false)
        }

    }, [token]); // Run this effect whenever token changes


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
                <form onSubmit={handleSubmit(onSubmit)} className={"flex flex-col gap-2 p-4"}>
                    <p className="text-center font-bold my-4 text-[20px]">Logg Inn</p>
                    <input type="email" placeholder={"E-post"} {...register("email", {required: true})} className="rounded-md h-10 p-2 bg-gray-100"/>
                    <input type="password" placeholder={"Passord"} {...register("password", {required: true})} className="rounded-md h-10 p-2 bg-gray-100"/>
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