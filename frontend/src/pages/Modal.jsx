import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import API from '../api';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setProductsBId } from '../features/productSlice';
import { ArrowBigLeftDashIcon, ArrowRight } from 'lucide-react'

function Modal() {
    const { id } = useParams();
    const [state, setState] = useState({});
    const [image, setImage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductDetails = async () => {
            const { data } = await API.get(`/products/${id}`)
            setState(data);
            dispatch(setProductsBId(data))
            if (data.imageUrl) {
                const filename = data.imageUrl.split("/").pop();
                const imageRes = await API.get(`/products/image/${filename}`);
                setImage(imageRes.data.fileURL);
            }
        }
        fetchProductDetails();
    }, [id, dispatch])
    const handleBack = () => {
        window.history.back();
    }
    return (
        <div className='p-8 mt-6 flex flex-row gap-4 ' key={id}>
            <ArrowBigLeftDashIcon size={60} onClick={handleBack} className='cursor-pointer mt-1' />
            <div className='flex flex-col'>
                <h1 className='text-2xl py-4'>Product Detail of <span className='font-semibold'>{state.title}</span></h1>
                {image && <div className='w-[350px] h-[350px] flex justify-center items-center border border-black rounded-lg mb-4'>
                    <img src={image} className="h-[350px] object-cover rounded-lg mb-4" /></div>}
                <h3 className="font-semibold">Product Name : <span className='font-normal'>{state.title}</span></h3>
                <p className='font-semibold mr-8'>Description : <span className='font-normal'>{state.description}</span></p>
                <p className='font-semibold'>Price : <span className='font-normal'>₹{state.price}</span></p>
                <p className='font-semibold'>Category : <span className='font-normal'>{state.category}</span></p>
                <div className='flex flex-row gap-4 mt-4'>
                    <button className='flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 hover:scale-105 transition duration-300'>Order Now <ArrowRight /></button>
                    <button className='flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white hover:scale-105 transition duration-300'>Add To Cart <ArrowRight /></button>
                </div>
            </div>
        </div>
    )
}

export default Modal
