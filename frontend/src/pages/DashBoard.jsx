import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { setProducts } from "../features/productSlice";
import { Length } from "../utils/shortlength";
import { ArrowRight } from "lucide-react";

function DashBoard() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.items);
    const user = useSelector((state) => state.auth.user);

    const [images, setImages] = useState({});
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    // Load products from server
    useEffect(() => {
        const loadProducts = async () => {
            const res = await API.get("/products");
            dispatch(setProducts(res.data));
        };
        loadProducts();
    }, [dispatch]);

    // Load images
    useEffect(() => {
        const fetchImages = async () => {
            const temp = {};

            for (const p of products) {
                if (!p.imageUrl) continue;

                const filename = p.imageUrl.split("/").pop();
                const { data } = await API.get(`/products/image/${filename}`);
                temp[p._id] = data.fileURL;
            }
            setImages(temp);
        };

        if (products.length > 0) fetchImages();
    }, [products]);

    // Filter
    const filtered = [...products].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    ).filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="mt-12 p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-4xl font-bold">
                    Welcome <span className="italic">{user?.name}!</span>
                </h1>

                <input
                    type="search"
                    className="border w-full max-w-xs h-10 rounded-lg p-3 bg-gray-100 text-black border-black"
                    placeholder="Search Product"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <h1 className="font-bold text-2xl">Available Products:</h1>

            <div className="grid grid-cols-3 gap-6 mt-8">
                {filtered.length === 0 ? (
                    <div className="col-span-3 flex justify-center">
                        <div className="border w-full max-w-3xl h-60 rounded-lg flex flex-col justify-center items-center">
                            <p className="text-2xl font-bold">
                                No results for "<span className="italic">{search}</span>"
                            </p>
                            <button
                                onClick={() => setSearch("")}
                                className="mt-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                            >
                                Clear Search
                            </button>
                        </div>
                    </div>
                ) : (
                    filtered.map((product) => (
                        <div
                            key={product._id}
                            className="border rounded-lg p-4 shadow hover:scale-105 transition cursor-pointer"
                            onClick={() => navigate(`/modal/${product._id}`)}
                        >
                            {images[product._id] && (
                                <div className="w-full h-48 flex justify-center mb-3">
                                    <img
                                        src={images[product._id]}
                                        alt={product.title}
                                        className="h-48 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <h2 className="font-bold text-lg">{product.title}</h2>
                            <p>{Length(product.description, 100)}</p>
                            <p className="font-semibold mt-2">Price: ₹{product.price}</p>
                            <p className="font-semibold">Category: {product.category}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default DashBoard;
