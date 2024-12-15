import React, { useState, useEffect } from "react";
import BsContext from "./BsContext";

const BsState = (props) => {
  const [errorPopup, setErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [time, changeTime] = useState(""); 
  const [movie, changeMovie] = useState(""); 
  const [noOfSeat, changeNoOfSeats] = useState({
    A1: "",
    A2: "",
    A3: "",
    A4: "",
    D1: "",
    D2: "",
  });
  const [lastBookingDetails, setLastBookingDetails] = useState(null);

  
  const handlePostBooking = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movie, slot: time, seats: noOfSeat }),
      });

      const data = await response.json();


      setErrorPopup(true);
      setErrorMessage(data.message);

      if (response.ok) {
        
        changeTime("");
        changeMovie("");
        changeNoOfSeats({
          A1: "",
          A2: "",
          A3: "",
          A4: "",
          D1: "",
          D2: "",
        });
        setLastBookingDetails(data.data);

      
        window.localStorage.removeItem("movie");
        window.localStorage.removeItem("slot");
        window.localStorage.removeItem("seats");
      }
    } catch (error) {
      setErrorPopup(true);
      setErrorMessage("An error occurred while processing your booking.");
      console.error("Error posting booking:", error);
    }
  };

  
  const handleGetLastBooking = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/booking`, {
        method: "GET",
      });

      const data = await response.json();

      
      setLastBookingDetails(data.data);
    } catch (error) {
      console.error("Error fetching last booking details:", error);
    }
  };

  useEffect(() => {
    const storedMovie = window.localStorage.getItem("movie");
    const storedSlot = window.localStorage.getItem("slot");
    const storedSeats = JSON.parse(window.localStorage.getItem("seats"));

    if (storedMovie) changeMovie(storedMovie);
    if (storedSlot) changeTime(storedSlot);
    if (storedSeats) changeNoOfSeats(storedSeats);
  }, []);

  return (
    <BsContext.Provider
      value={{
        handlePostBooking,
        handleGetLastBooking,
        movie,
        changeMovie,
        time,
        changeTime,
        noOfSeat,
        changeNoOfSeats,
        lastBookingDetails,
        errorPopup,
        setErrorPopup,
        errorMessage,
        setErrorMessage,
      }}
    >
      {props.children}
    </BsContext.Provider>
  );
};

export default BsState;
