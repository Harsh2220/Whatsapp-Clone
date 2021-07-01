import React from 'react';
import { auth, provider } from './Firebase';
import './Login.css';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {

    const [{ }, dispatch] = useStateValue("");

    const Login = () => {
        auth
            .signInWithPopup(provider)
            .then(results => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: results.user,
                });
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div className="login">
            <img src="http://pngimg.com/uploads/whatsapp/whatsapp_PNG18.png" alt="logo" />
            <button onClick={Login}>
                Log In With Google
            </button>
        </div>
    )
}

export default Login;
