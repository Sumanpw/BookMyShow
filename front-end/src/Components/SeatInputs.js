import React from 'react';
import '../Css/SeatInputs.css';

const SeatInputs = ({ text, noOfSeat, changeNoOfSeats }) => {
  const change_seats = (e) => {
    const updatedSeats = {
      ...noOfSeat,
      [e.target.name]: Number(e.target.value) || 0, 
    };

    
    changeNoOfSeats(updatedSeats);

  
    window.localStorage.setItem("seats", JSON.stringify(updatedSeats));
  };

  return (
    <div className="form-check-label">
      <span className="text">{text}</span>
      <input
        type="number"
        className="seats-input"
        placeholder="0"
        max="20"
        min="0"
        name={text}
        onChange={change_seats}
        value={noOfSeat[text] || ""}
      />
    </div>
  );
};

export default SeatInputs;
