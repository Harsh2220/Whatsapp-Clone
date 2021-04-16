import React from 'react';
import "./Sidebarchat.css";
import { Avatar } from '@material-ui/core';

function Siddebarchat() {
    return (
        <div className="sidebarchat">
            <Avatar />
            <div className="sidebarchat_info">
                <h2>Name</h2>
                <p>last seen</p>
            </div>
        </div>
    )
}

export default Siddebarchat;
