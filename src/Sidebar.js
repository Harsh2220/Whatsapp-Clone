import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import Sidebarchat from './Sidebarchat';
import db from './Firebase';
import { useStateValue } from './StateProvider';

function Sidebar() {

    const [{ user }, dispatch] = useStateValue("");
    const [rooms, setRooms] = useState("");

    useEffect(() => {
        const unsubscribe = db.collection("rooms").onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))
            )
        })

        return () => {
            unsubscribe();
        }

    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar_header">
                <Avatar src={user.photoURL} />
                <div className="sidebar_headerright">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>
            <div className="sidebar_search">
                <div className="sidebar_searchcontainer">
                    <SearchIcon />
                    <input type="text" placeholder="Search or start new chat" />
                </div>
            </div>
            <div className="sidebar_chats">
                <Sidebarchat addNewChat />
                {rooms && rooms.map(room => {
                    return (
                        <Sidebarchat key={room.id} id={room.id} name={room.data.name} />
                    )
                })}
            </div>
        </div>
    )
}

export default Sidebar;
