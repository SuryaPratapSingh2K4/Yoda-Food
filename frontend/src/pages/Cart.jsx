import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import API from '../api';
import { ArrowRight, ShoppingCartIcon } from 'lucide-react';
import { removeFromCart } from '../features/cartSlice';
import { useNavigate } from 'react-router-dom';


function Cart() {
    const [state, setState] = useState([]);
    const [image, setImage] = useState({});
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
    return (
        <div className='p-8 mt-6 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold mt-4 mb-4 flex items-center gap-2'>My Cart <ShoppingCartIcon /></h1>
            {
                state.length === 0 && <div className='flex items-center justify-center'>
                    <h1 className='text-3xl border border-gray-800 w-full max-w-4xl h-72 rounded-lg flex flex-col items-center justify-center font-bold'>Dear {user.name}, Your Cart is empty <span className='text-lg italic font-semibold'>Please add something in your cart to view it here.</span>
                        <button onClick={() => navigate('/dashboard')} className='text-lg px-4 py-1.5 border border-gray-700 rounded-lg mt-2 bg-green-600 hover:bg-green-700 text-white hover:scale-105 font-normal flex items-center gap-2'>View Products <ArrowRight /></button></h1>
                </div>
            }
            {
                state.length > 0 && state.map((item) => (
                    <div key={item._id} className='flex flex-row gap-4 border border-gray-400 rounded-lg p-4 items-center'>
                        <img src={image[item._id]} alt="" />
                        <div>
                            <h2>
                                Product: {item.title} | Price: {item.price}
                            </h2>
                            <p>Details : {item.description}</p>
                            <h2>Category : {item.category}</h2>
                            <div className='flex flex-row gap-4 mt-4'>
                                <button className='flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 hover:scale-105 transition duration-300'>Order Now <ArrowRight /></button>
                                <button onClick={() => handleRemoveCart(item._id)} className='flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg hover:bg-red-700 hover:text-white hover:scale-105 transition duration-300'>Remove From Cart <ArrowRight /></button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Cart
