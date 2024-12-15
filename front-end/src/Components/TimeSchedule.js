import React, { useContext } from "react";
import RadioComponent from "./RadioComponent";
import { slots } from "../data";
import "../Css/TimeSchedule.css";
import BsContext from "../Context/BsContext";

const TimeShedule = () => {
  const context = useContext(BsContext);


  const { time, changeTime } = context;

  const handleChangeTime = (value) => {
    changeTime(value);

    
    window.localStorage.setItem("slot", value);
  };

  return (
    <>
      <div className="Slot_container">
        <h1 className="TS_heading">Select a Schedule :-</h1>
        <div className="TS_main_container">
          {slots.map((el, index) => {
            return (
              <RadioComponent
                text={el}
                changeSelection={handleChangeTime}
                data={time}
                key={index}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default TimeShedule;