import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from "axios"
import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import useGetItemById from '../../hooks/useGetItemById';
import { setProductPrice } from '../../state/reducer';
import Navbar from '../../components/navbars/Navbar-actions';

const MarketplaceBuy = () => {
	//const prodData = useSelector((state) => state.productData);
	const dispatch = useDispatch();
	const apiUrl = import.meta.env.VITE_API_URL;

	const [prodInfo, setProdInfo] = useState(null);

	const { id } = useParams();
	const { loading, product } = useGetItemById();

	/*async function getWikiResponse(url, config) {
		const res = await axios.get(url, config);
		return res;
	};*/

	const handlePay = () => {
		try {
			const priceBreakdown = [{ "totalPrice": prodInfo.price }];
			axios.post(`${apiUrl}/`, { priceBreakdown })
			dispatch(setProductPrice(prodInfo.price));
		}
		catch (err) {
			console.log(err);
		}
	}

	useEffect(() => {
		const getProduct = async () => {
			const data = await product(id);
			setProdInfo(data);
		}

		getProduct();
	}, []);

	return (
		<>
			<Navbar />
			{loading ? (
				<span className='text-[150px]'>Loading...</span>
			) : (
				<>
					<Box display="flex">
						<Box display="flex" flexDirection="column" alignItems="center">
							<Box m={2} p={4} border={`2px solid black`} boxShadow={`5px 7px 2px 2px black`}>
								<img width={500} src={prodInfo?.image_url} />
							</Box>
						</Box>
						<Box display="flex" justifyContent="space-between" marginX={12} marginY={5}>
							<Box display="flex" flexDirection="column" width="100%">
								<Typography marginBottom={2} style={{ fontWeight: "200", fontSize: "2.5rem" }}>
									{prodInfo?.product_name}
								</Typography>
								<Typography variant='h6' marginBottom={2} color="#c2c2c2" fontWeight="200">
									{prodInfo?.seller_name}
								</Typography>
								<Typography display="flex" flexDirection="row" marginBottom={2.5}>
									<Typography variant='h2b' fontWeight="100">
										{prodInfo?.seller_type}
									</Typography>

									<Typography display="flex" flexDirection="row">
										<Typography marginTop={2}>
											₹
										</Typography>
										<Typography fontSize="2rem">
											{prodInfo?.price}
										</Typography>
									</Typography>

								</Typography>
								{
									<Box>
										<form action={`${apiUrl}/pay`} method='post'>
											<input type='submit'
												className='w-[250px] h-[40px] bg-[#005eff] rounded-md text-white italic cursor-pointer hover:bg-blue-800'
												onClick={handlePay} value="CONTINUE TO PAY WITH PAYPAL" />
										</form>
									</Box>
								}
							</Box>
						</Box>
					</Box>
				</>
			)}
		</>
	)
}

export default MarketplaceBuy;
