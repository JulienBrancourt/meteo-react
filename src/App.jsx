import { useEffect, useState } from "react";
import loader from "./assets/loader.svg";
import Browser from "./assets/browser.svg";
import "./App.css";
const APIKEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
	const [meteo, setMeteo] = useState(null);
	const [errorInfo, setErrorInfo] = useState(null);

	useEffect(() => {
		fetch(`http://api.airvisual.com/v2/nearest_city?key=${APIKEY}`)
			.then((response) => {
				console.log(response);
				// les erreur 400 à 599 ne sont pas naturellement prises en compte par le catch, donc si le ok est faux on crée une nouvelle erreur  ("throw new Error" force l'exécution du catch)
				if (!response.ok) throw new Error(`Error ${response.status}, ${response.statusText}`)

				return response.json
			})
			.then((dataAPI) => {
				console.log(dataAPI);
				setMeteo({
					ville: dataAPI.data.city,
					pays: dataAPI.data.country,
					icone: dataAPI.data.current.weather.ic,
					temperature: dataAPI.data.current.weather.tp,
				});
			})
			.catch((err) => {
				console.error(err.message);
				setErrorInfo(err.message);
			});
	}, []);
	return (
		<main>
			{/* on affiche le loader en lui donnant la classe active si meteo est faux */}
			<div className={`loader-container ${!meteo && !errorInfo && "active"}`}>
				<img src={loader} alt="loading icon" />
			</div>

			{meteo && (
				<>
					<p className="city-name">{meteo.ville}</p>
					<p className="country-name">{meteo.pays}</p>
					<p className="temperature">{meteo.temperature}°</p>
					<div className="info-icon-container">
						<img
							src={`/icons/${meteo.icone}.svg`}
							className="info-icon"
							alt=""
						/>
					</div>
				</>
			)}

			{errorInfo && !meteo && (
				<>
					<p className="error-information">{errorInfo}</p>
					<img src={Browser} alt="error icon" />
				</>
			)}
		</main>
	);
}

export default App;
