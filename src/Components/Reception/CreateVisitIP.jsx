import React from "react";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import ConsultingDoctor from "../General/ConsultingDoctor";
import { searchPatientDetails } from "../../apis/userverification";
import { useTokenStore } from "../../store/store";
import { useUsernameStore } from "../../store/store";
import { toastSuccessStatus, toastErrorStatus } from "../General/sendToast";
import { usePasswordStore } from "../../store/store";
import { usePatientIDStore } from "../../store/store";
import { useIPDetailsStore } from "../../store/store";
import { CardDetails } from "../../models/Configure";
import variables from "../../models/variables.json";
import "../../Pages/Reception/Reception.css";
import InvoiceGenerator from "../Billing/InvoiceGenerate/InvoiceGenerator";
import {
  PaymentType,
  PatientID,
  Amount,
  InPatientID,
  RelativeName,
  RelativeRelation,
  Address,
  RelativePhoneNumber,
  RoomNumber,
  FloorNumber,
  BedNumber,
  DisabledPatientName,
} from "../General/Fields";
import { FillInPatientData } from "../../Logic/FormatData";
import { CardDisplay } from "../General/CardDisplay";
import {
  searchpatientvalidation,
  visitingdetailsvalidation,
  inpatientdetailsvalidation,
} from "../../Logic/Validators";
import GovtIDField from "../General/GovtIDField";
import ConDoctor from "../General/ConDoctorDD";
import DeptID from "../General/DeptID";
import BedType from "../General/BedType";
var _ = require("lodash");

const CreateVisitIP = ({
  newddlist,
  triggertoggle,
  setTriggertoggle,
  inPatientCodes,
}) => {
  let carddatatemplate = {};
  let admissionReceiptTemplate = {};
  const statuscode = useTokenStore((state) => state.token.statuscode);
  const token = useTokenStore((state) => state.token.token);
  const setToken = useTokenStore((state) => state.setToken);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const username = useUsernameStore((state) => state.username);
  const password = usePasswordStore((state) => state.password);
  const patientid = usePatientIDStore((state) => state.patientID);
  const setpatientID = usePatientIDStore((state) => state.setpatientID);
  const setippatientid = useIPDetailsStore((state) => state.setippatientid);
  // const setippatientdeptdetails = useIPDetailsStore(
  //   (state) => state.setippatientdeptid
  // );
  const deptdetails = useIPDetailsStore(
    (state) => state.ippatientdetails.deptdetails
  );
  // const setippatientbedtypedetails = useIPDetailsStore(
  //   (state) => state.setippatientbedtypeid
  // );
  const bedtypedetails = useIPDetailsStore(
    (state) => state.ippatientdetails.bedtypedetails
  );
  const govttypedetails = useIPDetailsStore(
    (state) => state.ippatientdetails.govttypedetails
  );
  const doctordetails = useIPDetailsStore(
    (state) => state.ippatientdetails.consultingdoctor
  );
  const ippatientdetails = useIPDetailsStore((state) => state.ippatientdetails);
  // const setippatientconsultingdoctor = useIPDetailsStore(
  //   (state) => state.setippatientconsultingdoctor
  // );
  const setippatientname = useIPDetailsStore((state) => state.setippatientname);
  const resetippatientdetails = useIPDetailsStore(
    (state) => state.resetippatientdetails
  );

  const [carddetails, setCardDetails] = useState({});
  const [admissionDetails, setAdmissionDetails] = useState({});
  // const [searchDoc, setsearchDoc] = useState("");
  // const [patientdetails, setpatientdetails] = useState({});
  // const [searchDoc, setsearchDoc] = useState("");
  // const [selectedOption, setSelectedOption] = useState("");
  const [triggerreset, settriggerreset] = useState(false);
  const [retriggersubmit, setretriggersubmit] = useState(false);
  const [retriggersearch, setretriggersearch] = useState(false);
  const [generateReport, setGenerateReport] = useState(false);

  // useEffect(() => {
  //   // // console.log("selected option effect triggered");
  //   // setpatientdetails((prevState) => ({
  //   //   patientdetails: {
  //   //     ...prevState.patientdetails,
  //   //     consultingdoctor: selectedOption,
  //   //   },
  //   // }));
  //   // setippatientconsultingdoctor(selectedOption);
  //   // console.log(inPatientCodes?.govtdetailslist);
  //   // console.log(deptdetails);
  //   // console.log(bedtypedetails);
  //   // console.log(govttypedetails);
  // }, [deptdetails, bedtypedetails, govttypedetails]);

  // useEffect(() => {
  //   // // console.log("search doc effect triggered");
  //   setpatientdetails((prevState) => ({
  //     patientdetails: {
  //       ...prevState.patientdetails,
  //       consultingdoctor: searchDoc,
  //     },
  //   }));
  // }, [searchDoc]);

  useEffect(() => {
    // console.log("Triggered create visit op useeffect. PatientID: ", patientid);
    // console.log("inpatientdata: ", inPatientCodes);
    if (_.isEmpty(patientid)) {
    } else {
      setippatientid(patientid);
      setretriggersearch(true);
    }
  }, []);

  useEffect(() => {
    if (retriggersubmit) {
      callValidationAndSubmit();
      setretriggersubmit(false);
    }
    if (retriggersearch) {
      searchPatient();
      setretriggersearch(false);
    }
  }, [retriggersubmit, retriggersearch]);

  // const resetForm = () => {
  //   setpatientid("");
  // };

  const resetform = () => {
    settriggerreset(!triggerreset);
    // resetippatientdetails("");
    setpatientID("");
    setCardDetails({});
    setAdmissionDetails({});
    resetippatientdetails();
    setGenerateReport(false);
    toastSuccessStatus("Form Reset Successfully");
  };

  const searchPatient = async () => {
    // // console.log(
    //   process.env.REACT_APP_SearchPatient,
    //   ippatientdetails.patientid
    // );
    let searchoutput = {};
    // console.log(ippatientdetails);
    if (searchpatientvalidation(ippatientdetails.patientid, "")) {
      let searchdata = await searchPatientDetails(
        process.env.REACT_APP_SearchPatient,
        ippatientdetails.patientid,
        "",
        token
      );
      // console.log(searchdata);
      switch (searchdata.statuscode) {
        case 200:
          if (searchdata.outdata.data.length <= 0) {
            toastErrorStatus("No Patient Found!!");
            break;
          }
          // console.log(searchdata.outdata.data[0]);
          searchoutput.success = true;
          searchoutput.patientid = searchdata.outdata.data[0].patientid;
          searchoutput.patientname = searchdata.outdata.data[0].patientname;
          searchoutput.sex = searchdata.outdata.data[0].sex;
          searchoutput.age = searchdata.outdata.data[0].age;
          searchoutput.mobilenum = searchdata.outdata.data[0].mobilenum;
          // searchoutput.consultingdoctor = ippatientdetails.consultingdoctor;
          setippatientname(searchdata.outdata.data[0].patientname);

          toastSuccessStatus("Patient details found!!");
          break;
        case 400:
          toastErrorStatus("No details Entered!!");
          break;
        case 401:
          await fetchnewToken(
            process.env.REACT_APP_GetTokenURL,
            username,
            password
          );
          if (statuscode == 401) {
            setToken("");
            toastErrorStatus("UnAuthorised Access. Login Again!!");
            break;
          }
          setretriggersearch(true);
          break;
        default:
          toastErrorStatus("Something went wrong. Try Again!!");
          break;
      }
    } else toastErrorStatus("Incomplete Details");
    return searchoutput;
  };

  const callValidationAndSubmit = async (e) => {
    let bedtypename = "";

    // // console.log(ippatientdetails);
    // // console.log(token);
    let searchoutput = await searchPatient();
    // // console.log(searchoutput);
    if (searchoutput.success) {
      if (inpatientdetailsvalidation(ippatientdetails)) {
        let createdata = await FillInPatientData(
          {
            ...ippatientdetails,
            deptid: JSON.parse(ippatientdetails.deptdetails[1])["departmentid"],
            govtid: JSON.parse(ippatientdetails.govttypedetails[1])[
              "govtidtype"
            ],
            bedcategoryid: JSON.parse(ippatientdetails.bedtypedetails[1])[
              "bedcategoryid"
            ],
            doctorid: JSON.parse(ippatientdetails.consultingdoctor[1])["docid"],
            doctorname: ippatientdetails.consultingdoctor[0],
          },
          token,
          username
        );
        switch (createdata.statuscode) {
          case 200:
            if (createdata.outdata.created) {
              // console.log(createdata.outdata.InPatientRecord);
              toastSuccessStatus("In Patient Visit Created Successfully!!");

              try {
                bedtypename = JSON.parse(bedtypedetails[1])["RoomType"];
                // console.log(bedtypename);
              } catch (error) {
                // console.log(error);
              }

              //setting data for the card template
              carddatatemplate[CardDetails.IPR] =
                createdata.outdata.InPatientRecord.iprno;
              carddatatemplate[CardDetails.PatientID] = searchoutput.patientid;
              carddatatemplate[CardDetails.Patient] = searchoutput.patientname;
              carddatatemplate[CardDetails.Age] =
                searchoutput.age + variables.agesuffix;
              carddatatemplate[CardDetails.Doctor] = doctordetails[0];
              carddatatemplate[CardDetails.BedCategoryName] = bedtypename;
              carddatatemplate[CardDetails.RelativePhone] =
                ippatientdetails.relativephonenumber;
              carddatatemplate[CardDetails.Address] = ippatientdetails.address;
              carddatatemplate[CardDetails.FloorNo] =
                ippatientdetails.floornumber;
              carddatatemplate[CardDetails.RoomNo] = ippatientdetails.roomno;
              carddatatemplate[CardDetails.BedNo] = ippatientdetails.bedno;
              // // console.log(carddatatemplate);
              setCardDetails(carddatatemplate);

              // Setting data for admission receipt
              admissionReceiptTemplate = { ...carddatatemplate };
              admissionReceiptTemplate[CardDetails.DepartmentName] =
                deptdetails[0];
              admissionReceiptTemplate[CardDetails.RelativeName] =
                ippatientdetails.relativename;
              admissionReceiptTemplate[CardDetails.RelativeRelation] =
                ippatientdetails.relativerelation;
              admissionReceiptTemplate[CardDetails.Sex] = searchoutput.sex;

              setAdmissionDetails(admissionReceiptTemplate);
              break;
            }
            resetform();
            toastErrorStatus("Something went wrong. Try Again!!");
            break;
          case 400:
            toastErrorStatus("Missing Details!!");
            break;
          case 401:
            await fetchnewToken(username, password);
            if (statuscode == 401) {
              setToken("");
              toastErrorStatus("UnAuthorised Access. Login Again!!");
              break;
            }
            setretriggersubmit(true);
            break;
          default:
            resetform();
            toastErrorStatus("Something went wrong. Try Again!!");
            break;
        }
      } else toastErrorStatus("Incomplete Details");
    } else {
      resetform();
    }
  };
  const [count, setCount] = useState(0);
  const NEXT = () => {
    if (count === 0) setCount(1);
    // // console.log(count);
    if (count === 1) setCount(2);
    if (count === 2) setCount(3);

    // // console.log(patientdetails);
    // console.log(ippatientdetails);
  };
  const PREV = () => {
    if (count === 1) setCount(0);
    // // console.log(count);
    if (count === 2) setCount(1);
    if (count === 3) setCount(2);
  };
  const handleTabChange = (tabIndex) => {
    setCount(tabIndex);
  };

  // const getGovtIDType = ()=>{
  //   return JSON.parse(govttypedetails[1])["govtidtype"];
  // }
  // const getGovtIDTypeName = ()=>{
  //   return govttypedetails[0];
  // }

  const patientDetailsArray = () => {
    let govtidtype;
    let govtidtypename;
    let bedtypeid;
    let bedtypename;
    let deptid;
    let deptname;
    let docid;
    let doctorname;
    try {
      govtidtype = JSON.parse(govttypedetails[1])["govtidtype"];
      govtidtypename = govttypedetails[0];
      bedtypeid = JSON.parse(bedtypedetails[1])["bedcategoryid"];
      bedtypename = bedtypedetails[0];
      deptid = JSON.parse(deptdetails[1])["departmentid"];
      deptname = deptdetails[0];
      docid = JSON.parse(doctordetails[1])["docid"];
      doctorname = doctordetails[0];
    } catch (error) {
      // // console.log(error);
    }

    return [
      { label: "Patient ID", value: ippatientdetails.patientid },
      { label: "Patient Name", value: ippatientdetails.patientname },
      { label: "Govt ID", value: govtidtype },
      { label: "Govt ID Name", value: govtidtypename },
      { label: "ID Value", value: ippatientdetails.govtidvalue },
      { label: "Relative Name", value: ippatientdetails.relativename },
      { label: "Relative Relation", value: ippatientdetails.relativerelation },
      {
        label: "Phone Number",
        value: ippatientdetails.relativephonenumber,
      },
      { label: "Address", value: ippatientdetails.address },
      { label: "Bed ID", value: bedtypeid },
      { label: "Bed Name", value: bedtypename },
      { label: "Floor Number", value: ippatientdetails.floornumber },
      { label: "Bed Number", value: ippatientdetails.bedno },
      { label: "Room Number", value: ippatientdetails.roomno },
      { label: "Dept ID", value: deptid },
      { label: "Dept Name", value: deptname },
      { label: "Doctor Name", value: doctorname },
    ];
  };

  return (
    <div className="[height:100%] [width:100%] box-border overflow-y-scroll overflow-x-clip">
      <h1 className="bg-[#f2ecff] text-[#04040c] h-24 flex items-center justify-start box-border p-5 rounded-l-xl ml-2 mt-2 mb-12 [width:100%]">
        In Patient Admission Form
      </h1>
      <div className="Rece-flex-item-right">
        <form
          onSubmit={(e) => {
            console.log("IP details Submit called");
            e.preventDefault();
            callValidationAndSubmit(e);
          }}
        >
          <div className="flex flex-col justify-center items-center">
            <div>
              <button
                className={`button-81 text-center ${
                  count === 0 ? "button-active" : ""
                }`}
                type="button"
                onClick={() => handleTabChange(0)}
              >
                Basic
              </button>
              <button
                type="button"
                className={`button-81 ${count === 1 ? "button-active" : ""}`}
                onClick={() => handleTabChange(1)}
              >
                Bed
              </button>
              <button
                type="button"
                className={`button-81 ${count === 2 ? "button-active" : ""}`}
                onClick={() => handleTabChange(2)}
              >
                Doctor
              </button>
              <button
                type="button"
                className={`button-81 ${count === 3 ? "button-active" : ""}`}
                onClick={() => handleTabChange(3)}
              >
                Admission Preview
              </button>
            </div>

            <div className="Rece-flex-container">
              <div className="container-right">
                <div className="patientDet">
                  {count === 0 && (
                    <div className=" grid grid-cols-1 gap-3 box-border [width:100%] xl:grid-cols-2">
                      {/* <PatientID
                    setpatientdetails={setpatientdetails}
                    searchPatient={searchPatient}
                    BsSearch={BsSearch}
                    triggerreset={triggerreset}
                    needsearch={true}
                    patientid={patientid}
                    setpatientid={setpatientID}
                  /> */}
                      <InPatientID
                        needsearch={true}
                        BsSearch={BsSearch}
                        searchPatient={searchPatient}
                      />
                      <DisabledPatientName
                        externalvalue={ippatientdetails?.patientname}
                      />
                      <GovtIDField
                        govtdetailslist={inPatientCodes?.govtdetailslist}
                        triggertoggle={triggertoggle}
                        setTriggertoggle={setTriggertoggle}
                        triggerreset={triggerreset}
                      />
                      <RelativeName />
                      <RelativeRelation />
                      <RelativePhoneNumber />
                      <Address />
                    </div>
                  )}
                  {count === 1 && (
                    <div className=" grid grid-cols-1 gap-3 box-border [width:100%] xl:grid-cols-2">
                      <BedType
                        beddetailslist={inPatientCodes?.beddetailslist}
                        triggertoggle={triggertoggle}
                        setTriggertoggle={setTriggertoggle}
                        triggerreset={triggerreset}
                      />
                      <FloorNumber />
                      <RoomNumber />
                      <BedNumber />
                    </div>
                  )}

                  {count === 2 && (
                    <div className=" grid grid-cols-1 gap-3 box-border [width:100%] xl:grid-cols-2">
                      <DeptID
                        departmentdetails={
                          inPatientCodes?.departmentsvalueslist
                        }
                        triggertoggle={triggertoggle}
                        setTriggertoggle={setTriggertoggle}
                        triggerreset={triggerreset}
                      />
                      <ConDoctor
                        doctordetailslist={newddlist}
                        triggertoggle={triggertoggle}
                        setTriggertoggle={setTriggertoggle}
                        triggerreset={triggerreset}
                      />
                    </div>
                  )}
                  {count === 3 && (
                    <div className="patient-details">
                      {patientDetailsArray().map((detail, index) => (
                        <div key={detail.label} className="detail-row">
                          <div
                            className={`left ${
                              index % 2 === 0 ? "even" : "odd"
                            }`}
                          >
                            <label className=" text-sm font-light">
                              {detail.label}:
                            </label>
                          </div>
                          <div
                            className={`right ${
                              index % 2 === 0 ? "even" : "odd"
                            }`}
                          >
                            <span className="font-semibold text-green-500">
                              {detail.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex flex-row justify-center gap-10 items-center mt-2">
                  <button
                    className="button-6 reset"
                    type="button"
                    onClick={
                      () => {
                        resetform();
                      }
                      // resetform
                    }
                  >
                    RESET
                  </button>
                  <div>
                    {count > 0 && (
                      <button
                        onClick={PREV}
                        type="button"
                        className="button-6 savesubmit"
                      >
                        Previous
                      </button>
                    )}
                    {count < 3 ? (
                      <button
                        onClick={NEXT}
                        type="button"
                        className="button-6 savesubmit"
                      >
                        Next
                      </button>
                    ) : (
                      void 0
                    )}
                    {count >= 3 ? (
                      <button
                        type="submit"
                        className="primarysubmit button-6"
                        // onClick={callValidationAndSubmit}
                      >
                        Submit
                      </button>
                    ) : (
                      void 0
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* <div className="buttondiv">
          <button
            className="button-6 savesubmit"
            onClick={callValidationAndSubmit}
          >
            CREATE VISIT
          </button>
        </div> */}
        <CardDisplay
          key={1}
          data={carddetails}
          CardHeader={"In Patient Admission Details"}
          triggerPrint={() => setGenerateReport(true)}
          displayprintbutton={true}
          displayOPVisitbutton={false}
          displayIPVisitbutton={false}
          displayOPLabbutton={false}
          displayradiobutton={false}
          displayheader={true}
        />
        {generateReport && (
          // <div className="flex BillDisplay">
          <InvoiceGenerator
            billername={username}
            admissionReceipt={true}
            IPR={admissionDetails[CardDetails.IPR]}
            patientid={admissionDetails[CardDetails.PatientID]}
            patientname={admissionDetails[CardDetails.Patient]}
            sex={admissionDetails[CardDetails.Sex]}
            doctorname={admissionDetails[CardDetails.Doctor]}
            age={admissionDetails[CardDetails.Age]}
            Address={admissionDetails[CardDetails.Address]}
            relativename={admissionDetails[CardDetails.RelativeName]}
            relativephone={admissionDetails[CardDetails.RelativePhone]}
            relativerelation={admissionDetails[CardDetails.RelativeRelation]}
            floorno={admissionDetails[CardDetails.FloorNo]}
            bedno={admissionDetails[CardDetails.BedNo]}
            roomno={admissionDetails[CardDetails.RoomNo]}
            bedcategorytype={admissionDetails[CardDetails.BedCategoryName]}
            departmentname={admissionDetails[CardDetails.DepartmentName]}
            admissionDate={new Date().toJSON().slice(0, 10)}
          />
          // </div>
        )}
      </div>
    </div>
  );
};

export default CreateVisitIP;
