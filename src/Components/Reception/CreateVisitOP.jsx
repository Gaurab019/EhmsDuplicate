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
import { useDoctorStore } from "../../store/store";
import { doctorIDGeneric } from "../../models/Configure";
import {
  PaymentType,
  PatientID,
  Amount,
  DisabledPatientName,
  ManualAmount,
} from "../General/Fields";
import { FillVisitingData } from "../../Logic/FormatData";
import { CardDisplay } from "../General/CardDisplay";
import {
  searchpatientvalidation,
  visitingdetailsvalidation,
} from "../../Logic/Validators";
import { convertbillbreakuptoArray } from "../../utils/convertjsontoArray";
import { CardDetails } from "../../models/Configure";
import variables from "../../models/variables.json";
import InvoiceGenerator from "../../Components/Billing/InvoiceGenerate/InvoiceGenerator";

var _ = require("lodash");

const CreateVisitOP = ({
  newddlist,
  triggertoggle,
  setTriggertoggle,
  // doctordata,
}) => {
  const carddatatemplate = {};

  const statuscode = useTokenStore((state) => state.token.statuscode);
  const token = useTokenStore((state) => state.token.token);
  const setToken = useTokenStore((state) => state.setToken);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const username = useUsernameStore((state) => state.username);
  const password = usePasswordStore((state) => state.password);
  const patientid = usePatientIDStore((state) => state.patientID);
  const setpatientID = usePatientIDStore((state) => state.setpatientID);
  // const doctorarr = useDoctorStore((state) => state.doctors.data);

  const [list, setList] = useState([]);
  const [carddetails, setcarddetails] = useState({});
  const [searchDoc, setsearchDoc] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [patientdetails, setpatientdetails] = useState({});
  const [triggerreset, settriggerreset] = useState(false);
  const [retriggersubmit, setretriggersubmit] = useState(false);
  const [retriggersearch, setretriggersearch] = useState(false);
  const [showRegistrationBanner, setShowRegistrationBanner] = useState(false);
  const [generateReport, setGenerateReport] = useState(false);
  const [opBillingResponse, setopBillingResponse] = useState({});
  const [manualEntryTrigger, setmanualEntryTrigger] = useState(false);

  useEffect(() => {
    // console.log("selected option effect triggered");
    if (selectedOption.length > 0) {
      let docdata = JSON.parse(selectedOption[1]);
      // console.log(docdata);
      setpatientdetails((prevState) => ({
        patientdetails: {
          ...prevState.patientdetails,
          consultingdoctor: "".concat("DR ", docdata?.doctorname.toUpperCase()),
          doctorid: docdata?.docid,
          charges: docdata?.rate,
        },
      }));
    }
  }, [selectedOption]);
  // useEffect(() => {
  //   // console.log("selected option effect triggered");
  //   if (searchDoc.length > 0) {
  //     // let docdata = JSON.parse(selectedOption[1]);
  //     // console.log(docdata);
  //     setpatientdetails((prevState) => ({
  //       patientdetails: {
  //         ...prevState.patientdetails,
  //         consultingdoctor: "".concat("DR ", searchDoc.toUpperCase()),
  //         doctorid: doctorIDGeneric,
  //       },
  //     }));
  //   }
  // }, [searchDoc]);
  useEffect(() => {
    // console.log("selected option effect triggered");
    // if (manualEntryTrigger) {
    // let docdata = JSON.parse(selectedOption[1]);
    // console.log(docdata);
    setpatientdetails((prevState) => ({
      patientdetails: {
        ...prevState.patientdetails,
        manualEntry: manualEntryTrigger,
      },
    }));
    // }
  }, [manualEntryTrigger]);

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

  useEffect(() => {
    // console.log("Triggered create visit op useeffect. PatientID: ", patientid);
    if (_.isEmpty(patientid)) {
    } else {
      setpatientdetails((prevState) => ({
        patientdetails: {
          ...prevState.patientdetails,
          patientid: patientid,
        },
      }));
      setretriggersearch(true);
    }
  }, []);

  useEffect(() => {
    if (generateReport) {
      callDownloadReport();
    }
  }, [generateReport]);

  // const resetForm = () => {
  //   setpatientid("");
  // };

  const callDownloadReport = () => {
    // console.log("callDownloadReport: ", opBillingResponse);
    // setGenerateReport(true);
    let breakuplist = convertbillbreakuptoArray(opBillingResponse.breakup);
    // console.log("breakuplist: ", breakuplist);
    setList(breakuplist);
  };

  const resetform = () => {
    console.log(manualEntryTrigger);
    settriggerreset(!triggerreset);
    setpatientID("");
    setcarddetails({});
    setShowRegistrationBanner(false);
    setGenerateReport(false);
    setpatientdetails({});
    setopBillingResponse({});
    toastSuccessStatus("Form Reset Successfully");
    setmanualEntryTrigger(false);
  };
  const resetFormWithoutCardDetails = () => {
    console.log(manualEntryTrigger);
    settriggerreset(!triggerreset);
    setpatientID("");
    setpatientdetails({});
    setShowRegistrationBanner(false);
    setmanualEntryTrigger(false);
  };

  const searchPatient = async () => {
    // console.log(
    //   process.env.REACT_APP_SearchPatient,
    //   patientdetails.patientdetails.patientid
    // );
    let searchoutput = {};
    if (searchpatientvalidation(patientdetails.patientdetails.patientid, "")) {
      let searchdata = await searchPatientDetails(
        process.env.REACT_APP_SearchPatient,
        patientdetails.patientdetails.patientid,
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
          searchoutput.age = searchdata.outdata.data[0].age;
          searchoutput.mobilenum = searchdata.outdata.data[0].mobilenum;
          searchoutput.addregistrationflag =
            searchdata.outdata.data[0].registrationpaidflag == 0 ? true : false;
          searchoutput.consultingdoctor =
            patientdetails.patientdetails.consultingdoctor;
          searchdata.outdata.data[0].registrationpaidflag == 0
            ? setShowRegistrationBanner(true)
            : setShowRegistrationBanner(false);

          setpatientdetails((previousstate) => ({
            patientdetails: {
              ...previousstate.patientdetails,
              patientname: searchoutput.patientname,
            },
          }));

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
    // // console.log(patientdetails.patientdetails);
    // // console.log(token);
    e.preventDefault();
    let searchoutput = await searchPatient();
    // console.log(searchoutput);
    if (searchoutput.success) {
      if (visitingdetailsvalidation(patientdetails.patientdetails)) {
        let createdata = await FillVisitingData(
          patientdetails.patientdetails,
          token,
          username,
          searchoutput.addregistrationflag
        );
        switch (createdata.statuscode) {
          case 200:
            if (createdata.outdata.created) {
              // console.log(createdata);
              toastSuccessStatus("Patient Visit Created Successfully!!");
              setShowRegistrationBanner(false);
              carddatatemplate[CardDetails.PatientID] = searchoutput.patientid;
              carddatatemplate[CardDetails.Patient] = searchoutput.patientname;
              carddatatemplate[CardDetails.Age] =
                searchoutput.age + variables.agesuffix;
              carddatatemplate[CardDetails.Mobile] = searchoutput.mobilenum;
              carddatatemplate[CardDetails.Doctor] =
                searchoutput.consultingdoctor;
              setcarddetails(carddatatemplate);
              resetFormWithoutCardDetails();
              setopBillingResponse(createdata?.outdata?.data);
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

  return (
    <div className="flex flex-col items-center justify-center">
      {" "}
      <h1 className="NPR">Patient Visit Create OP</h1>
      <form onSubmit={(e) => callValidationAndSubmit(e)}>
        <div className="Rece-flex-container">
          <div className="container-right">
            <div className="patientDet">
              <PatientID
                setpatientdetails={setpatientdetails}
                searchPatient={searchPatient}
                BsSearch={BsSearch}
                triggerreset={triggerreset}
                needsearch={true}
                patientid={patientid}
                setpatientid={setpatientID}
              />
              <DisabledPatientName
                externalvalue={patientdetails.patientdetails?.patientname}
              />
              <ConsultingDoctor
                searchDoc={searchDoc}
                setsearchDoc={setsearchDoc}
                setSelectedOption={setSelectedOption}
                newddlist={newddlist}
                triggertoggle={triggertoggle}
                triggerreset={triggerreset}
                setTriggertoggle={setTriggertoggle}
                manualEntryTrigger={manualEntryTrigger}
                setmanualEntryTrigger={setmanualEntryTrigger}
                showmanualentrytrigger={true}
              />
              {/* <FormDetails InputFields={InputFields} />{" "} */}
              {manualEntryTrigger ? (
                <ManualAmount
                  setpatientdetails={setpatientdetails}
                  triggerreset={triggerreset}
                />
              ) : (
                <Amount
                  setpatientdetails={setpatientdetails}
                  triggerreset={triggerreset}
                  externalvalue={
                    _.isUndefined(patientdetails.patientdetails?.charges)
                      ? 0
                      : patientdetails.patientdetails?.charges
                  }
                />
              )}
              <PaymentType
                setpatientdetails={setpatientdetails}
                triggerreset={triggerreset}
              />
              {showRegistrationBanner && (
                <div className="text-red-500 text-sm">
                  * Registration Charges will be added for this patient in final
                  bill
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="buttondiv">
          <button
            type="submit"
            className="button-6 savesubmit"
            disabled = {generateReport}
            // onClick={callValidationAndSubmit}
          >
            CREATE VISIT
          </button>
          <button
            className="button-6 savesubmit"
            onClick={resetform}
            type="button"
          >
            RESET
          </button>
        </div>
      </form>
      <CardDisplay
        key={1}
        data={carddetails}
        CardHeader={"Patient Visit Details"}
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
          patientid={opBillingResponse?.patientid}
          patientname={opBillingResponse?.opdetails.Patientname}
          sex={opBillingResponse?.opdetails.Sex}
          doctorname={opBillingResponse?.opdetails.ConsultingDoctor}
          age={opBillingResponse?.opdetails.Age + variables.agesuffix}
          phonenumber={opBillingResponse?.opdetails.Phonenumber}
          totalmrp={opBillingResponse?.mrp.toFixed(2)}
          additionalhospitalcharges={opBillingResponse?.additionalhospitalcharges.toFixed(
            2
          )}
          transactionid={opBillingResponse?.transactionid.toUpperCase()}
          gstvalue={opBillingResponse?.gstvalue.toFixed(2)}
          payable={opBillingResponse?.payable.toFixed(2)}
          list={list}
          invoiceNumber={opBillingResponse?.billno}
          invoiceDate={new Date().toJSON().slice(0, 10)}
          billername={username}
        />
        // </div>
      )}
    </div>
  );
};

export default CreateVisitOP;
