import { useEffect, useState } from "react";
import Navbar from "../../components/navbars/Navbar-actions";
import { fetchIPInfo } from "../../utils/getLocationAndWeatherData";
import { useNavigate } from "react-router-dom";
import { env_data } from "../../data/Rainfall_Soil.json";

const Dashboard = () => {
	const [myDistrict, setMyDistrict] = useState("");
	const navigate = useNavigate();

	const getMyDistrict = async () => {
		const district = await fetchIPInfo();
		if (district?.city) {
			setMyDistrict(district.city);
		} else {
			setMyDistrict("No Relevant district found");
		}
	};

	useEffect(() => {
		getMyDistrict();
	}, []);

	const images = ["/vector.png", "/Vector2.png", "/vector3.png"];

	return (
		<div>
			<Navbar />
			<div>
				<h1 className="text-gray-800 font-bold text-3xl text-left ml-3 mt-4">
					My Region
				</h1>
				<div className="bg-gray-400 w-[98%] h-[2px] ml-3 mr-3 my-2" />

				<div
					className="m-4 rounded-lg overflow-hidden bg-gray-200 w-fit backdrop-blur-lg shadow-lg transform transition-transform hover:scale-105 flex flex-col items-center justify-center pb-2 cursor-pointer"
					onClick={() => {
						navigate("/dashboard/personal");
					}}
				>
					<div className="size-[310px] p-3 rounded-lg overflow-hidden">
						<img src="/vector.png" alt="personal" className="w-full rounded-lg" />
					</div>
					<span className="font-semibold text-2xl text-center text-gray-700">
						{myDistrict}
					</span>
				</div>
			</div>

			<div className="mt-8">
				<h1 className="text-gray-800 font-bold text-3xl text-left ml-3 mt-4">
					Other Regions
				</h1>
				<div className="bg-gray-400 w-[98%] h-[2px] ml-3 mr-3 my-2" />
				<div>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:mr-3">
						{env_data.map((item, _idx) => {
							const imgSrc = images[_idx % images.length];
							return (
								<div
									className="m-4 rounded-lg overflow-hidden bg-gray-200 w-fit backdrop-blur-lg shadow-lg transform transition-transform hover:scale-105 flex flex-col items-center justify-center pb-2 cursor-pointer"
									onClick={() => {
										navigate(`/dashboard/${item.District}`);
									}}
									key={_idx}
								>
									<div className="lg:size-[310px] p-3 rounded-lg overflow-hidden md:size-[250px]">
										<img src={imgSrc} alt={item.District} className="w-full rounded-lg" />
									</div>
									<span className="font-semibold text-xl text-center text-gray-700">
										{item.District}
									</span>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
