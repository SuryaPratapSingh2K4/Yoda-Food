import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import API from '../api';

function MyOrders() {
    const [orders, setOrders] = useState([]);
    const userdata = useSelector((state) => state.auth.user);

    useEffect(() => {
        const fetchData = async () => {
            const res = await API.get(`/payment/myorders/${userdata._id}`);
            console.log(res.data);
            setOrders(res.data.orders);
        };
        fetchData();
    }, [userdata._id]);

    return (
        <div className="p-8 mt-6">
            <h1 className="text-2xl font-bold mb-4">My Orders</h1>

            {orders.length === 0 && (
                <p className="text-gray-600 text-lg">No orders found 😔</p>
            )}

            <div className="flex flex-col gap-5">
                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="border rounded-xl p-5 bg-white shadow-lg"
                    >
                        <h2 className="font-bold text-lg mb-1">
                            Order ID: {order.payment?.razorpayOrderId}
                        </h2>

                        <p className="text-gray-700">Total: ₹{order.total}</p>
                        <p className="text-gray-700">
                            Date: {new Date(order.createdAt).toLocaleString()}
                        </p>

                        <h3 className="font-semibold mt-3 mb-1">Items:</h3>

                        {order.items.map((item) => (
                            <div
                                key={item.productId?._id || item.productId}
                                className="flex items-center gap-4 border p-3 rounded-md mb-2 bg-gray-50"
                            >
                                <img
                                    src={item.productId.imageUrl}
                                    alt={item.title}
                                    className="w-20 h-20 object-cover rounded-md border"
                                />
                                <div>
                                    <p className="font-semibold text-gray-900">{item.title}</p>
                                    <p className="text-gray-700">₹{item.price}</p>
                                </div>
                            </div>
                        ))}

                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyOrders;
