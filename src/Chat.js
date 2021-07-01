import { React, useEffect, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from './Firebase';
import { useStateValue } from './StateProvider';
import firebase from 'firebase';

function Chat() {

    const { roomId } = useParams();
    const [input, setInput] = useState("");
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState("");
    const [{ user }, dispatch] = useStateValue("");

    useEffect(() => {

        if (roomId) {

            db.collection("rooms").doc(roomId).onSnapshot(snapshot =>
                setRoomName(snapshot.data().name)
            )

            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => {
                    return doc.data();
                }))
            })

        }

    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        console.log("SENT", input);

        db.collection("rooms").doc(roomId).collection("messages").add({
            name: user.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput("");
    }

    return (
        <div className="chat">

            <div className="chat_header">
                <Avatar />
                <div className="chat_headerinfo">
                    <h3>{roomName}</h3>
                    <p>Last seen at {" "}
                        {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
                    </p>
                </div>
                <div className="chat_headerright">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {messages && messages.map(message => {
                    return (
                        <p className={`chat_message ${message.name === user.displayName && "chat_receiver"}`}>
                            <span className="chat_name">{message.name}</span>
                            {message.message}
                            <span className="chat_time">{new Date(message.timestamp?.toDate()).toUTCString()}</span>
                        </p>
                    )
                })}
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <AttachFile />
                <form>
                    <input type="text" placeholder="Type a message" value={input} onChange={(e) => setInput(e.target.value)} />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <Mic />
            </div>

        </div>
    )
}

export default Chat;
