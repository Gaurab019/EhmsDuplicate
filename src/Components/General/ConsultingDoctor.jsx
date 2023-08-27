import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useState, useEffect } from "react";
import DropDownElement from "./DropDownElement";
var _ = require("lodash");

const ConsultingDoctor = ({
  searchDoc,
  setsearchDoc,
  newddlist,
  setSelectedOption,
  triggertoggle,
  setTriggertoggle,
  triggerreset,
  selectedoption,
  manualEntryTrigger,
  setmanualEntryTrigger,
  showmanualentrytrigger = false,
}) => {
  const [resetDropdown, setresetDropdown] = useState(true);
  // const [defaultdoctorvalue, setDefaultdoctorvalue] = useState("");
  // console.log(manualEntryTrigger);

  useEffect(() => {
    setSelectedOption("");
    setsearchDoc("");
    // console.log(resetDropdown);
    setresetDropdown(!resetDropdown);
  }, [triggerreset]);

  // useEffect(() => {
  //   // console.log("selected option triggered");
  //   if (_.isUndefined(selectedoption)) {
  //     setDefaultdoctorvalue("");
  //   } else {
  //     setDefaultdoctorvalue(selectedoption);
  //   }
  // }, [selectedoption]);

  return (
    <div className="fieldRow">
      <span className="patHeading">Consulting Doctor</span>
      <span className="star">*</span>
      {/* {manualEntryTrigger ? (
        <input
          type="text"
          className="RecInp dropdowncontainer"
          placeholder="Consulting Doctor"
          value={searchDoc.toUpperCase()}
          onChange={(e) => {
            setsearchDoc(e.target.value);
          }}
        />
      ) : ( */}
      <DropDownElement
        selectedoption={selectedoption}
        resetDropdown={resetDropdown}
        newddlist={newddlist}
        setSelectedOption={setSelectedOption}
      />
      {/* )} */}
      <span className="refreshicon iconstyle">
        <span
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
        </span>

        {showmanualentrytrigger ? (
          <div className="refreshbutton iconstyle font-light">
            <input
              type="checkbox"
              defaultChecked={false}
              checked={manualEntryTrigger}
              id="ManualEntry"
              onChange={(e) => {
                // console.log(e.target.checked);
                setSelectedOption("");
                setsearchDoc("");
                setmanualEntryTrigger(e.target.checked);
              }}
            />
            <label
              htmlFor="ManualEntry"
              className="font-semibold text-purple-700"
            >
              Manual Amount Entry
            </label>
          </div>
        ) : (
          <></>
        )}
      </span>
    </div>
  );
};

export default ConsultingDoctor;
