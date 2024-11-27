import { useRef, useState } from "react";
import "./../styles/FlightBookingHome.scss";

const ReserveFlight = () => {
  const form = useRef(null);
  const [message, setMessage] = useState('');
  const [reserves, setReserves] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(form.current);
    const identificationNumber = formData.get('identificationNumber');

    if (!identificationNumber) {
      setMessage('Por favor, ingrese un código de cliente válido.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token no encontrado. Inicie sesión nuevamente.");
      }

      const response = await fetch(`http://localhost:8080/api/v1/reserves`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("Unauthorized. Por favor, inicia sesión nuevamente.");
          return;
        }
        throw new Error("Error al obtener las reservas.");
      }

      const data = await response.json();

      // Filtra las reservas cuyos pasajeros incluyan al número de identificación dado
      const filteredReserves = data.filter(reserve =>
        reserve.passengers.some(
          passenger => passenger.identificationNumber === identificationNumber
        )
      );

      // Modifica las reservas para incluir solo los pasajeros con ese número de identificación
      const reservesWithPassengers = filteredReserves.map(reserve => ({
        ...reserve,
        passengers: reserve.passengers.filter(
          passenger => passenger.identificationNumber === identificationNumber
        ),
      }));

      setReserves(reservesWithPassengers);
      setMessage('');
    } catch (error) {
      setMessage(error.message || 'An error occurred. Please try again.');
      setReserves([]);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flight-home">

      <section className="search-section">
        <div className="search-container">
          <form className="search-form" ref={form}>
            <div className="input-group">
              <label>Código de cliente:</label>
              <input
                type="text"
                name="identificationNumber"
                placeholder="1082861728 (CC)"
              />
            </div>

            <button
              type="submit"
              className="search-button"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </form>
        </div>
      </section>

      <section className="results-list">
        {loading ? (
          <p>Cargando reservas...</p>
        ) : message ? (
          <p>{message}</p>
        ) : reserves.length > 0 ? (
          reserves.map((reserve) => (
            <div key={reserve.id} className="reserve-item">
              <h3>Reserva #{reserve.id}</h3>
              <p>Fecha de reserva: {reserve.reservationDate}</p>
              <p>Asientos: {reserve.numberOfSeats}</p>
              <p>Pasajeros:</p>
              <ul>
                {reserve.passengers.map((passenger) => (
                  <li key={passenger.id}>
                    {passenger.firstName} {passenger.lastName} - Identificación: {passenger.identificationNumber}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <p>No se encontraron reservas para este cliente.</p>
        )}
      </section>
    </div>
  );
};

export default ReserveFlight;
