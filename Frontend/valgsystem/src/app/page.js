"use client";

import Image from 'next/image'
import Header from "@/components/Header";
import {useState, useEffect} from "react";
import Login from "@/components/Login";
import CreateAccount from "@/components/CreateAccount";
import makeRequest from "@/functions/makeRequest";
import VoteBox from "@/components/VoteBox";
import VotingOverlay from "@/components/VotingOverlay";

export default function Home() {

    const [showLogin, setShowLogin] = useState(false);
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [user, setUser] = useState([])
    const [loggedIn, setLoggedIn] = useState(false)
    const [voteData, setVoteData] = useState([])
    const [groups, setGroups] = useState([])
    const [showOverlay, setShowOverlay] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState('')
    const [candidatesForSelectedGroup, setCandidatesForSelectedGroup] = useState([])


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
        makeRequest('voting/results', 'GET')
            .then(response => response.json())
            .then(data => {
                setVoteData(data.candidates)

                const groups = Array.from(new Set(data.candidates.map(item => item.group)));
                setGroups(groups)
            })
    }, []);

    function handleVoteBoxClick(group, candidates) {
        setShowOverlay(true)
        setSelectedGroup(group)
        setCandidatesForSelectedGroup(candidates)
    }

  return (
    <main className="absolute inset-0 bg-celestialBlue overflow-hidden -z-50">
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
        { showOverlay &&
            <>
                <VotingOverlay user={user} group={selectedGroup} candidata={candidatesForSelectedGroup} setShowLogin={setShowLogin} loggedIn={loggedIn} setShowOverlay={setShowOverlay}/>
            </>
        }
      <div className="h-max w-screen flex flex-col z-0">
            <div className="flex mb-5">
                <p className="text-white font-extrabold text-[2rem] w-full text-center">PÅGÅENDE VALG</p>
            </div>
            <div className="flex justify-center overflow-y-scroll overflow-x-hidden">
                <div className="max-h-screen grid gap-5 md:grid-cols-2 lg:grid-cols-4 p-5 mb-80">
                    {groups.map((group, index) => {
                        const candidatesForGroup = voteData.filter(candidate => candidate.group === group);

                        return (
                            <VoteBox onClick={() => handleVoteBoxClick(group, candidatesForGroup)} key={index} group={group} candidata={candidatesForGroup} />
                        );
                })}

                </div>

            </div>
      </div>
    </main>
  )
}
