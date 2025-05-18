import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';


const SignUp = () => {

    const navigate = useNavigate();

    const [signupInfo, setSignupInfo] = useState({
        name: "",
        email: "",
        password: ""
    })

    const handleChange = (e) => {

        const { name, value } = e.target;

        const copySignupInfo = { ...signupInfo };

        copySignupInfo[name] = value;

        setSignupInfo(copySignupInfo)




    }

    const handleSignup = async (e) => {
        console.log(signupInfo);
        e.preventDefault();

        const { name, email, password } = signupInfo;

        if (!name || !email || !password) {

            return handleError("Please fill all the fields");
        }

        try {
            const url = "http://localhost:5000/auth/signup";

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signupInfo)

            });

            const result = await response.json();
            const { message, success ,error } = result;


            if (success) {

                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            }
            else if(error){
                handleError(error.details[0].message)
            }

            else if(!success){
                handleError(message);
                setSignupInfo(
                    {
                        name: "",
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
            <h1>SignUp</h1>
            <form onSubmit={handleSignup}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' name='name' placeholder='Enter your name...' value={signupInfo.name} autoFocus onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input type='email' id='email' name='email' placeholder='Enter your email...' value={signupInfo.email} onChange={handleChange} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' placeholder='Enter your password...' value={signupInfo.password} onChange={handleChange} />
                </div>

                <button>SignUp</button>

                <span>Already have an account ?

                    <Link to="/login" >Login</Link>

                </span>

            </form>
            <ToastContainer />

        </div>
    )
}

export default SignUp
