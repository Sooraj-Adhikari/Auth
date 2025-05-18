import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


const Login = () => {

    const navigate = useNavigate();

    const [loginInfo, setLoginInfo] = useState({
        
        email: "",
        password:""
       
    })

    const handleChange = (e) => {

        const { name, value } = e.target;

        const copyLoginInfo = { ...loginInfo };

        copyLoginInfo[name] = value;

        setLoginInfo(copyLoginInfo)




    }

    const handleLogin = async (e) => {
        console.log(loginInfo);
        e.preventDefault();

        const {  email,password } = loginInfo;

        if (!password || !email) {

            return handleError("Please fill all the fields");
        }

        try {
            const url = "http://localhost:5000/auth/login";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)

            });

            const result = await response.json();
            const { message, success ,error ,name,jwtToken} = result;


            if (success) {

                handleSuccess(message);
                localStorage.setItem('token',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            }
            else if(error){
                handleError(error.details[0].message)
            }

            else if(!success){
                handleError(message);
                setLoginInfo(
                    {
                       
                        email: "",
                        password: ""
                    }
                )
            }


        } catch (error) {
            handleError(error);
        }
    }

    return (
        <div className='container'>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
               

                <div>
                    <label htmlFor="email">Email</label>
                    <input type='email' id='email' name='email' placeholder='Enter your email...' value={loginInfo.email} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' placeholder='Enter your password...' value={loginInfo.password} onChange={handleChange} />
                </div>

                <button>Login</button>

                <span>Do not have an account ?

                    <Link to="/signup" >SignUp</Link>

                </span>

            </form>
            <ToastContainer />

        </div>
    )
}

export default Login
