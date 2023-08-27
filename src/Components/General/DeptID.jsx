import React from "react";
import { FiRefreshCcw } from "react-icons/fi";
import { useState, useEffect } from "react";
import { useIPDetailsStore } from "../../store/store";
import DropDownElementV2 from "./DropDownElementUpdated";

const DeptID = ({
  departmentdetails,
  triggertoggle,
  setTriggertoggle,
  triggerreset,
}) => {
  // const [manualEntryTrigger, setmanualEntryTrigger] = useState(false);
  const [resetDropdown, setresetDropdown] = useState(true);

  const setippatientdeptdetails = useIPDetailsStore(
    (state) => state.setippatientdeptid
  );

  const deptdetails = useIPDetailsStore(
    (state) => state.ippatientdetails.deptdetails
  );
  useEffect(() => {
    setresetDropdown(!resetDropdown);
  }, [triggerreset]);

  return (
    <div className="fieldRow">
      <span className="patHeading">DEPARTMENT</span>
      <span className="star">*</span>
      {/* {manualEntryTrigger ? ( */}
      {/*      
      ) : ( */}
      <DropDownElementV2
        resetDropdown={resetDropdown}
        newddlist={departmentdetails}
        setSelectedOption={setippatientdeptdetails}
        selectedoption={deptdetails}
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

export default DeptID;
