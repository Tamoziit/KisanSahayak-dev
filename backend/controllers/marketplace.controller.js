import Product from "../models/marketplace.model.js";
import stripe from "../stripe/stripeInit.js";

export const sellItem = async (req, res) => {
    try {
        const
            {
                product_name,
                image_url,
                seller,
                seller_name,
                seller_type,
                price
            } = req.body;

        const newProduct = new Product({
            product_name,
            image_url,
            seller,
            seller_name,
            seller_type,
            price
        })

        if (newProduct) {
            console.log(newProduct);
            const savedProduct = await newProduct.save();
            res.status(201).json(savedProduct);
        } else {
            res.status(400).json({ error: "Invalid product data" });
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getAllItems = async (req, res) => {
    try {
        const loggedInUser = req.params.id;
        const products = await Product.find({ seller: { $ne: loggedInUser } });

        res.status(200).json(products);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getMySellings = async (req, res) => {
    try {
        const loggedInUser = req.params.id;
        const products = await Product.find({ seller: loggedInUser });

        res.status(200).json(products);
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getItemById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: "Cannot get product" });
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const buyItem = async (req, res) => {
    try {
        const { order_id, session_id } = req.body;
        console.log({ order_id, session_id })
        const deletedProduct = await Product.deleteOne({ _id: order_id });
        console.log(deletedProduct);

        const session = await stripe.checkout.sessions.retrieve(session_id, {
            expand: ['payment_intent.payment_method']
        });

        const response = JSON.stringify(session);
        console.log(response);

        if (deletedProduct) {
            res.status(200).json({ success: "Product bought successfully" });
        } else {
            res.status(400).json({ error: "Error in buying the product" });
        }
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ error: "Internal Server Error" });
    }
}