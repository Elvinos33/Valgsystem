import Login from "@/components/Login";

export default function Page() {
    return (
        <main className={"absolute inset-0 bg-celestialBlue"}>
            <div className={"max-w-screen h-screen flex items-center justify-center"}>
                <Login/>
            </div>
        </main>
    )
}