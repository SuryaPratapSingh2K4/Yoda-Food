    import React, { useEffect, useState } from 'react'
    import { useDispatch, useSelector } from 'react-redux';
    import { useNavigate } from 'react-router-dom';
    import API from '../api';
    import { setProducts } from '../features/productSlice';
    import { Length } from '../utils/shortlength';
    import { ArrowRight } from 'lucide-react';

    function DashBoard() {
        const dispatch = useDispatch();
        const products = useSelector((state) => state.product.items);
        const user = useSelector((state) => state.auth.user)
        
        const [images, setImages] = useState({});
        const [search, setSearch] = useState("");
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

        const filteredProduct = [...products].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt)).filter(item => item.title.toLowerCase().includes(search.toLowerCase()) || item.category.toLowerCase().includes(search.toLowerCase()));

        return (
            <div className='mt-12 p-8'>
                <div className='flex flex-row items-center justify-between'>
                    <h1 className='text-4xl font-bold mb-2'>Welcome <span className='italic font-medium'>{user?.name}!</span></h1>
                    <input type="search" className='border border-gray-800 w-full max-w-xs h-10 rounded-lg p-4' placeholder='Search Product' value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <h1 className='font-bold text-2xl'>Available Products:</h1>
                <div className='grid grid-cols-3 gap-6 mt-8'>
                    {
                        products.length > 0 && (
                            filteredProduct.length === 0 ? (
                                <div className='col-span-3 flex items-center justify-center'>
                                    <h1 className='text-3xl border border-gray-800 w-full max-w-4xl h-72 rounded-lg flex flex-col items-center justify-center font-bold'>No products match your search "<span className='italic text-lg'>{search}</span>".
                                        <button onClick={() => setSearch("")} className='text-lg px-4 py-1.5 border border-gray-700 rounded-lg mt-2 bg-green-600 hover:bg-green-700 text-white hover:scale-105 font-normal flex items-center gap-2'>Clear Search <ArrowRight /></button></h1>
                                </div>
                            ) : (
                                filteredProduct.map((product) => (
                                    <div key={product._id} className='border border-gray-400 rounded-lg p-4 shadow-lg shadow-gray-300 hover:scale-105 transition duration-300 cursor-pointer' onClick={() => handleModal(product._id)}>
                                        {images[product._id] && (
                                            <div className='w-full h-48 flex justify-center items-center mb-4'>
                                                <img src={images[product._id]} alt={product.title} className='h-48 object-cover rounded-lg' />
                                            </div>
                                        )}
                                        <h2 className='font-bold text-lg'>{product.title}</h2>
                                        <p className='text-gray-700'>{Length(product.description, 100)}</p>
                                        <h3 className='font-semibold mt-2'>Price: ₹{product.price}</h3>
                                        <h3 className='font-semibold'>Category: {product.category}</h3>
                                    </div>
                                ))
                            )
                        )
                    }
                </div>
            </div>
        )
    }

    export default DashBoard;
