import React from 'react'

function PaymentSuccess() {
    const query = new URLSearchParams(window.location.search);
    const reference = query.get('reference');
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white shadow-lg p-8 rounded-xl text-center max-w-md">

                <h1 className="text-3xl font-bold text-green-600 mb-4">
                    🎉 Payment Successful!
                </h1>

                <p className="text-lg text-gray-700 mb-2">
                    Thank you for your order.
                </p>

                <p className="text-gray-600 mb-6">
                    Your payment reference ID:
                </p>

                <p className="text-xl font-semibold text-blue-600 break-all mb-6">
                    {reference}
                </p>

                <a
                    href="/"
                    className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    )
}

export default PaymentSuccess
