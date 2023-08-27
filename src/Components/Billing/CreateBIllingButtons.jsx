import React from "react";
import { Route, Routes } from "react-router-dom";
import OutPatientBilling from "./OutPatientBilling";
import InPatientBilling from "./InPatientBilling";
import "../../Pages/Reception/Reception.css";
function CreateBIllingButtons(props) {
  // console.log("CreateBIllingButtons: ",props)
  return (
    <div className="[height:100%] [width:100%]">
      <Routes>
        <Route
          path="/OP"
          element={
            <OutPatientBilling
              newddlist={props.newddlist}
              triggertoggle={props.triggertoggle}
              setTriggertoggle={props.setTriggertoggle}
              billChargesTable={props.billChargesTable[0].labchargesdata}
            />
          }
        />
        <Route
          path="/IP"
          element={
            <InPatientBilling
              newddlist={props.newddlist}
              triggertoggle={props.triggertoggle}
              setTriggertoggle={props.setTriggertoggle}
              billChargesTable={props.billChargesTable}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default CreateBIllingButtons;
