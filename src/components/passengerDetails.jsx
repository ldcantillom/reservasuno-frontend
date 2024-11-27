import PropTypes from "prop-types";

const PassengerDetails = ({ passengers }) => {
  PassengerDetails.propTypes = {passengers: PropTypes.string.isRequired};
  return(
    <ul>
      {passengers.map((passenger, index) => (
        <li key={index}>
          {passenger.firstName} {passenger.lastName}
        </li>
      ))}
    </ul>
  );
};

export default PassengerDetails;