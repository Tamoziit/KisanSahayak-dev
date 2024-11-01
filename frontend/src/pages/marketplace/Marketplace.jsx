import { useEffect, useMemo, useState } from 'react'
import { Typography, Box, Grid, InputBase, IconButton, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
//import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import "./market.css";
//import { setProductData } from '../../state/reducer';
import useGetItems from '../../hooks/useGetItems';
import ItemCard from '../../components/ItemCard';
import Navbar from '../../components/navbars/Navbar-actions';

const FoodGalleryPage = () => {
	const { loading, items } = useGetItems();
	const [products, setProducts] = useState([]);
	//const dispatch = useDispatch();
	const navigate = useNavigate();
	const [search, setSearch] = useState("");

	useEffect(() => {
		AOS.init({ duration: 1000, delay: 300 });
		AOS.refresh();
	}, []);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	useEffect(() => {
		const getItems = async () => {
			const data = await items();
			setProducts(data);
		}
		getItems();
	}, []);

	// Filter products based on search input
	const filteredProducts = useMemo(() => {
		return products.filter((item) =>
			item.product_name.toLowerCase().includes(search.toLowerCase())
		);
	}, [products, search]);

	return (
		<>
			<Navbar />
			<Box marginTop={5}>
				<Box display="flex" flexDirection="row">
					<Box m={5} marginTop={1} marginLeft={9} sx={{
						border: "2px solid black",
						bgcolor: "white",
						width: "650px",
					}}>
						<InputBase
							sx={{
								width: "600px",
								height: "40px",
								input: {
									cursor: "text",
									paddingLeft: "1rem",
									fontSize: "1rem",
									color: "black",
								},
							}}
							placeholder='Search for farm equipments'
							value={search}
							onChange={(e) => { setSearch(e.target.value) }}
						/>
						<IconButton>
							<SearchIcon />
						</IconButton>
					</Box>
					<Box>
						<Button variant="contained" onClick={() => navigate(`/marketplace/sell`)} sx={{
							height: "40px",
							width: "100px",
							margin: "0.5rem",
							color: "#fff",
							"&:hover": {
								backgroundColor: "#000"
							}
						}}>
							<Typography style={{ fontFamily: "Montserrat", fontWeight: "500" }}>
								SELL
							</Typography>
						</Button>

						<Button variant="contained" onClick={() => navigate(`/marketplace/my-listings`)} sx={{
							height: "40px",
							width: "100px",
							margin: "0.5rem",
							color: "#fff",
							"&:hover": {
								backgroundColor: "#000"
							}
						}}>
							<Typography style={{ fontFamily: "Montserrat", fontWeight: "500" }}>
								MY LISTINGS
							</Typography>
						</Button>

						<Button variant="contained" onClick={() => navigate(`/marketplace/orders`)} sx={{
							height: "40px",
							width: "100px",
							margin: "0.5rem",
							color: "#fff",
							"&:hover": {
								backgroundColor: "#000"
							}
						}}>
							<Typography style={{ fontFamily: "Montserrat", fontWeight: "500" }}>
								MY ORDERS
							</Typography>
						</Button>
					</Box>
				</Box>
				{loading && <Typography fontFamily="Poppins" fontSize="2rem" fontWeight="500" m={5} p={4}>
					Get your pesticides today...
				</Typography>}
				{filteredProducts.length > 0 && (
					<Box m={5} p={4} marginTop={2} data-aos="fade-up" display="flex" width="90%">
						<Grid container spacing={5}>
							{filteredProducts.map((item, index) => (
								<ItemCard item={item} key={index} />
							))}
						</Grid>
					</Box>
				)}
			</Box>
		</>
	)
}

export default FoodGalleryPage;
