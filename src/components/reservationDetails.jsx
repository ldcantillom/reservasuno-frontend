import { useEffect, useState } from "react";
import PassengerDetails from "./passengerDetails";
import FlightDetails from "./flightDetails";

const ReservationDetails = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No token found. Please log in.");
        }

        const response = await fetch("http://localhost:8080/api/v1/reserves", {
          method: "GET",
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            throw new Error("Unauthorized: Please log in again.");
          } else if (response.status === 403) {
            throw new Error("Forbidden: You don't have access to this resource.");
          } else if (response.status === 404) {
            throw new Error("No reservations found.");
          } else {
            throw new Error("Failed to fetch reservations.");
          }
        }

        const data = await response.json();
        setReservations(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Your Reservations</h2>
      {reservations.length === 0 ? (
        <p>No reservations found</p>
      ) : (
        reservations.map((reservation) => (
          <div key={reservation.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <p><strong>Reservation ID:</strong> {reservation.id}</p>
            <p><strong>Date:</strong> {new Date(reservation.reservationDate).toLocaleString()}</p>
            <p><strong>Number of Seats:</strong> {reservation.numberOfSeats}</p>

            {reservation.passengers && (
              <>
                <h3>Passengers:</h3>
                <PassengerDetails passengers={reservation.passengers} />
              </>
            )}

            {reservation.flights && (
              <>
                <h3>Flights:</h3>
                <FlightDetails flights={reservation.flights} />
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReservationDetails;
