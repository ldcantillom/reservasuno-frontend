import { useState } from "react";
import "./../styles/flightBookingHome.scss";
import { useNavigate } from "react-router-dom";

const FlightBookingHome = () => {
  const [tripType, setTripType] = useState("round");
  const [showPassengerModal, setShowPassengerModal] = useState(false);
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState({
    adults: 1,
    teens: 0,
    children: 0,
    babies: 0,
  });
  const [formData, setFormData] = useState({
    origin: "",
    destination: "",
    departureTime: "",
    arrivalTime: "",
  });

  const updatePassengerCount = (type, operation) => {
    setPassengers((prev) => {
      const newCount = operation === "increment" ? prev[type] + 1 : prev[type] - 1;
      return {
        ...prev,
        [type]: Math.max(newCount, 0), // Evitar números negativos
      };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const totalPassengers =
      passengers.adults +
      passengers.teens +
      passengers.children +
      passengers.babies;

    navigate("/flight-results", {
      state: {
        ...formData,
        totalPassengers,
      },
    });
  };

  return (
    <div className="flight-home">
      <section className="search-section">
        <div className="search-container">
          <div className="search-toggle">
            <label>
              <input
                type="radio"
                name="trip"
                value="round"
                checked={tripType === "round"}
                onChange={() => setTripType("round")}
              />{" "}
              <span>Ida y vuelta</span>
            </label>
            <label>
              <input
                type="radio"
                name="trip"
                value="one-way"
                checked={tripType === "one-way"}
                onChange={() => setTripType("one-way")}
              />{" "}
              <span>Solo ida</span>
            </label>
          </div>
          <form onSubmit={handleSearch}>
            <div className="search-form">
              <div className="input-group">
                <label>Origen:</label>
                <input
                  type="text"
                  name="origin"
                  placeholder="Origen"
                  value={formData.origin}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Destino:</label>
                <input
                  type="text"
                  name="destination"
                  placeholder="Destino"
                  value={formData.destination}
                  onChange={handleInputChange}
                />
              </div>
              <div className="input-group">
                <label>Ida:</label>
                <input
                  type="date"
                  name="departureTime"
                  value={formData.departureTime}
                  onChange={handleInputChange}
                />
              </div>
              {tripType === "round" && (
                <div className="input-group">
                  <label>Vuelta:</label>
                  <input
                    type="date"
                    name="arrivalTime"
                    value={formData.arrivalTime}
                    onChange={handleInputChange}
                  />
                </div>
              )}
              <div className="input-group">
                <label>Pasajeros:</label>
                <button
                  type="button"
                  className="passenger-button"
                  onClick={() => setShowPassengerModal(!showPassengerModal)}
                >
                  <i className="fa-solid fa-user-plus"></i>
                  {passengers.adults +
                    passengers.teens +
                    passengers.children +
                    passengers.babies}{" "}
                  pasajeros
                </button>
              </div>
            </div>

            <button type="submit" className="search-button">
              Buscar
            </button>
          </form>
        </div>
      </section>

      {/* Mostrar resultados */}

      {showPassengerModal && (
        <div className="passenger-modal">
          <div className="passenger-modal-content">
            <h3>¿Quiénes vuelan?</h3>
            {["adults", "teens", "children", "babies"].map((type) => (
              <div className="passenger-row" key={type}>
                <span>
                  {type === "adults" && "Adultos (15+ años)"}
                  {type === "teens" && "Jóvenes (12-14 años)"}
                  {type === "children" && "Niños (2-11 años)"}
                  {type === "babies" && "Bebés (0-2 años)"}
                </span>
                <button
                  onClick={() => updatePassengerCount(type, "decrement")}
                  disabled={passengers[type] <= 0}
                >
                  -
                </button>
                <span>{passengers[type]}</span>
                <button onClick={() => updatePassengerCount(type, "increment")}>
                  +
                </button>
              </div>
            ))}
            <button
              className="confirm-button"
              onClick={() => setShowPassengerModal(false)}
            >
              Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightBookingHome;
