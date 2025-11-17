import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import API from '../api';
import { ArrowRight, ShoppingCartIcon } from 'lucide-react';
import { removeFromCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';


function Cart() {
    const [state, setState] = useState([]);
    const [image, setImage] = useState({});
    const [search, setSearch] = useState("");
    const cartProducts = useSelector((state) => state.cart.items)
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchImage = async () => {
            const temp = {};
            for (const p of cartProducts) {
                if (!p.imageUrl) continue;
                const filename = p.imageUrl.split("/").pop();
                const { data } = await API.get(`/products/image/${filename}`);
                temp[p._id] = data.fileURL
            }
            setImage(temp);
        }
        fetchImage();
    }, [cartProducts])
    useEffect(() => {
        setState(cartProducts);
    }, [cartProducts])
    const handleRemoveCart = (id) => {
        dispatch(removeFromCart(id))
    }
    const filtered = state.filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()));
    return (
        <div className='p-16 flex flex-col gap-4'>
            <div className='flex flex-row justify-between items-center'>
                <h1 className='text-3xl font-bold mt-4 mb-4 flex items-center gap-2'>My Cart <ShoppingCartIcon /></h1>
                <input type="search" className='border border-gray-800 w-60 h-10 rounded-lg p-4' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {
                state.length === 0 && <div className='flex items-center justify-center'>
                    <h1 className='text-3xl border border-gray-800 w-full max-w-4xl h-72 rounded-lg flex flex-col items-center justify-center font-bold'>Dear {user.name}, Your Cart is empty <span className='text-lg italic font-semibold'>Please add something in your cart to view it here.</span>
                        <button onClick={() => navigate('/dashboard')} className='text-lg px-4 py-1.5 border border-gray-700 rounded-lg mt-2 bg-green-600 hover:bg-green-700 text-white hover:scale-105 font-normal flex items-center gap-2'>View Products <ArrowRight /></button></h1>
                </div>
            }
            {
                state.length > 0 && (
                    filtered.length === 0 ? (
                        <div className='flex items-center justify-center'>
                            <h1 className='text-3xl border border-gray-800 w-full max-w-4xl h-72 rounded-lg flex flex-col items-center justify-center font-bold'>No items match your search "<span className='italic text-lg'>{search}</span>".
                                <button onClick={() => setSearch("")} className='text-lg px-4 py-1.5 border border-gray-700 rounded-lg mt-2 bg-green-600 hover:bg-green-700 text-white hover:scale-105 font-normal flex items-center gap-2'>Clear Search <ArrowRight /></button></h1>
                        </div>
                    ) : (
                        filtered.map((item) => (
                            <div key={item._id} className='flex flex-row gap-4 border border-gray-400 rounded-lg  items-center shadow-lg shadow-gray-300 hover:scale-105 transition duration-300 cursor-pointer'>
                                <img src={image[item._id]} alt="" />
                                <div className='pr-8'>
                                    <h2 className='font-bold'>Product :
                                        <span className='font-normal'> {item.title}</span> | Price: <span className='font-normal'>{item.price}</span>
                                    </h2>
                                    <p className='font-bold'>Details : <span className='font-normal'>{item.description}</span></p>
                                    <h2 className='font-bold'>Category : <span className='font-normal'>{item.category}</span></h2>
                                    <div className='flex flex-row gap-4 mt-4'>
                                        <button className='flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 hover:scale-105 transition duration-300'>Order Now <ArrowRight /></button>
                                        <button onClick={() => handleRemoveCart(item._id)} className='flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white hover:scale-105 transition duration-300'>Remove From Cart <ArrowRight /></button>
                                    </div>
                                </div>
                            </div>
                        )
                        )
                    )
                )
            }
        </div>
    )
}

export default Cart
