import React from "react";
import "./Reception.css";
import SideBar from "../../Components/General/Sidebar";
// import CreateInvoice from "../../Components/Lab/createInvoice";
// import FormDetails from "../../Components/FormDetails";
import { Con } from "../../models/Configure";
import { Route, Routes } from "react-router-dom";
import NewPatient from "../../Components/Reception/NewPatient";
import SearchPatient from "../../Components/Reception/SearchPatient";
//import CreateVisit from "../../Components/Reception/CreateVisitOP";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTokenStore } from "../../store/store";
import { usePasswordStore } from "../../store/store";
import { useUsernameStore } from "../../store/store";
import { useDoctorStore } from "../../store/store";
import { useBillChargesStore } from "../../store/store";
import { useInPatientCodeStore } from "../../store/store";
// import CrateIPOP from "../../Components/Reception/CreateIPOP";
import CreateVisitButtons from "../../Components/Reception/CreateVisitButtons";
import CreateBIllingButtons from "../../Components/Billing/CreateBIllingButtons";
import AdminPanel from "../../Components/Admin/AdminPanel";
var _ = require("lodash");

function Reception() {
  const SideBarInfo1 = Con.Reception.SideBarInfo1;
  const SideBarInfo2 = Con.Reception.SideBarInfo2;
  const parentPath = Con.Reception.parentPath;
  const setpassword = usePasswordStore((state) => state.setpassword);
  const setusername = useUsernameStore((state) => state.setusername);
  const token = useTokenStore((state) => state.token.token);
  const setToken = useTokenStore((state) => state.setToken);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const doctorarr = useDoctorStore((state) => state.doctors.data);
  const Docstatuscode = useDoctorStore((state) => state.doctors.statuscode);
  const fetchalldoctors = useDoctorStore((state) => state.fetchalldoctors);
  const username = useUsernameStore((state) => state.username);
  const password = usePasswordStore((state) => state.password);
  const billChargesTable = useBillChargesStore(
    (state) => state.billCharges.data
  );
  const BillChargesStatusCode = useBillChargesStore(
    (state) => state.billCharges.statuscode
  );
  const fetchBillChargesTable = useBillChargesStore(
    (state) => state.fetchBillChargesTable
  );
  const inpatientCodeData = useInPatientCodeStore(
    (state) => state.inpatientcodetables.data
  );
  const inpatientCodeDataStatusCode = useInPatientCodeStore(
    (state) => state.inpatientcodetables.statuscode
  );
  const fetchInPatientCodeTable = useInPatientCodeStore(
    (state) => state.fetchInPatientCodeTable
  );

  const [newddlist, setnewddlist] = useState([]);
  const [beddetailslist, setbeddetailslist] = useState([]);
  const [govtdetailslist, setgovtdetailslist] = useState([]);
  const [departmentsvalueslist, setdepartmentsvalueslist] = useState([]);
  const [triggertoggle, setTriggertoggle] = useState(false);
  const [billChargesTableLab, setbillChargesTableLab] = useState({});

  const navigate = useNavigate();
  const getAllDoctordata = async () =>
    await fetchalldoctors(process.env.REACT_APP_GetAllDoctors, token);

  const getAllCharges = async () =>
    await fetchBillChargesTable(process.env.REACT_APP_BillChargesTable, token);

  const getAllInPatientCodes = async () =>
    await fetchInPatientCodeTable(
      process.env.REACT_APP_InPatientCodeTables,
      token
    );

  const getTokenData = async () =>
    await fetchnewToken(process.env.REACT_APP_GetTokenURL, username, password);
  const logout = () => {
    setpassword("");
    setusername("");
    setToken("");
  };

  useEffect(() => {
    if (_.isNull(token) || _.isUndefined(token) || token == "") {
      // console.log("No Token");
      navigate("/", {
        replace: true,
      });
    } else if (username == "" || password == "") {
      setToken("");
    } else {
      // console.log("token found");

      // console.log("data update called from first useeffect section");
      // getAllDoctordata();
      // getAllCharges();
      // getAllInPatientCodes();
      navigate(`${parentPath}/newPatient`);
    }
  }, []);
  useEffect(() => {
    // console.log("reload useEffect triggered");
    if (_.isNull(token) || _.isUndefined(token) || token == "") {
    } else {
      let ddlist = [];
      let departmentsvalueslist = [];
      let beddetailslist = [];
      let govtdetailslist = [];
      // // console.log("inner function called");
      // // console.log(doctorarr);
      // // console.log("billChargesTable from reception1: ", billChargesTable);
      if (
        Docstatuscode == 401 &&
        BillChargesStatusCode == 401 &&
        inpatientCodeDataStatusCode == 401
      )
        getTokenData();
      // if (BillChargesStatusCode == 401) getTokenData();
      // if (inpatientCodeDataStatusCode == 401) getTokenData();
      if (!_.isEmpty(doctorarr)) {
        doctorarr.map((item) => {
          if (item.doctorname.toUpperCase() == "SELF") {
            ddlist.push({
              value: JSON.stringify(item),
              label: `${item.doctorname.toUpperCase()}`,
            });
          } else if (item.doctorname.toUpperCase() == "GENERIC") {
          } else {
            ddlist.push({
              value: JSON.stringify(item),
              label: `DR. ${item.doctorname.toUpperCase()}`,
            });
          }
        });
      }
      setnewddlist(ddlist);
      if (!_.isEmpty(billChargesTable)) {
        setbillChargesTableLab(billChargesTable[0].labchargesdata);
      }
      // // console.log(ddlist);
      if (!_.isEmpty(inpatientCodeData)) {
        // set bed details list for drop down

        if (!_.isEmpty(inpatientCodeData[5].beddetails)) {
          inpatientCodeData[5].beddetails.map((item) => {
            beddetailslist.push({
              value: JSON.stringify(item),
              label: `${item.RoomType.toUpperCase()} - Rs ${item.cost}`,
            });
          });
        }
        // // console.log(beddetailslist);
        setbeddetailslist(beddetailslist);

        // set department value details list for drop down

        if (!_.isEmpty(inpatientCodeData[4].departmentsvalues)) {
          inpatientCodeData[4].departmentsvalues.map((item) => {
            departmentsvalueslist.push({
              value: JSON.stringify(item),
              label: `${item.departmentname.toUpperCase()}`,
            });
          });
        }
        // // console.log(departmentsvalueslist);
        setdepartmentsvalueslist(departmentsvalueslist);

        // set government id type value details list for drop down

        if (!_.isEmpty(inpatientCodeData[6].govtidtypes)) {
          inpatientCodeData[6].govtidtypes.map((item) => {
            govtdetailslist.push({
              value: JSON.stringify(item),
              label: `${item.govtidtypename.toUpperCase()}`,
            });
          });
        }
        // // console.log(govtdetailslist);
        setgovtdetailslist(govtdetailslist);
      }
    }
  }, [
    // doctorarr,
    // billChargesTable,
    Docstatuscode,
    BillChargesStatusCode,
    inpatientCodeDataStatusCode,
  ]);

  // useEffect(() => {
  //   if (_.isNull(token) || _.isUndefined(token) || token == "") {
  //   } else {
  //     let departmentsvalueslist = [];
  //     let beddetailslist = [];
  //     let govtdetailslist = [];
  //     // console.log("inner function called");
  //     // console.log(inpatientCodeData);
  //     if (inpatientCodeDataStatusCode == 401) getTokenData();

  //     if (!_.isEmpty(inpatientCodeData)) {
  //       // set bed details list for drop down

  //       if (!_.isEmpty(inpatientCodeData[5].beddetails)) {
  //         inpatientCodeData[5].beddetails.map((item) => {
  //           beddetailslist.push({
  //             value: JSON.stringify(item),
  //             label: `${item.RoomType.toUpperCase()} - Rs ${item.cost}`,
  //           });
  //         });
  //       }
  //       // // console.log(beddetailslist);
  //       setbeddetailslist(beddetailslist);

  //       // set department value details list for drop down

  //       if (!_.isEmpty(inpatientCodeData[4].departmentsvalues)) {
  //         inpatientCodeData[4].departmentsvalues.map((item) => {
  //           departmentsvalueslist.push({
  //             value: JSON.stringify(item),
  //             label: `${item.departmentname.toUpperCase()}`,
  //           });
  //         });
  //       }
  //       // // console.log(departmentsvalueslist);
  //       setdepartmentsvalueslist(departmentsvalueslist);

  //       // set government id type value details list for drop down

  //       if (!_.isEmpty(inpatientCodeData[6].govtidtypes)) {
  //         inpatientCodeData[6].govtidtypes.map((item) => {
  //           govtdetailslist.push({
  //             value: JSON.stringify(item),
  //             label: `${item.govtidtypename.toUpperCase()}`,
  //           });
  //         });
  //       }
  //       // // console.log(govtdetailslist);
  //       setgovtdetailslist(govtdetailslist);
  //     }
  //   }
  // }, [
  //   // inpatientCodeData,
  //   // Docstatuscode,
  //   // BillChargesStatusCode,
  //   inpatientCodeDataStatusCode,
  // ]);
  // // console.log("doctor List from Reception ", newddlist);

  useEffect(() => {
    if (_.isNull(token) || _.isUndefined(token) || token == "") {
      // console.log("No Token");
      navigate("/", {
        replace: true,
      });
    } else if (
      Docstatuscode == 401 ||
      BillChargesStatusCode == 401 ||
      inpatientCodeDataStatusCode == 401
    ) {
      // console.log("data update called from token update section");
      setTriggertoggle(!triggertoggle);
    }
  }, [token]);

  useEffect(() => {
    if (_.isNull(token) || _.isUndefined(token) || token === "") {
    } else {
      if (username === "" || password === "") {
        setToken("");
      } else {
        // console.log("data update called from trigger toggle section");
        // console.log("Trigger Value: ", triggertoggle);
        getAllDoctordata();
        getAllCharges();
        getAllInPatientCodes();
        // // console.log("token found");
      }
    }
  }, [triggertoggle]);
  // // console.log(
  //   "billChargesTable from reception: ",
  //   billChargesTable,
  //   " : ",
  //   billChargesTableLab
  // );
  // billChargesTable
  return (
    <div className="flex justify-between items-center [width:100vw] [height:100vh] bg-[#ffffff]">
      <div className="flex flex-col box-border [height:100vh] relative min-w-[20vw] xl:min-w-[15vw]">
        <SideBar
          Info1={SideBarInfo1}
          Info2={SideBarInfo2}
          parentPath={parentPath}
          logout={logout}
        />
      </div>
      <div className="flex [height:100%] [width:100%] pl-2 pr-2">
        {/* <div className="Rece-flex-item-right"> */}
        <Routes>
          <Route
            path="newPatient"
            element={
              <NewPatient
                newddlist={newddlist}
                triggertoggle={triggertoggle}
                setTriggertoggle={setTriggertoggle}
                othercharges={billChargesTable[2]}
              />
            }
          />
          <Route path="search" element={<SearchPatient />} />
          <Route
            path="createvisit/*"
            element={
              <CreateVisitButtons
                newddlist={newddlist}
                triggertoggle={triggertoggle}
                setTriggertoggle={setTriggertoggle}
                inPatientCodes={{
                  departmentsvalueslist,
                  beddetailslist,
                  govtdetailslist,
                }}
              />
            }
          />
          <Route
            path="createinvoice/*"
            element={
              <CreateBIllingButtons
                newddlist={newddlist}
                triggertoggle={triggertoggle}
                setTriggertoggle={setTriggertoggle}
                billChargesTable={billChargesTable}
              />
            }
          />
          <Route
            path="adminpanel/*"
            element={
              <AdminPanel
                newddlist={newddlist}
                triggertoggle={triggertoggle}
                setTriggertoggle={setTriggertoggle}
                billChargesTable={billChargesTable}
              />
            }
          />
          {/* <Route path="createinvoice/*" render={(props) => <CreateInvoice {...props} data={newddlist}/>} /> */}
        </Routes>
      </div>
    </div>
    // </div>
  );
}

export default Reception;
