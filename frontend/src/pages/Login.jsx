import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { loginSuccess } from '../features/authSlice';

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await API.post("/auth/login", form);
            dispatch(loginSuccess({ token: res.data.token, user: res.data.exists }));
            navigate('/dashboard');
        } catch (error) {
            console.error(error.message);
        }
    }
    const handleSignUp = () => {
        navigate('/signup');
    }
    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">
                    Login to Your Account
                </h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                    <button className='w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-800 transition-all'>Login</button>
                    <h3 className='text-center text-gray-600 text-sm mt-2'>Dont have an acc?<span onClick={handleSignUp} className="ml-1 text-gray-600 cursor-pointer hover:underline">Create an account</span></h3>
                </form>
            </div>
        </div>
    )
}

export default Login
