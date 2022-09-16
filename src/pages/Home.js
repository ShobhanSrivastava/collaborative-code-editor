import { useState } from 'react';
import Button from "../components/Button";
import { v4 as uuid } from 'uuid';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState("");

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuid();
        setRoomId(id);
        toast.success("New Room Created");
    }

    const [username, setUsername] = useState("");

    const joinRoom = () => {
        if (!roomId && !username) {
            toast.error("Room ID and Username are required")
        }
        else if (!roomId) {
            toast.error("Room ID required");
        }
        else if (!username) {
            toast.error("Username required");
        }
        else{
            //Redirect to the room
            navigate(`/editor/${roomId}`, {
                state: {
                    username
                }
            })
        }
    }

    const handleEnter = (e) => {
        if(e.code === 'Enter'){
            joinRoom();
        }
    }

    return (
        <>
            <div className="w-screen h-screen flex flex-col items-center justify-center text-white">
                <div className="joinWrapper w-[30%] h-fit bg-[#282a36] px-10 py-6 rounded-lg flex flex-col items-center justify-center text-center">
                    <img src="logo.png" width="300px" />
                    <p className="text-md mt-3 mb-2">Paste Room invitation ID to join</p>
                    <div className="formGroup w-full flex flex-col">
                        <input 
                            className="rounded-sm mb-2 text-md py-1 px-2 text-black"
                            type="text"
                            name="roomId"
                            placeholder="Room ID"
                            value={roomId}
                            onChange={(e) => setRoomId(e.target.value)}
                            onKeyUp={handleEnter}>
                        </input>
                        <input
                            className="rounded-sm mb-2 text-md py-1 px-2 text-black"
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            onKeyUp={handleEnter}>
                        </input>
                        <Button onClick={joinRoom} text="Join"/>
                    </div>
                    <a className="text-[#73F340]" onClick={createNewRoom}>Create a room</a>
                </div>
                <p className="fixed bottom-0 mb-3">Made with 💛 by <a href="https://www.linkedin.com/in/ShobhanSrivastava" className="text-[#73F340]">Shobhan Srivastava</a></p>
            </div>
        </>
    );
}

export default Home;