import { fetchIPInfo } from "./getLocationAndWeatherData";

export const getTempAndHum = async () => {
    //const key = import.meta.env.VITE_API_KEY;
    const key = "34752c03213f4be0fc511f916d8d5195";
    const weatherData = await fetchIPInfo();

    const lat = weatherData.lat;
    const lon = weatherData.lon;

    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`);
    const data = await res.json();

    const tempVals = data.list.map(el => el.main.temp);
    const humVals = data.list.map(el => el.main.humidity);

    const avgTemp = tempVals.reduce((sum, temp) => sum + temp, 0) / tempVals.length;
    const avgHum = humVals.reduce((sum, hum) => sum + hum, 0) / humVals.length;

    return ({ avgTemp, avgHum });
}