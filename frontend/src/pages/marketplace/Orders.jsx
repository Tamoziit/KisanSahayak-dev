import { useEffect, useState } from "react";
import useGetMyOrders from "../../hooks/useGetMyOrders";
import Spinner from "../../components/Spinner";

const Orders = () => {
    const { loading, orders } = useGetMyOrders();
    const [myOrders, setMyOrders] = useState([]);

    const getOrders = async () => {
        const data = await orders();
        setMyOrders(data);
    }

    useEffect(() => {
        getOrders();
    }, []);

    console.log(myOrders)

    return (
        <div>
            {loading ? (
                <Spinner />
            ) : (
                <div>Orders</div>
            )}
        </div>
    )
}

export default Orders