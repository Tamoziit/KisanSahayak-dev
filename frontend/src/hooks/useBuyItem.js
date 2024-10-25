import { useState } from "react";
import toast from "react-hot-toast";

const useBuyItem = () => {
    const [loading, setLoading] = useState();
    const apiUrl = import.meta.env.VITE_API_URL;

    const buy = async ({ order_id, session_id }) => {
        setLoading(true)
        try {
            const res = await fetch(`${apiUrl}/marketplace/buy`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ order_id, session_id })
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            if (data) {
                toast.success("Item Bought successfully");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, buy };
}

export default useBuyItem;