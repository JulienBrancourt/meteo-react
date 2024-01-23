import { useEffect, useState } from "react";
import loader from "./assets/loader.svg";
import "./App.css";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
	const [meteo, setMeteo] = useState(null);

	useEffect(() => {
		fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
			.then((response) => {
				console.log(response);
				return response.json();
			})
			.then((dataAPI) => {
				console.log(dataAPI);
				setMeteo({
					ville: dataAPI.data.city,
					pays: dataAPI.data.country,
					icone: dataAPI.data.current.weather.ic,
					temperature: dataAPI.data.current.weather.tp,
				});
			});
	}, []);
	return (
		<main>
			{/* on affiche le loader en lui donnant la classe active si meteo est faux */}
			<div className={`loader-container ${!meteo && "active"}`}>
				<img src={loader} alt="loading icon" />
			</div>

			{meteo && (
				<>
					<p className="city-name">{meteo.ville}</p>
					<p className="country-name">{meteo.pays}</p>
					<p className="temperature">{meteo.temperature}°</p>
					<div className="info-icon-container">
						<img src={`/icons/${meteo.icone}.svg`} className="info-icon" alt="" />
					</div>
				</>
			)}
		</main>
	);
}

export default App;
