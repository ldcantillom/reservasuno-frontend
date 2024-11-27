import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlightItem from "../components/flightItem";
import "./../styles/flightResult.scss";

const FlightResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [flights, setFlights] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { origin, destination, departureTime, arrivalTime, totalPassengers } =
        location.state || {};

    useEffect(() => {
        const fetchFlights = async () => {
            if (!origin || !destination) {
                setError("Datos de búsqueda incompletos.");
                setLoading(false);
                return;
            }

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error("No token found. Please log in.");
                }
                const response = await fetch("http://localhost:8080/api/v1/flights", {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    credentials: "include",
                });

                if (!response.ok) {
                    throw new Error("Error al obtener los vuelos.");
                }

                const data = await response.text(); // Obtener la respuesta como texto

                console.log("Respuesta del servidor:", data); // Ver la respuesta completa

                try {
                    const jsonData = JSON.parse(data); // Intentar parsear el JSON
                    const filteredFlights = jsonData.filter(
                        (flight) => flight.origin === origin && flight.destination === destination
                    );
                    setFlights(filteredFlights);
                } catch {
                    setError("Error al procesar los datos JSON.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFlights(); // Llamar a la función asíncrona

    }, [origin, destination]);

    const handleFlightSelect = (flightId) => {
        alert(`Has seleccionado el vuelo con ID: ${flightId}`);
    };

    if (loading) return <p>Cargando resultados...</p>;
    if (error)
        return (
            <div>
                <p>Error: {error}</p>
                <button onClick={() => navigate("/")}>Volver a la búsqueda</button>
            </div>
        );

    return (
        <div className="flight-results">
            <header className="results-header">
                <h2>
                    Resultados para: {origin} → {destination}
                </h2>
                <p>
                    Fecha de ida: {departureTime}{" "}
                    {arrivalTime ? `| Fecha de vuelta: ${arrivalTime}` : "| Sin retorno"} <br />
                    Pasajeros: {totalPassengers}
                </p>
                <button className="button type-2" onClick={() => navigate("/")}>Volver a buscar</button>
            </header>

            <section className="results-list">
                {flights.length > 0 ? (
                    flights.map((flight) => (
                        <FlightItem
                            key={flight.id}
                            flight={flight}
                            onSelect={handleFlightSelect}
                        />
                    ))
                ) : (
                    <p>No se encontraron vuelos para esta ruta.</p>
                )}
            </section>
        </div>
    );
};

export default FlightResults;
