import { useState } from "react"
//import { useAuthContext } from "../context/AuthContext";

const useHandlePay = () => {
	const [payLoading, setPayLoading] = useState(false);
	//const { setAuthUser } = useAuthContext();
	const apiUrl = "http://192.168.142.212:3001";

	const handlePay = async (prodInfo) => {
        const body = {
			id: prodInfo._id,
            product_name: prodInfo.product_name,
            product_description: `${prodInfo.seller_name} | ${prodInfo.seller_type}`,
            price: prodInfo.price,
            imageUrl: prodInfo.image_url
        }

        console.log(body);

		setPayLoading(true);
		try {
			const res = await fetch(`${apiUrl}/payment/pay`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(body)
			});
			const data = await res.json();

			if (data.error) {
				throw new Error(data.error)
			}

            console.log(data);
			return data;
		} catch (error) {
			console.error(error);
		} finally {
			setPayLoading(false);
		}
	}

	return { payLoading, handlePay }
}

export default useHandlePay;