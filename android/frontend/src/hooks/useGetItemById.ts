import { useState } from "react";

const useGetItemById = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = "http://192.168.142.212:3001";

    const product = async (id) => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/marketplace/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await res.json();

            if (data.error) {
                throw new Error(data.error);
            }

            return data;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, product }
}

export default useGetItemById;