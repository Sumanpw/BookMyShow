import React, { useContext } from 'react';
import { seats } from '../data'; 
import SeatInputs from './SeatInputs'; 
import '../Css/SelectSeats.css'
import BsContext from '../Context/BsContext';

const SelectSeat = () => {
const context=useContext(BsContext)
const { noOfSeat, changeNoOfSeats } = context;

  return (
    <div className="SS_wrapper">
      <h1 className="SS_heading">Select seat:</h1>
      <div className="SS_main_container">
        {seats.map((el, index) => {
          return <SeatInputs
                seat={seats}
                key={index}
                index={index}
                noOfSeat={noOfSeat}
                text={el}
                changeNoOfSeats={changeNoOfSeats}
              />
        })}
      </div>
    </div>
  );
};

export default SelectSeat;
