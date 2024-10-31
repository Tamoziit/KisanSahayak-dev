import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useGetMySellings = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = "http://192.168.170.212:3001";
    const { authUser } = useAuthContext();

    const sellings = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/marketplace/sold/${authUser._id}`, {
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
    return { loading, sellings }
}

export default useGetMySellings;