import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import API from '../api';

function AddForm() {
    const token = useSelector((state) => state.auth.token);
    const [form, setForm] = useState({ title: "", description: "", category: "", Price: "", stocks: "" });
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const handleApply = async () => {
        try {
            const res = await API.post("/products/post")
        } catch (error) {
            
        }
    }

    return (
        <div className='p-8 min-h-screen'>
            <div className='mt-12 flex flex-col items-center gap-4'>
                <h1 className="hover:underline cursor-pointer font-bold text-2xl ">Add Product in our Market</h1>
                {/* {loading && <div className="flex text-3xl font-bold mt-20">Loading....</div>} */}
                <form onSubmit={handleApply} className='flex flex-col w-full max-w-lg shadow-black border p-8 rounded-lg shadow-sm '>

                    <label className='font-bold mb-2 text-black flex flex-col gap-2'>Product Title : <input type="text" placeholder='Product Title' value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className='input bg-slate-50 text-black shadow-sm shadow-black rounded-lg py-2 px-4 w-full' /></label>

                    <label className='font-bold mb-2 text-black flex flex-col gap-2'>Product Description : <input type="text" placeholder='Product Description' value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className='input bg-slate-50 text-black shadow-sm shadow-black rounded-lg py-2 px-4 w-full' /></label>

                    <label className='font-bold mb-2 text-black flex flex-col gap-2'>Product Category : <input type="text" placeholder='Product Category' value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className='input bg-slate-50 text-black shadow-sm shadow-black rounded-lg py-2 px-4 w-full' /></label>

                    <label className='font-bold mb-2 text-black flex flex-col gap-2'>Product Price : <input type="text" placeholder='Product Price' value={form.Price} onChange={(e) => setForm({ ...form, Price: e.target.value })} className='input bg-slate-50 text-black shadow-sm shadow-black rounded-lg py-2 px-4 w-full' /></label>

                    <label className='font-bold mb-2 text-black flex flex-col gap-2'>Product Stocks : <input type="text" placeholder='Product Stocks' value={form.stocks} onChange={(e) => setForm({ ...form, stocks: e.target.value })} className='input bg-slate-50 text-black shadow-sm shadow-black rounded-lg py-2 px-4 w-full' /></label>

                    <label className='font-bold mb-4 mt-2'>Image : <input type="file" name='image' accept='.jpeg, .jpg, .png' onChange={(e) => setFile(e.target.files[0])} /></label>

                    <button className='w-full bg-green-600 py-2 rounded-lg shadow-black shadow-md text-white font-semibold hover:bg-green-700'>Submit</button>


                </form>
            </div>
        </div>
    )
}

export default AddForm
