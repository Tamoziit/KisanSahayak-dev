import { useLocation } from 'react-router-dom';
import useBuyItem from '../../hooks/useBuyItem';
import { useState, useEffect } from 'react';
import useGetItemById from '../../hooks/useGetItemById';
import Spinner from "../../components/Spinner";

const CompletePayment = () => {
	const location = useLocation();
	const { payLoading, buy } = useBuyItem();
	const [prodInfo, setProdInfo] = useState(null);
	const [paramsData, setParamsData] = useState({
		session_id: '',
		order_id: ''
	});
	const { loading, product } = useGetItemById();
	const [totalAmt, setTotalAmt] = useState();

	const getProduct = async () => {
		const queryParams = new URLSearchParams(location.search);
		const session_id = queryParams.get('session_id');
		const order_id = queryParams.get('order_id');

		const updatedData = {
			session_id: session_id,
			order_id: order_id
		}
		setParamsData(updatedData);

		const data = await product(updatedData.order_id);
		setProdInfo(data);
		setTotalAmt(prodInfo?.price + 46);
	};

	useEffect(() => {
		getProduct();
	}, [location.search, prodInfo]);

	const buyItem = async () => {
		const order_id = paramsData.order_id;
		const session_id = paramsData.session_id;
		await buy({ order_id, session_id });
	}

	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100'>
			<div className="w-[400px] mx-auto p-6 bg-white shadow-md rounded-lg mt-8">
				<h2 className="text-xl font-semibold mb-4">Just One Step Behind</h2>

				{loading && !prodInfo && !paramsData && !totalAmt ? (
					<Spinner />
				) : (
					<div className="border-t border-gray-300 pt-4">
						<h3 className="text-lg font-medium mb-2">Order Invoice</h3>
						<div className="text-sm space-y-2">
							<div className="flex justify-between">
								<span className="font-semibold">Order ID:</span>
								<span>{paramsData?.order_id || 'N/A'}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Product:</span>
								<span>{prodInfo?.product_name || 'N/A'}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Seller Name:</span>
								<span>{prodInfo?.seller_name || 'N/A'}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Seller Type:</span>
								<span>{prodInfo?.seller_type || 'N/A'}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Price:</span>
								<span>₹ {prodInfo?.price || 'N/A'}</span>
							</div>
							<div className="flex justify-between">
								<span className="font-semibold">Taxes & Delivery Charges:</span>
								<span>₹ {'46'}</span>
							</div>

							<div className="w-full h-px bg-gray-300 my-4"></div>

							<div className="flex justify-between">
								<span className="font-semibold">Total:</span>
								<span>₹ {totalAmt || 'N/A'}</span>
							</div>
						</div>
					</div>
				)}

				<button
					className={`mt-6 w-full bg-blue-500 text-white py-2 rounded-md ${payLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
					onClick={buyItem}
					disabled={payLoading}
				>
					{payLoading ? <Spinner /> : 'Press to Confirm Donation'}
				</button>
			</div>
		</div>
	)
}

export default CompletePayment