import { useEffect, useState } from "react"
import { fetchWeatherInfo } from "../../utils/getLocationAndWeatherData";
import RainfallChart from "../../components/analytics/RainfallChart";
import SoilChart from "../../components/analytics/SoilChart";
import useGetAnalysis from "../../hooks/useGetAnalysis";
import Navbar from "../../components/navbars/Navbar-actions";

const Dashboard = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [analysisData, setAnanlysisData] = useState(null);
	const { loading, analysis } = useGetAnalysis();

	const getAnalysis = async () => {
		const res = await analysis();
		setAnanlysisData(res);
	}

	useEffect(() => {
		const getWeatherData = async () => {
			try {
				const data = await fetchWeatherInfo();
				if (data) {
					setWeatherData(data);
				}
			} catch (error) {
				console.error("Failed to fetch weather data:", error);
			}
		};

		getWeatherData();
		getAnalysis();
	}, []);

	return (
		<div>
			<Navbar />
			<h1 className="text-gray-800 font-bold text-3xl text-center mb-7 mt-4">Regional Environmental Conditions Analysis</h1>
			{weatherData ? (
				<div className="flex space-x-4 flex-col px-4">
					<div className="flex gap-4">
						<div className="w-1/2">
							<RainfallChart data={weatherData} />
						</div>

						<div className="w-1/2">
							<SoilChart data={weatherData} />
						</div>
					</div>

					{analysisData && (
						<div className="flex gap-3 mt-10">
							<div className="w-1/2">
								<span className="font-semibold text-lg">Most Suitable Crops you can Grow</span>
								<ul className="pl-2 pt-2 list-disc list-inside">
									{analysisData.predictions.crops.map((crop, idx) => (
										<li key={idx}>{crop}</li>
									))}
								</ul>
							</div>

							<div className="w-1/2">
								<span className="font-semibold text-lg">Diseases your crops are most prone to</span>
								<ul className="pl-2 pt-2 list-disc list-insideFF">
									{analysisData.predictions.diseases.map((disease, idx) => (
										<li key={idx}>{disease}</li>
									))}
								</ul>
							</div>
						</div>
					)}
				</div>
			) : (
				<h1 className="text-center">Loading...</h1>
			)}
		</div>
	)
}

export default Dashboard