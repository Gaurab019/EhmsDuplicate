import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useState, useEffect } from "react";
import DropDownElement from "./DropDownElement";

const DutyDoctorDD = ({
  searchDoc,
  setsearchDoc,
  newddlist,
  setSelectedOption,
  triggertoggle,
  setTriggertoggle,
  triggerreset,
}) => {
  const [manualEntryTrigger, setmanualEntryTrigger] = useState(false);
  const [resetDropdown, setresetDropdown] = useState(true);

  useEffect(() => {
    setSelectedOption("");
    setsearchDoc("");
    // console.log(resetDropdown);
    setresetDropdown(!resetDropdown);
  }, [triggerreset]);
  const x = [
    {
      value: "Duty Doctor 1",
      label: "Duty Doctor 1",
    },
    {
      value: "Duty Doctor 2",
      label: "Duty Doctor 2",
    },
  ];
  return (
    <div className="fieldRow">
      <span className="patHeading">Duty Doctor</span>
      <span className="star">*</span>
      {/* {manualEntryTrigger ? ( */}
      {/*      
      ) : ( */}
      <DropDownElement
        resetDropdown={resetDropdown}
        newddlist={x}
        setSelectedOption={setSelectedOption}
      />

      {/* <input
          type="text"
          className="RecInp dropdowncontainer"
          placeholder="Consulting Doctor"
          value={searchDoc.toUpperCase()}
          onChange={(e) => {
            setsearchDoc(e.target.value);
          }}
        /> */}
      {/*         
      )} */}
      <span className="refreshicon iconstyle">
        {/* <span
          className="refreshbutton iconstyle"
          onClick={(e) => {
            // // console.log("refresh");
            e.preventDefault();
            e.stopPropagation();
            setTriggertoggle(!triggertoggle);
          }}
        >
          <FiRefreshCcw />
          <span>Refresh</span>
        </span> */}
        {/* 
        <div className="refreshbutton iconstyle">
          <input
            type="checkbox"
            defaultChecked={manualEntryTrigger}
            id="ManualEntry"
            onChange={(e) => {
              // console.log(e.target.checked);
              setSelectedOption("");
              setsearchDoc("");
              setmanualEntryTrigger(e.target.checked);
            }}
          />
          <label htmlFor="ManualEntry">Manual Entry</label>
        </div> */}
      </span>
    </div>
  );
};

export default DutyDoctorDD;
