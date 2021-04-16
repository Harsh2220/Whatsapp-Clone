import { React, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@material-ui/icons';

function Chat() {

    const [input, Setinput] = useState("");

    const sendMessage = (e) => {
        e.preventdefault();
        console.log("SENT",input);
    }

    return (
        <div className="chat">

            <div className="chat_header">
                <Avatar />
                <div className="chat_headerinfo">
                    <h3>Name</h3>
                    <p>Last seen</p>
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
                <div className="chat_message chat_receiver">
                    <span className="chat_name">Harsh</span>
                     Hello
                     <span className="chat_time">3:52 PM</span>
                </div>
            </div>

            <div className="chat_footer">
                <InsertEmoticon />
                <AttachFile/>
                <form>
                    <input type="text" placeholder="Type a message" value={input} onChange={(e) => Setinput(e.target.value)} />
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <Mic />
            </div>

        </div>
    )
}

export default Chat;
