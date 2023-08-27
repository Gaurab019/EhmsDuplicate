import React, { useEffect } from "react";
import { FillPatientData } from "../../Logic/FormatData";
import { toastSuccessStatus, toastErrorStatus } from "../General/sendToast";
import { patientdetailsvalidation } from "../../Logic/Validators";
import { useState } from "react";
// import { enterPatientDetails } from "../../apis/userverification";
import "../../Pages/Reception/Reception.css";
import { useTokenStore } from "../../store/store";
import { useUsernameStore } from "../../store/store";
import { usePasswordStore } from "../../store/store";
import { usePatientIDStore } from "../../store/store";
import { CardDetails } from "../../models/Configure";
import {
  NameField,
  Age,
  Sex,
  EmailField,
  Mobile,
  Altmobile,
  Landline,
  Amount,
  PaymentType,
} from "../General/Fields";
import { CardDisplay } from "../General/CardDisplay";
import variables from "../../models/variables.json";

const NewPatient = ({ othercharges }) => {
  const carddatatemplate = {};

  const token = useTokenStore((state) => state.token.token);
  const statuscode = useTokenStore((state) => state.token.statuscode);
  const setToken = useTokenStore((state) => state.setToken);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const username = useUsernameStore((state) => state.username);
  const password = usePasswordStore((state) => state.password);
  const setpatientid = usePatientIDStore((state) => state.setpatientID);

  const [searchDoc, setsearchDoc] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [patientdetails, setpatientdetails] = useState({});
  const [carddetails, setcarddetails] = useState({});
  const [retriggersubmit, setretriggersubmit] = useState(false);
  const [triggerreset, settriggerreset] = useState(false);
  const [registrationamt, setregistrationamt] = useState("");

  // useEffect(() => {
  //   // console.log("selected option effect triggered");
  //   setpatientdetails((prevState) => ({
  //     patientdetails: {
  //       ...prevState.patientdetails,
  //       consultingdoctor: selectedOption,
  //     },
  //   }));
  // }, [selectedOption]);

  // useEffect(() => {
  //   // console.log("search doc effect triggered");
  //   setpatientdetails((prevState) => ({
  //     patientdetails: {
  //       ...prevState.patientdetails,
  //       consultingdoctor: searchDoc,
  //     },
  //   }));
  // }, [searchDoc]);

  useEffect(() => {
    if (retriggersubmit) {
      callValidationAndSubmit();
      setretriggersubmit(false);
    }
  }, [retriggersubmit]);

  useEffect(() => {
    setregistrationamt(
      othercharges?.otherchargesdata
        .filter((item) => item.servicename == "Registration")[0]
        .cost.toString()
    );
    //Adding username field data into the request

    // setpatientdetails((prevState) => ({
    //   patientdetails: {
    //     ...prevState.patientdetails,
    //     username: username,
    //   },
    // }));

    // // console.log(
    //   "Registration page, regsitration charges: ",
    //   othercharges?.otherchargesdata.filter(
    //     (item) => item.servicename == "Registration"
    //   )[0].cost
    // );
  }, [othercharges]);

  const callValidationAndSubmit = async (e) => {
    e.preventDefault();
    // console.log("Captured Data");
    // console.log(patientdetails.patientdetails);
    if (patientdetailsvalidation(patientdetails.patientdetails)) {
      let createdata = await FillPatientData(
        patientdetails.patientdetails,
        token,
        username
      );
      // console.log(createdata);
      switch (createdata.statuscode) {
        case 200:
          if (createdata.outdata.created) {
            toastSuccessStatus("Patient Registered Successfully!!");
            // console.log("Patient ID: ", createdata.outdata.data.patientid);
            setpatientid(createdata.outdata.data.patientid);
            carddatatemplate[CardDetails.PatientID] =
              createdata.outdata.data.patientid;
            carddatatemplate[CardDetails.Patient] =
              patientdetails.patientdetails.namevalue;
            carddatatemplate[CardDetails.Age] =
              patientdetails.patientdetails.age + variables.agesuffix;
            carddatatemplate[CardDetails.Mobile] =
              patientdetails.patientdetails.mobile;
            // carddatatemplate.registrationcharges =
            //   variables.moneyprefix +
            //   patientdetails.patientdetails.registrationcharges;
            // carddatatemplate.consultingdoctor =
            //   patientdetails.patientdetails.consultingdoctor;
            resetformWithoutDeletingCard();
            setcarddetails(carddatatemplate);
          } else {
            resetform();
            toastErrorStatus("Something went wrong. Try Again!!");
            break;
          }
          break;
        case 400:
          toastErrorStatus("Missing Details!!");
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

  const resetform = () => {
    // console.log("Reset triggered");
    settriggerreset(!triggerreset);
    setcarddetails({});
    toastSuccessStatus("Form Reset Successfully");
  };
  const resetformWithoutDeletingCard = () => {
    // console.log("Reset triggered");
    settriggerreset(!triggerreset);
  };

  return (
    <div className="[height:100%] [width:100%]">
      <h1 className="bg-[#f2ecff] text-[#04040c] h-24 flex items-center justify-start box-border p-5 rounded-l-xl ml-2 mt-2 mb-12 [width:100%]">
        New Patient Registration
      </h1>
      <div className="Rece-flex-item-right">
        <form
          onSubmit={(e) => {
            console.log(e);
            console.log("Registration details Submit called");
            callValidationAndSubmit(e);
          }}
        >
          {/* <div className="Rece-flex-container">
            <div className="container-right"> */}
          <div className=" patientDet">
            {/* <FormDetails InputFields={InputFields} /> */}
            <NameField
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
              disabled={false}
              externalvalue={""}
            />
            <Age
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
            />
            <Sex
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
            />
            <EmailField
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
            />
            <Mobile
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
            />
            <Altmobile
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
            />
            <Landline
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
            />
            <Amount
              setpatientdetails={setpatientdetails}
              // triggerreset={triggerreset}
              externalvalue={registrationamt}
            />
            <PaymentType
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
            />
          </div>
          {/* </div>
          </div> */}
          <div className="buttondiv">
            <button
              className="button-6 savesubmit"
              type="submit"
              // onClick={() => {
              //   // enterPatientDetails(
              //   //   process.env.REACT_APP_CreatePatient,
              //   //   patientdetails
              //   // );
              //   callValidationAndSubmit();
              // }}
            >
              Submit
            </button>
            <button
              className="button-6 savesubmit"
              type="button"
              onClick={resetform}
            >
              Reset
            </button>
          </div>
        </form>
        <CardDisplay
          key={1}
          data={carddetails}
          CardHeader={"Patient Registered Details"}
          displayprintbutton={false}
          displayIPVisitbutton={true}
          displayOPLabbutton={true}
          displayOPVisitbutton={true}
          displayradiobutton={false}
          displaykey={1}
          setvisitingpatientid={() => {}}
          setcardkey={() => {}}
          cardkey={""}
          displayheader={true}
        />
      </div>
    </div>
  );
};

export default NewPatient;
