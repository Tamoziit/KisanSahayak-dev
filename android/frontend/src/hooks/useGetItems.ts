import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

const useGetItems = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = "http://192.168.142.212:3001";
    console.log(apiUrl);
    
    const { authUser } = useAuthContext();
    console.log(authUser);
    
    const items = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${apiUrl}/marketplace/explore/${authUser._id}`, {
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
    return { loading, items }
}

export default useGetItems;