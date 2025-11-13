import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    // const [msg,setMsg]  = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    const handleLogin = () => {
        navigate("/")
    }
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <h2 className="text-3xl font-bold mb-6 text-start text-gray-700">
                    Create Your Account
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder='enter your name'
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600'
                    />
                    <input
                        type="text"
                        placeholder='enter your email'
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600'
                    />
                    <input
                        type="text"
                        placeholder='enter the strong password'
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        className='w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-600'
                    />
                    <button className='w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all'>SignUp</button>
                    <h3 className='text-center text-gray-600 text-sm mt-2'>Already have an account!<span onClick={handleLogin} className="ml-1 text-gray-600 cursor-pointer hover:underline">Login here</span></h3>
                </form>
            </div>
        </div>
    )
}

export default SignUp;
