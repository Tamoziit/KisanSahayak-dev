import createOrder from "../services/paypal.js";

const prices = [];

export const priceHandler = async (req, res) => {
    try {
        const price = req.body;
        console.log(price);

        prices.push(price);
        console.log(prices);

    } catch (err) {
        console.log("Error in priceHandler", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const paymentHandler = async (req, res) => {
    try {
        const price = req.body;
        prices.push(price);
        const url = await createOrder();
        res.redirect(url);
    } catch (err) {
        console.log("Error in paymentHandler", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default prices;