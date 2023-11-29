import React, { useState } from 'react'
import './Login.scss'
import { axiosClient } from '../../utils/axiosClient'
import { Link, useNavigate } from "react-router-dom";
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosClient.post('/auth/login', {
                email: email,
                password: password
            })
            const data = response.data;
            console.log(data);
            if(data.status === 'ok'){
                setItem(KEY_ACCESS_TOKEN, data.result);
                navigate('/');
            }
            else{
                console.log('failed', data.result);
            }
        } catch (error) {
            console.log('login failed ', error);
        }
    }
    return (
        <div className="Login">
            <div className="login-box">
                <h2 className="heading">Login</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        className="email"
                        id="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        className="password"
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <input type="submit" className="submit" />
                </form>
                <p className="subheading">
                    Do not have an account? <Link to="/signup">Sign Up</Link>
                </p>
            </div>
        </div>
    )
}

export default Login