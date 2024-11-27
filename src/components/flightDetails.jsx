import PropTypes from "prop-types";

const FlightDetails = ({ flights }) => {
    FlightDetails.propTypes = {flights: PropTypes.string.isRequired};
    return (<ul>
      {flights.map((flight, index) => (
        <li key={index}>
          Flight: {flight.id} | Origin: {flight.origin} | Destination: 
          {flight.destination} | Date: {flight.departureTime}
        </li>
      ))}
    </ul>);
};

export default FlightDetails;