"use client";

import Image from 'next/image'
import Header from "@/components/Header";
import {useState} from "react";
import Login from "@/components/Login";
import CreateAccount from "@/components/CreateAccount";

export default function Home() {

    const [showLogin, setShowLogin] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);

  return (
    <main className="absolute inset-0 bg-celestialBlue">
        <header className="w-screen">
            <Header setShowLogin={setShowLogin} setShowCreateAccount={setShowCreateAccount}/>
        </header>
        { showLogin &&
            <>
                <Login setShowLogin={setShowLogin} setShowCreateAccount={setShowCreateAccount}/>
            </>
        }
        { showCreateAccount &&
            <>
                <CreateAccount setShowCreateAccount={setShowCreateAccount} setShowLogin={setShowLogin}/>
            </>
        }
      <div className="h-max w-screen">

      </div>
    </main>
  )
}
