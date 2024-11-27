import "./../styles/flightItem.scss";

const FlightItem = ({ flight, onSelect }) => {
  // Función para generar un precio aleatorio entre un rango de valores
  const generateRandomPrice = () => {
    const min = 100; // Precio mínimo
    const max = 1000; // Precio máximo
    return (Math.random() * (max - min) + min).toFixed(2); // Generar un precio aleatorio
  };

  // Generar el precio aleatorio
  const randomPrice = generateRandomPrice();

  return (
    <div className="flight-card">
      <div className="flight-info">
        <p>
          <strong>Origen:</strong> {flight.origin}
        </p>
        <p>
          <strong>Destino:</strong> {flight.destination}
        </p>
        <p>
          <strong>Hora de salida:</strong> {flight.departureTime}
        </p>
        <p>
          <strong>Hora de llegada:</strong> {flight.arrivalTime}
        </p>
        <p>
          <strong>Duración:</strong> {flight.duration}
        </p>
        <p>
          <strong>Precio:</strong> USD {randomPrice} {/* Mostrar el precio aleatorio */}
        </p>
        {!flight.returnTime && (
          <p>
            <strong>Retorno:</strong> Sin retorno
          </p>
        )}
      </div>
      <div className="flight-actions">
        <button onClick={() => onSelect(flight.id)}>Seleccionar</button>
      </div>
    </div>
  );
};

export default FlightItem;
