import { useState } from "react";
import { fetchWeatherInfo } from "../utils/getLocationAndWeatherData";
import { getTempAndHum } from "../utils/getTempAndHum";
import { useSelector } from "react-redux";
import { selectUser } from "../../slices/userSlice";

const Predict = () => {
    const user = useSelector(selectUser);
    const [loading, setLoading] = useState(false);
    const getPredictions = async (url) => {
        setLoading(true);
        try {
            const data = await fetchWeatherInfo();
            const tempAndHum = await getTempAndHum();
            const fetchData = {
                userId: user._id,
                url: url,
                // location: data.District,
                // rainAct: data.ACTUAL,
                // rainNorm: data.NORMAL,
                // rainDep: data.DEP,
                // soil_N: data.N,
                // soil_K: data.K,
                // soil_P: data.P,
                // soil_pH: data.pH,
                temp: tempAndHum.avgTemp,
                hum: tempAndHum.avgHum
            }

            const predictions = await fetch("http://192.168.203.212/home", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fetchData)
            });
            const predictedData = await predictions.json();

            return predictedData;
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    return { loading, getPredictions };
}

export default Predict;