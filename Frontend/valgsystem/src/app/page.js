"use client";

import Image from 'next/image'
import Header from "@/components/Header";
import {useState, useEffect} from "react";
import Login from "@/components/Login";
import CreateAccount from "@/components/CreateAccount";
import makeRequest from "@/functions/makeRequest";
import {useRouter} from 'next/navigation'

export default function Home() {

    const [showLogin, setShowLogin] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [user, setUser] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)

    const router = useRouter()

    useEffect(() => {
        const storedJwtToken = localStorage.getItem('jwtToken');
        console.log(storedJwtToken);

        // Assuming makeRequest returns a promise that resolves to the response
        makeRequest('users/validate', 'POST', { token: storedJwtToken })
            .then(response => response.json())
            .then(data => {
                if (data.valid) {
                    // Token is valid, you can update your state or take other actions
                    console.log('Token is valid');
                    setUser(data)
                    setLoggedIn(true)
                } else {
                    // Token is not valid
                    console.log('Token is not valid');
                }
            })
            .catch(error => {
                // Handle error if the request fails
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        console.log(user)
    }, [user]);

  return (
    <main className="absolute inset-0 bg-celestialBlue">
        <header className="w-screen">
            <Header setShowLogin={setShowLogin} loggedIn={loggedIn} setShowCreateAccount={setShowCreateAccount} user={user}/>
        </header>
        { showLogin &&
            <>
                <Login setUser={setUser} setLoggedIn={setLoggedIn} setShowLogin={setShowLogin} setShowCreateAccount={setShowCreateAccount}/>
            </>
        }
        { showCreateAccount &&
            <>
                <CreateAccount setShowCreateAccount={setShowCreateAccount} setShowLogin={setShowLogin}/>
            </>
        }
      <div className="h-max w-screen z-0">
            <div className="flex">
                <p className="text-white font-extrabold text-[2rem] w-full text-center">PÅGÅENDE VALG</p>
            </div>
      </div>
    </main>
  )
}
