// import React, { useEffect, useState } from "react";
import { usePatientIDStore } from "../../store/store";
import { useNavigate } from "react-router-dom";
import { CardDetails } from "../../models/Configure";
var _ = require("lodash");

export const CardDisplay = ({
  // displaykey,
  // setvisitingpatientid,
  // setcardkey,
  // cardkey,
  data,
  CardHeader,
  displayheader = false,
  triggerPrint,
  displayprintbutton = false,
  displayOPVisitbutton = false,
  displayIPVisitbutton = false,
  displayOPLabbutton = false,
  // displayradiobutton = false,
}) => {
  const navigate = useNavigate();

  const setpatientID = usePatientIDStore((state) => state.setpatientID);

  const navigateToCreateVisitOP = () => {
    navigate("/reception/createvisit/OP", { replace: true });
  };
  const navigateToCreateVisitIP = () => {
    navigate("/reception/createvisit/IP", { replace: true });
  };
  const navigateToOPBilling = () => {
    navigate("/reception/createinvoice/OP", { replace: true });
  };

  if (_.isEmpty(data)) {
    <div className="nodatacard" />;
  } else {
    return (
      <div
        className="cardcontainer"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          // if (displayradiobutton) {
          // setcardkey(displaykey);
          setpatientID(`${data[CardDetails.PatientID]}`); // The patient id field needs to remain with the name data["Patient ID: "]
          // }
        }}
      >
        {displayheader && <h1 className="cardheader">{CardHeader}</h1>}
        <div className="cardbody">
          <div className="cardbodysection1">
            {Object.keys(data).map((item, idx) => {
              return (
                <div className="data-group" key={idx}>
                  <span className="data-label">{item}:</span>
                  <span className="data-value">{data[item]}</span>
                </div>
              );
            })}
          </div>
          {/* <div className="flex flex-row gap-3 items-center justify-center"> */}
          <div className="flex flex-row gap-2 items-center justify-center">
            {displayprintbutton && (
              <button
                className="text-sm cardprintbutton  shadow"
                onClick={(e) => {
                  e.stopPropagation();
                  // navigateToCreateVisitOP();
                  triggerPrint();
                  // console.log("Printing.....");
                }}
              >
                Print
              </button>
            )}
            {displayOPVisitbutton && (
              <button
                className="text-sm cardprintbutton  shadow "
                onClick={(e) => {
                  // e.stopPropagation();
                  navigateToCreateVisitOP();
                  // console.log("Create OP Visit");
                }}
              >
                OP Visit
              </button>
            )}
            {displayIPVisitbutton && (
              <button
                className="text-sm cardprintbutton  shadow "
                onClick={(e) => {
                  // e.stopPropagation();
                  navigateToCreateVisitIP();
                  // console.log("Create IP Visit");
                }}
              >
                IP Visit
              </button>
            )}
            {displayOPLabbutton && (
              <button
                className="text-sm cardprintbutton  shadow "
                onClick={(e) => {
                  // e.stopPropagation();
                  navigateToOPBilling();
                  // console.log("Create OP Lab bill");
                }}
              >
                OP Lab
              </button>
            )}
          </div>
          {/* {displayradiobutton && (
              <div className="print-button">
                <input
                  type="radio"
                  value={data["Patient id"]}
                  checked={cardkey === displaykey}
                  readOnly
                />
              </div>
            )} */}
          {/* </div> */}
        </div>
      </div>
    );
  }
};
