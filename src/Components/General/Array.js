import React, { useState, useEffect } from "react";
import { RawData } from "./RawData";
import "./Array.css";
function Array({ FormData }) {
  // console.log(FormData);
  const [selectKey, setKey] = useState("");
  const [data, setData] = useState({});
  const [selectedPatient, setSelectedPatient] = useState([]);

  useEffect(() => {
    setData(FormData);
  }, [FormData]);

  const checkPatientId = (patientId) => {
    return Object.values(RawData).some((patient) => patient.id === patientId);
  };

  const checkPatientPhoneNumber = (patientPN) => {
    return Object.values(RawData).some((patient) => patient.mnum === patientPN);
  };

  const handlePatientSelect = (event) => {
    setSelectedPatient(event.target.value);
    // console.log(typeof event.target.value);
    // console.log(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(selectedPatient);
  };

  return (
    <div>
      <form style={{ display: "Flex", flexDirection: "column" }}>
        {/* {Object.entries(data).map(([key, value]) => { */}
        {// console.log(RawData)}
        {RawData.filter((data) => {
          return data.found === true
            ? data.data[0].mobilenum === "8638242343"
            : false;
        }).map((item, key) => {
          // if (checkPatientId(value) || checkPatientPhoneNumber(value)) {
          const ID = item.data[0].patientid;
          const NAME = item.data[0].patientname;
          const NUM = item.data[0].mobilenum;
          const age = item.data[0].age;
          return (
            <div key={key}>
              <br />
              <label class="form-control">
                <div class="w3-row w3-container dush">
                  <div class="w3-col s2  w3-center boxx boxx1">
                    <p>
                      {" "}
                      <input
                        type="radio"
                        name="radio"
                        // value={"id": item.id, name: item.name, phno: item.mnum}
                        value={JSON.stringify(item)}
                        onChange={(e) => {
                          setKey(key);
                          handlePatientSelect(e);
                        }}
                        checked={selectKey === key}
                        // checked={selectedPatient === key}
                        // onChange={handlePatientSelect}
                      />{" "}
                      ID:{ID}
                    </p>
                  </div>
                  <div class="w3-col s3 w3-center boxx">
                    <p>{NAME}</p>
                  </div>
                  <div class="w3-col s4  w3-center boxx">
                    <p>{NUM}</p>
                  </div>
                  <div class="w3-col s3  w3-center boxx boxx2">
                    <p>AGE: {age}</p>
                  </div>
                </div>
                {/* <input
                  type="radio"
                  name="radio"
                  // value={"id": item.id, name: item.name, phno: item.mnum}
                  value={JSON.stringify(item)}
                  onChange={(e) => {
                    setKey(key);
                    handlePatientSelect(e);
                  }}
                  checked={selectKey === key}
                  // checked={selectedPatient === key}
                  // onChange={handlePatientSelect}
                />
                ID:{item.id} || NAME:{item.name} || MOBILE NUMBER:{item.mnum} */}
              </label>
            </div>
          );
          //}
          //return null;
        })}
      </form>

      <button onClick={handleSubmit} className="button-40" role="button">
        Submit
      </button>
    </div>
  );
}

export default Array;
