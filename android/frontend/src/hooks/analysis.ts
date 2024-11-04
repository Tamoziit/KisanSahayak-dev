import { useState } from "react"
import { fetchWeatherInfo } from "../utils/getLocationAndWeatherData";
import { getTempAndHum } from "../utils/getTempAndHum";

const useGetAnalysis = () => {
    const [loading, setLoading] = useState(false);
    const apiUrl = "http://192.168.142.212:3001";

    const analysis = async () => {
        setLoading(true);
        try {
            const weatherData = await fetchWeatherInfo();
            const tempAndHum = await getTempAndHum();

            const fetchData = {
                rain: weatherData?.NORMAL,
                soil_N: weatherData?.N,
                soil_K: weatherData?.K,
                soil_P: weatherData?.P,
                soil_pH: weatherData?.pH,
                temp: tempAndHum.avgTemp,
                hum: tempAndHum.avgHum
            }

            const data = await fetch(`${apiUrl}/dashboard/analysis`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fetchData)
            });
            const res = await data.json();
            return res;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return { loading, analysis }
}

export default useGetAnalysis;