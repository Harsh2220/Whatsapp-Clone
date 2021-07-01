import React, { useEffect, useState } from 'react';
import "./Sidebarchat.css";
import { Avatar } from '@material-ui/core';
import db from './Firebase';
import { Link } from 'react-router-dom';

function Sidebarchat({ id, name, addNewChat }) {

    const [messages, setMessages] = useState("");

    const createChat = () => {
        const roomName = prompt("Enter Name For Chat");

        if (roomName) {
            db.collection("rooms").add({
                name: roomName,
            })
        }
    }

    useEffect(() => {
        if (id) {
            db.collection("rooms").doc(id).collection("messages").orderBy("timestamp", "dec").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => {
                    return doc.data()
                }))
            })
        }
    }, [id])

    return (
        <>
            {!addNewChat ? (
                <Link to={`/rooms/${id}`}>
                    <div className="sidebarchat">
                        <Avatar />
                        <div className="sidebarchat_info">
                            <h2>{name}</h2>
                            <p>{messages[0]?.message}</p>
                        </div>
                    </div>
                </Link>
            ) : (
                <div className="sidebarchat" onClick={createChat}>
                    <h1>Add New chat</h1>
                </div>
            )}
        </>
    )
}

export default Sidebarchat;
