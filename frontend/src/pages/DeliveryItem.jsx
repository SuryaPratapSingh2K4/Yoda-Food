import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setProductsBId } from '../features/productSlice';
import { useParams } from 'react-router-dom';
import API from '../api';

function DeliveryItem() {
    const { id } = useParams();
    const [state, setState] = useState({});
    const [image, setImage] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await API.get(`/products/${id}`);
            setState(data);
            dispatch(setProductsBId(data));
            if (data.imageUrl) {
                const filename = data.imageUrl.split("/").pop();
                const imageRes = await API.get(`/products/image/${filename}`);
                setImage(imageRes.data.fileURL)

            }
        }
        fetchData();
    }, [dispatch, id])

    return (
        <div className='p-8 mt-6'>
            <h1>Delivery Item Page</h1>
            {image && <div className='w-[350px] h-[350px] flex justify-center items-center border border-black rounded-lg mb-4'>
                <img src={image} className="h-[350px] object-cover rounded-lg mb-4" /></div>}
            <h1>{state.title}</h1>
            <p>{state.description}</p>
            <h1>{state.price}</h1>
            <h1>{state.category}</h1>


        </div>
    )
}

export default DeliveryItem
