import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Views/AdminDashboard";
import LabItemsPanel from "./Views/LabItemsPanel";
import "../../Pages/Reception/Reception.css";
import OtherItemsPanel from "./Views/OtherItemsPanel";
function AdminPanel(props) {
  // console.log("CreateBIllingButtons: ",props)
  return (
    <div className="[height:100%] [width:100%]">
      <Routes>
        {/* <Route
          path="/dashboard"
          element={
            <AdminDashboard
              newddlist={props.newddlist}
              triggertoggle={props.triggertoggle}
              setTriggertoggle={props.setTriggertoggle}
              billChargesTable={props.billChargesTable[0].labchargesdata}
            />
          }
        /> */}
        <Route
          path="/addlab"
          element={
            <LabItemsPanel
              newddlist={props.newddlist}
              triggertoggle={props.triggertoggle}
              setTriggertoggle={props.setTriggertoggle}
              billChargesTable={props.billChargesTable}
            />
          }
        />
        <Route
          path="/addOther"
          element={
            <OtherItemsPanel
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

export default AdminPanel;
