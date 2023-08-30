"use client";

import VoteBox from "@/components/VoteBox";

export default function Page() {
    return (
        <main className={"absolute inset-0 bg-celestialBlue"}>
            <div className={"max-w-screen h-screen flex items-center justify-center"}>
                <VoteBox group={"2IMIT"}/>
            </div>
        </main>
    )
}