import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useIPDetailsStore } from "../../store/store";
import DropDownElementV2 from "./DropDownElementUpdated";

const ConDoctor = ({
  doctordetailslist,
  triggertoggle,
  setTriggertoggle,
  triggerreset,
}) => {
  // const [manualEntryTrigger, setmanualEntryTrigger] = useState(false);
  const [resetDropdown, setresetDropdown] = useState(true);

  const setippatientconsultingdoctor = useIPDetailsStore(
    (state) => state.setippatientconsultingdoctor
  );

  const consultingdoctorarr = useIPDetailsStore(
    (state) => state.ippatientdetails.consultingdoctor
  );
  useEffect(() => {
    setresetDropdown(!resetDropdown);
  }, [triggerreset]);

  return (
    <div className="fieldRow">
      <span className="patHeading">Consulting Doctor</span>
      <span className="star">*</span>
      {/* {manualEntryTrigger ? ( */}
      {/*      
      ) : ( */}
      <DropDownElementV2
        resetDropdown={resetDropdown}
        newddlist={doctordetailslist}
        setSelectedOption={setippatientconsultingdoctor}
        selectedoption={consultingdoctorarr}
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

export default ConDoctor;
