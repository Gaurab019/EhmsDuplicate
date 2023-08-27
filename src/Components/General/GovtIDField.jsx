import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useIPDetailsStore } from "../../store/store";
import DropDownElementV2 from "./DropDownElementUpdated";
// import DropDownElement from "./DropDownElement";

const GovtIDField = ({
  triggertoggle,
  setTriggertoggle,
  triggerreset,
  govtdetailslist,
}) => {
  const [resetDropdown, setresetDropdown] = useState(true);

  useEffect(() => {
    // console.log(resetDropdown);
    setresetDropdown(!resetDropdown);
  }, [triggerreset]);
  const setippatientgovtidtype = useIPDetailsStore(
    (state) => state.setippatientgovtidtype
  );
  const govttypedetails = useIPDetailsStore(
    (state) => state.ippatientdetails.govttypedetails
  );
  const setippatientgovtidvalue = useIPDetailsStore(
    (state) => state.setippatientgovtidvalue
  );
  const govtidvalue = useIPDetailsStore(
    (state) => state.ippatientdetails.govtidvalue
  );
  return (
    <div className="fieldRow">
      <span className="patHeading">Govt. ID</span>
      <span className="star">*</span>
      {/* {manualEntryTrigger ? ( */}
      {/*      
      ) : ( */}
      <DropDownElementV2
        resetDropdown={resetDropdown}
        newddlist={govtdetailslist}
        setSelectedOption={setippatientgovtidtype}
        selectedoption={govttypedetails}
      />

      <input
        type="text"
        className="RecInp dropdowncontainer"
        placeholder="ID"
        value={govtidvalue.toUpperCase()}
        maxLength={24}
        onChange={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setippatientgovtidvalue(e.target.value);
        }}
      />
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

export default GovtIDField;
