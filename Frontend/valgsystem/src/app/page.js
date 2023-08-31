"use client";
import Header from "@/components/Header";
import {useState, useEffect} from "react";
import makeRequest from "@/functions/makeRequest";
import VoteBox from "@/components/VoteBox";
import VotingOverlay from "@/components/VotingOverlay";

export default function Home() {

    const [voteData, setVoteData] = useState([])
    const [groups, setGroups] = useState([])
    const [showOverlay, setShowOverlay] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState('')
    const [candidatesForSelectedGroup, setCandidatesForSelectedGroup] = useState([])


    useEffect(() => {
        makeRequest('voting/results', 'GET')
            .then(response => response.json())
            .then(data => {
                setVoteData(data.candidates)

                setGroups(data.groups)
            })
    }, []);

    useEffect(() => {
        console.log(voteData)
    }, [voteData]);

    function handleVoteBoxClick(group, candidates) {
        setShowOverlay(true)
        setSelectedGroup(group)
        setCandidatesForSelectedGroup(candidates)
    }

  return (
    <main className="absolute inset-0 bg-celestialBlue overflow-hidden -z-50">
        <header className="w-screen">
            <Header/>
        </header>
        { showOverlay &&
            <>
                <VotingOverlay group={selectedGroup} candidata={candidatesForSelectedGroup} setShowOverlay={setShowOverlay}/>
            </>
        }
      <div className="h-max w-screen flex flex-col z-0">
            <div className="flex mb-5">
                <p className="text-white font-extrabold text-[2rem] w-full text-center">PÅGÅENDE VALG</p>
            </div>
            <div className="flex justify-center overflow-y-scroll overflow-x-hidden">
                <div className="max-h-screen grid gap-5 md:grid-cols-2 lg:grid-cols-4 p-5 mb-80">
                    {groups.map((group, index) => {
                        const candidatesForGroup = voteData.filter(candidate => candidate.group === group.name);

                        return (
                            <VoteBox onClick={() => handleVoteBoxClick(group.name, candidatesForGroup)} key={index} group={group.name} candidata={candidatesForGroup} />
                        );
                })}

                </div>

            </div>
      </div>
    </main>
  )
}
