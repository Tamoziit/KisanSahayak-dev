import { useEffect, useState } from "react";
import useGetMySellings from "../../hooks/useGetMySellings";
import Navbar from "../../components/navbars/Navbar-actions";
import Spinner from "../../components/Spinner";
import ItemCard from "../../components/ItemCard";

const MyListings = () => {
	const [listings, setListings] = useState(null);
	const { loading, sellings } = useGetMySellings();

	const getListings = async () => {
		const data = await sellings();
		setListings(data);
	};

	useEffect(() => {
		getListings();
	}, []);

	console.log(listings);

	return (
		<>
			<Navbar />
			<div className="w-screen min-h-screen flex flex-col items-center justify-start">
				<h1 className="mt-3 text-[50px] font-bold text-gray-700">My Listings</h1>

				{loading ? (
					<Spinner />
				) : listings ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full h-full p-6">
						{listings.map((listing, index) => (
							<ItemCard item={listing} key={index} />
						))}
					</div>
				) : (
					<p>No listings found</p>
				)}
			</div>
		</>
	);
};

export default MyListings;
