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
        <div>
            <h1>Available Products:</h1>
            <div className='grid grid-cols-3 gap-6'>
                {
                    products.map((p) => (
                        <div key={p._id}>
                            <img src={p.imageUrl} alt="image"/>
                            <h3>{p.name}</h3>
                            <p>{p.description}</p>
                            <span>₹ {p.price}</span>
                            <p>{p.category}</p>
                            <button onClick={() => dispatch(addToCart(p))}>Add to Cart</button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DashBoard
