import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
    }
    const handleSignUp = () => {

    }
    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='enter your email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=''
                />
                <input
                    type="text"
                    placeholder='enter the strong password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=''
                />
                <button>SignUp</button>
                <h3>Dont have an acc!<span onClick={handleSignUp}>Create an account</span></h3>
            </form>
        </div>
    )
}

export default Login
