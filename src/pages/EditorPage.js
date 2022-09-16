import { useState } from "react";
import Button from "../components/Button";
import Client from "../components/Client";
import SecondaryButton from "../components/SecondaryButton";
import Editor from "../components/Editor";

function EditorPage() {

    const [clients, setClients] = useState([
        {socketId: 1, username: "Shobhan S"},
        {socketId: 2, username: "Abhishek S"},
        {socketId: 3, username: "Hamza S"},
    ]);

    return (
        <>
            <div className="mainWrap min-h-screen flex">
                <div className="aside text-white w-[300px] bg-[#1c1e29] p-[16px]  flex flex-col justify-between  border-2 border-white">
                    <div className="aside-inner h-full">
                        <div className="logo">
                            <img className="border-b-2 border-[#424242] mb-2 pb-2" src="/logo.png" width="300px" />
                        </div>

                        <p className="mb-3">Connected</p>

                        <div className="clientsList flex flex-wrap items-center gap-[20px]">
                            {
                                clients.map(client => <Client username={client.username} id={client.socketId}/>)
                            }
                        </div>

                    </div>
                    <SecondaryButton text="Copy Room ID" onClick={()=>{}} />
                    <Button text="Leave" onClick={()=>{}} />
                </div>
                <div className="editorWrap"><Editor /></div>
            </div>
        </>
    );
}

export default EditorPage;