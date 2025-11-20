import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setProductsBId } from '../features/productSlice';
import { useParams } from 'react-router-dom';
import API from '../api';
import { ArrowRight } from 'lucide-react';

function DeliveryItem() {
    const { id } = useParams();
    const [state, setState] = useState({});
    const [image, setImage] = useState("");
    const dispatch = useDispatch();
    const userdata = useSelector((state) => state.auth.user);
    const useremail = userdata?.email;

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

    const loadRazorpay = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        try {
            await loadRazorpay();
            const body = {
                items: [
                    {
                        productId: state._id,
                        title: state.title,
                        price: state.price,
                    }
                ],
                user: userdata._id || null,
                userEmail: useremail,
                total: state.price
            }
            const { data: orderData } = await API.get("/getKey");
            const key = orderData.Key;
            console.log("key_id : ",key);


            const res = await API.post("/payment/process", body);
            console.log(res.data);

            const options = {
                key, // Replace with your Razorpay key_id
                amount: res.data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                currency: 'INR',
                name: 'Yoda-Food',
                description: 'Test Transaction',
                order_id: res.data.order.id, // This is the order_id created in the backend
                callback_url: '/api/paymentVerification', // Your success URL
                prefill: {
                    name: 'Gaurav Kumar',
                    email: 'gaurav.kumar@example.com',
                    contact: '9999999999'
                },
                theme: {
                    color: '#F37254'
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error.message);

        }
    }

    return (
        <div className='p-8 mt-6'>
            <h1>Delivery Item Page</h1>
            {image && <div className='w-[350px] h-[350px] flex justify-center items-center border border-black rounded-lg mb-4'>
                <img src={image} className="h-[350px] object-cover rounded-lg mb-4" /></div>}
            <h1>{state.title}</h1>
            <p>{state.description}</p>
            <h1>{state.price}</h1>
            <h1>{state.category}</h1>
            <button onClick={() => handlePayment()} className='flex items-center gap-2 border border-gray-400 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 hover:scale-105 transition duration-300'>Order Now <ArrowRight /></button>

        </div>
    )
}

export default DeliveryItem
