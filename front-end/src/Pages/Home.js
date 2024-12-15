import LastBookingDetails from "../Components/LastBookingDetails";
import SelectMovie from "../Components/SelectMovie";
import SelectSeats from "../Components/SelectSeat";
import TimeShedule from "../Components/TimeSchedule";
import Modal from "../Components/ModalComponent";
import "../Css/Home.css";
import BsContext from "../Context/BsContext";
import { useContext } from "react";

const Home = () => {
  const context = useContext(BsContext);
  const {
    movie,
    time,
    noOfSeat,
    handlePostBooking,
    setErrorPopup,
    setErrorMessage,
  } = context;


  const checkNegativeSeatsValidity = (seats) => {
    return Object.values(seats).some(seat => Number(seat) < 0);
  };

  const checkZeroSeatsValidity = (seats) => {
    return Object.values(seats).every(seat => Number(seat) === 0);
  };

  
  const validateBooking = () => {
    if (!movie) {
      setErrorPopup(true);
      setErrorMessage("Please select a movie!");
      return false;
    } else if (!time) {
      setErrorPopup(true);
      setErrorMessage("Please select a time slot!");
      return false;
    } else if (checkNegativeSeatsValidity(noOfSeat) || checkZeroSeatsValidity(noOfSeat)) {
      setErrorPopup(true);
      setErrorMessage("Invalid Seats!");
      return false;
    }
    return true;
  };

  // Handle the booking request
  const handleBookNow = () => {
    if (validateBooking()) {
      handlePostBooking();
    }
  };

  // Disable "Book Now" button if validation fails
  const isBookNowDisabled = !movie || !time || checkNegativeSeatsValidity(noOfSeat) || checkZeroSeatsValidity(noOfSeat);

  return (
    <>
      <Modal />
      <div className="container">
        <div className="selection_container">
          <div className="wrapper">
            <div className="select_movie_component">
              <SelectMovie />
            </div>
            <div className="last_booking_details_container">
              <LastBookingDetails />
            </div>
          </div>
          <div className="time_seats_container">
            <TimeShedule />
            <SelectSeats />
            <button
              onClick={handleBookNow}
              className="BN-btn"
              disabled={isBookNowDisabled}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
