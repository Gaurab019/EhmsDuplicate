import React from "react";
// import {Link} from 'react-router-dom'
import { Route, Routes } from "react-router-dom";
import CreateVisitOP from "./CreateVisitOP";
import CreateVisitIP from "./CreateVisitIP";
import "../../Pages/Reception/Reception.css";
function CreateVisitButtons({
  newddlist,
  triggertoggle,
  setTriggertoggle,
  inPatientCodes,
}) {
  return (
    <div className="[height:100%] [width:100%]">
      <Routes>
        <Route
          path="/OP"
          element={
            <CreateVisitOP
              newddlist={newddlist}
              triggertoggle={triggertoggle}
              setTriggertoggle={setTriggertoggle}
            />
          }
        />
        <Route
          path="/IP"
          element={
            <CreateVisitIP
              newddlist={newddlist}
              triggertoggle={triggertoggle}
              setTriggertoggle={setTriggertoggle}
              inPatientCodes={inPatientCodes}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default CreateVisitButtons;
