import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import API from '../api';
import { setProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';

function DashBoard() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.items);
    useEffect(() => {
        API.get("/products").then((res) => dispatch(setProducts(res.data)));
    }, [dispatch])
    return (
        <div className='mt-12 p-8'>
            <h1 className='font-bold text-2xl'>Available Products:</h1>
            <div className='grid grid-cols-3 gap-6 mt-4'>
                {
                    products.map((p) => (
                        <div key={p._id} className='rounded-lg border border-purple-900 bg-black/40 overflow-hidden hover:scale-105 hover:shadow-md hover:shadow-purple-500 p-4'>
                            <img src={p.imageUrl} alt="image" />
                            <h3 className='text-1xl font-semibold'>{p.title}</h3>
                            <p className='font-semibold'>Description: <span className='italic font-normal'>{p.description}</span></p>
                            <p className='font-semibold'>Price: <span className='font-normal'>${p.price}</span></p>
                            <p className='font-semibold'>Category: <span className='font-normal'>{p.category}</span></p>
                            <button onClick={() => dispatch(addToCart(p))} className='px-4 py-1.5 bg-white rounded-lg mt-2 shadow-md shadow-black hover:scale-105'>Add to Cart</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DashBoard
