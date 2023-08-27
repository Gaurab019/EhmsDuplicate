import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useIPDetailsStore } from "../../store/store";
import DropDownElementV2 from "./DropDownElementUpdated";

const BedType = ({
  triggertoggle,
  setTriggertoggle,
  triggerreset,
  beddetailslist,
}) => {
  const [resetDropdown, setresetDropdown] = useState(true);

  const setippatientbedtypedetails = useIPDetailsStore(
    (state) => state.setippatientbedtypeid
  );
  const bedtypedetails = useIPDetailsStore(
    (state) => state.ippatientdetails.bedtypedetails
  );
  useEffect(() => {
    // console.log(resetDropdown);
    setresetDropdown(!resetDropdown);
  }, [triggerreset]);

  return (
    <div className="fieldRow">
      <span className="patHeading">Bed Type</span>
      <span className="star">*</span>
      {/* {manualEntryTrigger ? ( */}
      {/*      
      ) : ( */}
      <DropDownElementV2
        resetDropdown={resetDropdown}
        newddlist={beddetailslist}
        setSelectedOption={setippatientbedtypedetails}
        selectedoption={bedtypedetails}
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

export default BedType;
