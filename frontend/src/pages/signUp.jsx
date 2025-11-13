import React,{useState} from 'react'

function SignUp() {
const [form,setForm] = useState({name: "", email: "", password: ""});
const  [msg,setMsg]  = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleLogin = () => {

    }
    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder='enter your name'
                    value={form.name}
                    onChange={(e) => setForm({...form, name: e.target.value})}
                    className=''
                />
                <input
                    type="text"
                    placeholder='enter your email'
                    value={form.email}
                    onChange={(e) => setForm({...form, email: e.target.value})}
                    className=''
                />
                <input
                    type="text"
                    placeholder='enter the strong password'
                    value={form.password}
                    onChange={(e) => setForm({...form, password: e.target.value})}
                    className=''
                />
                <button>SignUp</button>
                <h3>Already have a account? <span onClick={handleLogin}>Login</span></h3>
            </form>
        </div>
    )
}

export default SignUp;
