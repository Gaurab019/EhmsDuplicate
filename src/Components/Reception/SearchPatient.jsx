import React from "react";
import { Con } from "../../models/Configure";
import FormDetails from "../General/FormDetails";
import { BsSearch } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../Pages/Reception/Reception.css";
import { toastErrorStatus, toastSuccessStatus } from "../General/sendToast";
import { searchPatientDetails } from "../../apis/userverification";
import { useTokenStore } from "../../store/store";
import { searchpatientvalidation } from "../../Logic/Validators";
import { useUsernameStore } from "../../store/store";
import { usePasswordStore } from "../../store/store";
import { usePatientIDStore } from "../../store/store";
import { CardDisplay } from "../General/CardDisplay";
import { CardDetails } from "../../models/Configure";
import { PatientID, Mobile } from "../General/Fields";
var _ = require("lodash");

const SearchPatient = () => {
  // // console.log("searchpatient");

  const navigate = useNavigate();

  const InputFields = Con.Reception.Search.InputFields;
  const token = useTokenStore((state) => state.token.token);
  const statuscode = useTokenStore((state) => state.token.statuscode);
  const setToken = useTokenStore((state) => state.setToken);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const username = useUsernameStore((state) => state.username);
  const password = usePasswordStore((state) => state.password);
  const setpatientID = usePatientIDStore((state) => state.setpatientID);
  const patientID = usePatientIDStore((state) => state.patientID);

  // const [patientid, setpatientid] = useState("");
  // const [patientmobile, setpatientmobile] = useState("");
  const [patientdetails, setpatientdetails] = useState({});
  const [retriggersubmit, setretriggersubmit] = useState(false);
  const [carddetails, setcarddetails] = useState([]);
  const [cardkey, setcardkey] = useState("");
  const [visitingpatientid, setVisitingpatientid] = useState("");
  const [triggerreset, settriggerreset] = useState(false);

  const resetform = () => {
    setpatientID("");
    setcarddetails([]);
    setpatientdetails({});
    settriggerreset(!triggerreset);
    toastSuccessStatus("Form Reset Successfully");
  };
  const searchPatient = async () => {
    // console.log(
    //   process.env.REACT_APP_SearchPatient,
    //   patientdetails.patientdetails.patientid,
    //   patientdetails.patientdetails.mobile
    // );
    if (
      searchpatientvalidation(
        patientdetails.patientdetails.patientid,
        patientdetails.patientdetails.mobile
      )
    ) {
      let searchdata = await searchPatientDetails(
        process.env.REACT_APP_SearchPatient,
        _.isUndefined(patientdetails.patientdetails.patientid)
          ? ""
          : patientdetails.patientdetails.patientid,
        _.isUndefined(patientdetails.patientdetails.mobile)
          ? ""
          : patientdetails.patientdetails.mobile,
        token
      );
      // console.log(searchdata.outdata.data);
      switch (searchdata.statuscode) {
        case 200:
          if (searchdata.outdata.data.length <= 0) {
            resetform();
            toastErrorStatus("No Patient Found!!");
            break;
          }
          let showdata = [];

          for (let item of searchdata.outdata.data) {
            let showitem = {};
            showitem[CardDetails.PatientID] = item.patientid;
            showitem[CardDetails.Patient] = item.patientname;
            showdata.push(showitem);
          }

          setcarddetails(showdata);
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
          setretriggersubmit(true);

          break;
        default:
          resetform();
          toastErrorStatus("Something went wrong. Try Again!!");
          break;
      }
    } else toastErrorStatus("Incomplete Details");
  };

  useEffect(() => {
    if (retriggersubmit) {
      searchPatient();
      setretriggersubmit(false);
    }
  }, [retriggersubmit]);

  useEffect(() => {
    // // console.log(visitingpatientid, " triggered");
    if (_.isEmpty(visitingpatientid) || _.isUndefined(visitingpatientid)) {
      // // console.log("inside if");
    } else {
      // // console.log("inside else");
      setpatientID(visitingpatientid);
    }
  }, [visitingpatientid]);

  const navigatetocreatevisit = () => {
    navigate("/reception/createvisit/OP");
  };

  return (
    <>
      {" "}
      <h1 className="NPR">Patient Search</h1>
      <div className="Rece-flex-container">
        <div className="container-right">
          <div className="patientDet">
            {" "}
            <PatientID
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
              needsearch={false}
              patientid={patientID}
              setpatientid={setpatientID}
            />
            <FormDetails InputFields={InputFields} />{" "}
            <Mobile
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
            />
          </div>
        </div>
      </div>
      <div className="buttondiv">
        <button className="button-6 savesubmit" onClick={resetform}>
          Reset
        </button>
        <button className="button-6 savesubmit" onClick={searchPatient}>
          Search
        </button>
        {/* <button
          className={
            carddetails.length <= 0 ? "button-6" : "button-6 savesubmit"
          }
          onClick={() => {
            // console.log(visitingpatientid);
            navigatetocreatevisit();
          }}
          disabled={carddetails.length <= 0}
        >
          Create Visit
        </button> */}
      </div>
      {carddetails.length > 0 &&
        carddetails.map((item, key) => {
          // // console.log(key);
          return (
            <CardDisplay
              key={key}
              displaykey={key}
              data={item}
              setvisitingpatientid={setVisitingpatientid}
              displayheader={false}
              displayprintbutton={false}
              displayIPVisitbutton={true}
              displayOPLabbutton={true}
              displayOPVisitbutton={true}
              displayradiobutton={true}
              setcardkey={setcardkey}
              cardkey={cardkey}
            />
          );
        })}
    </>
  );
};

export default SearchPatient;
