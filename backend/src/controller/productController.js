import Product from "../model/productSchema.js";

export async function getProducts(req, res) {
    const product = await Product.find();
    res.status(201).json(product);
}

export async function postProducts(req, res) {
    try {
        const { title, category, description, price, imageUrl, stocks } = req.body;
        const newProduct = await Product.create({
        title,
        category,
        description,
        price,
        imageUrl,
        stocks,
        });
        res.status(201).json( {newProduct} );
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
