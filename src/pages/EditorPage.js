import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import Client from "../components/Client";
import SecondaryButton from "../components/SecondaryButton";
import Editor from "../components/EditorComponent";
import { initSocket } from '../socket';
import ACTIONS from "../Actions";
import { useLocation, useNavigate, Navigate, useParams } from "react-router-dom";
import toast from 'react-hot-toast';

function EditorPage() {
    
    const socketRef = useRef(null);
    const location = useLocation();
    const reactNavigator = useNavigate();
    const { roomId } = useParams();
    const [clients, setClients] = useState([]);
    const codeRef = useRef(null);
    
    useEffect(()=>{
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                username: location.state?.username,
            });

            socketRef.current.on(ACTIONS.JOINED, ({username, clients, socketId}) => {
                if(username !== location.state?.username){
                    toast.success(`${username} joined the room`);
                    console.log(`${username} joined the room`);
                }
                setClients(clients);
                socketRef.current.emit(ACTIONS.SYNC_CODE, {
                    code: codeRef.current,
                    socketId,
                });
            });

            socketRef.current.on(
                ACTIONS.DISCONNECTED,
                ({ socketId, username }) => {
                    toast.success(`${username} left the room.`);
                    setClients((prev) => {
                        return prev.filter(
                            (client) => client.socketId !== socketId
                        );
                    });
                }
            );

        }
        init();
        return () => {
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
            socketRef.current.disconnect();
        };
    }, []);


    
    async function copyRoomId() {
        try {
            await navigator.clipboard.writeText(roomId);
            toast.success('Room ID copied to clipboard');
        } catch (err) {
            toast.error('Could not copy the Room ID');
            console.error(err);
        }
    }


    function leaveRoom() {
        reactNavigator('/');
    }
    
    if(!location.state){
        return <Navigate to="/" />
    }

    return (
        <>
            <div className="mainWrap min-h-screen flex">
                <div className="aside text-white w-[300px] bg-[#1c1e29] p-[16px]  flex flex-col justify-between border-r-2 border-[#424242] ">
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
                    <SecondaryButton text="Copy Room ID" onClick={copyRoomId} />
                    <Button text="Leave" onClick={leaveRoom} />
                </div>
                <div className="editorWrap w-full h-screen" >
                    <Editor 
                        socketRef={socketRef}
                        roomId={roomId}
                        onCodeChange={(code) => {
                            codeRef.current = code;
                        }}
                    />
                </div>
            </div>
        </>
    );
}

export default EditorPage;