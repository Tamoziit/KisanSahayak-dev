import { useEffect, useState } from "react";
import useGetMyOrders from "../../hooks/useGetMyOrders";
import Spinner from "../../components/Spinner";
import Navbar from "../../components/navbars/Navbar-actions";
import OrderCard from "../../components/OrderCard";

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
			<Navbar />
			<div className="flex flex-col gap-3 items-center justify-center w-full">
				<h1 className="mt-3 text-[50px] font-bold text-gray-700">Orders</h1>
				{loading ? (
					<Spinner />
				) : (
					<div className="w-full">
						{myOrders.length !== 0 ? (
							<div className="flex flex-col gap-2 p-3 w-full">
								{myOrders.slice().reverse().map((order, _idx) => (
									<OrderCard order={order} key={_idx} />
								))}
							</div>
						) : (
							<h1>No Orders yet</h1>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

export default Orders