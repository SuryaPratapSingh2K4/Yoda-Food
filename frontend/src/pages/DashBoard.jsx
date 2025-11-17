import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import API from '../api';
import { setProducts } from '../features/productSlice';
import { addToCart } from '../features/cartSlice';
import { Length } from '../utils/shortlength';
import { ArrowRight } from 'lucide-react';

function DashBoard() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.items);
    const user = useSelector((state) => state.auth.user)

    const [images, setImages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const loadProducts = async () => {
            const res = await API.get("/products");
            dispatch(setProducts(res.data));
            
        };
        loadProducts();
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            const tempImages = {};

            for (const p of products) {
                if (!p.imageUrl) continue;

                const filename = p.imageUrl.split("/").pop(); // REQUIRED

                const { data } = await API.get(`/products/image/${filename}`);

                tempImages[p._id] = data.fileURL; // FIXED KEY
            }

            setImages(tempImages);
        };

        if (products.length > 0) fetchData();
    }, [products]);

    const handleModal = (id) => {
        navigate(`/modal/${id}`)
    }

    return (
        <div className='mt-12 p-8'>
            <h1 className='text-4xl font-bold mb-2'>Welcome <span className='italic font-medium'>{user?.name}!</span></h1>
            
            <h1 className='font-bold text-2xl'>Available Products:</h1>
            <div className='grid grid-cols-3 gap-6 mt-8'>
                {products.map((p) => (
                    <div key={p._id} className='rounded-lg border border-gray-900 p-4 flex flex-col justify-between hover:shadow-lg hover:shadow-gray-400 hover:scale-105 cursor-pointer' onClick={() => handleModal(p._id)}>
                        <div className='w-[300px] h-[200px] flex justify-center items-center'>
                            <img src={images[p._id]} alt="image" className=" object-cover" />
                        </div>
                        <h3 className="font-semibold">Product Name : <span className='font-normal'>{p.title}</span></h3>
                        <p className='font-semibold'>Description : <span className='font-normal'>{Length(p.description)}</span></p>
                        <p className='font-semibold'>Price : <span className='font-normal'>₹{p.price}</span></p>
                        <p className='font-semibold'>Category : <span className='font-normal'>{p.category}</span></p>
                        <p className='font-semibold'>Stocks : <span className='font-normal'>{p.stocks}</span></p>

                        <div>
                            <button
                                onClick={() => dispatch(addToCart(p))}
                                className='px-4 py-1.5 bg-white rounded-lg mt-2 border border-purple-900 hover:bg-gray-900 hover:text-white transition duration-300 flex items-center gap-2'
                            >
                                Add to Cart <ArrowRight/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default DashBoard;
