import React from "react";
import { useState, useEffect, useCallback } from "react";
// import FormDetails from "../../Components/FormDetails";
// import { FiRefreshCcw } from "react-icons/fi";
import { BsSearch } from "react-icons/bs";
import { Con } from "../../models/Configure";
import { PaymentType, PatientID, Amount } from "../General/Fields";
import {
  useDoctorStore,
  useTokenStore,
  usePasswordStore,
  useUsernameStore,
  usePatientIDStore,
} from "../../store/store";
import ConsultingDoctor from "../General/ConsultingDoctor";
import {
  searchpatientvalidation,
  opBilldetailsvalidation,
} from "../../Logic/Validators";
import { searchPatientDetails } from "../../apis/userverification";
import { toastSuccessStatus, toastErrorStatus } from "../General/sendToast";
import { FillOpBillingData } from "../../Logic/FormatData";

function CreateInvoice(props) {
  const [searchDoc, setsearchDoc] = useState("");
  const InputFields = Con.Lab.createInvoice.InputFields;

  const statuscode = useTokenStore((state) => state.token.statuscode);
  const token = useTokenStore((state) => state.token.token);
  const setToken = useTokenStore((state) => state.setToken);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const username = useUsernameStore((state) => state.username);
  const password = usePasswordStore((state) => state.password);
  const patientid = usePatientIDStore((state) => state.patientID);
  const setpatientID = usePatientIDStore((state) => state.setpatientID);

  const [retriggersearch, setretriggersearch] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [triggerreset, settriggerreset] = useState(false);
  const [patientdetails, setpatientdetails] = useState({ patientdetails: [] });
  const [searchPatientResult, setSearchPatientResult] = useState([]);

  const [docId, setDocId] = useState("");
  const [labItems, setLabItems] = useState([
    { labItem: "", noOfItem: "", serviceid: "" },
  ]);

  const getDocIdFromOption = (option) => {
    try {
      const obj = JSON.parse(option);
      return obj.docid;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  };

  const labcharges = useCallback(
    () =>
      labItems
        .filter((item) => item.labItem !== "" && item.noOfItem !== "")
        ?.map((item) => ({
          labitemid: item.serviceid,
          nooftimes: item.noOfItem,
        })),
    [labItems]
  );

  // console.log("this is Create Invoice PROPS", props);

  useEffect(() => {
    // console.log("selected option effect triggered", selectedOption);
    setDocId(getDocIdFromOption(selectedOption[1]));
    // console.log("selected option effect triggered1", docId);
    setpatientdetails((prevState) => ({
      patientdetails: {
        ...prevState.patientdetails,
        consultingdoctor: selectedOption,
        docId: docId,
        labcharges: labcharges,
      },
    }));
  }, [selectedOption, labcharges, docId]);

  useEffect(() => {
    // console.log("selected option effect triggered", selectedOption);
    setpatientdetails((prevState) => ({
      patientdetails: {
        ...prevState.patientdetails,
        labcharges: labcharges(),
      },
    }));
  }, [labcharges]);

  const resetform = () => {
    settriggerreset(!triggerreset);
    setpatientID("");
    setLabItems([]);
  };

  const searchPatient = async () => {
    // console.log(
    //   "CreateInvoice",
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
      // console.log("CreateInvoice SearchData", searchdata);
      switch (searchdata.statuscode) {
        case 200:
          if (searchdata.outdata.data.length <= 0) {
            toastErrorStatus("No Patient Found!!");
            break;
          }
          // console.log("CreateInvoice searchdata2", searchdata.outdata.data[0]);
          searchoutput.success = true;
          searchoutput.patientid = searchdata.outdata.data[0].patientid;
          searchoutput.patientname = searchdata.outdata.data[0].patientname;
          searchoutput.patientdob = searchdata.outdata.data[0].patientdob;
          searchoutput.mobilenum = searchdata.outdata.data[0].mobilenum;
          searchoutput.consultingdoctor =
            patientdetails.patientdetails.consultingdoctor;
          setSearchPatientResult(searchoutput);
          toastSuccessStatus("Patient details found!!");
          break;
        case 400:
          toastErrorStatus("No details Entered!!");
          break;
        case 401:
          // setSearchPatientResult({})
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
          toastErrorStatus("Something went wrong. Try Again!! OPBILL");
          break;
      }
    } else toastErrorStatus("Incomplete Details");

    // if(searchoutput.length>0) setSearchPatientResult(searchoutput)
    // else   setSearchPatientResult({})
    return searchoutput;
  };

  const handleInputChange = (index, field, value) => {
    const newLabItems = [...labItems];
    newLabItems[index][field] = value;

    if (field === "labItem") {
      // Find the corresponding serviceid for the selected labItem
      const service = props.labchargesdata.find(
        (item) => item.servicename === value
      );
      if (service) {
        const serviceid = service.serviceid;
        newLabItems[index]["serviceid"] = serviceid;
      } else {
        // Reset serviceid if labItem is not found
        newLabItems[index]["serviceid"] = "";
      }
    }

    setLabItems(newLabItems);
  };

  const handleAddLabItem = () => {
    if (labItems.some((lab) => lab.labItem === "")) {
      // Prevent adding empty lab item
      toastErrorStatus("Please add lab items!");
      return;
    }

    if (labItems.some((lab) => lab.noOfItem === "")) {
      // Prevent adding empty lab item
      toastErrorStatus("Please add number of items ");
      return;
    }
    setLabItems([...labItems, { labItem: "", noOfItem: "", serviceid: "" }]);
  };

  const callValidationAndSubmit = async () => {
    // console.log(
    //   "callValidationAndSubmit create Invoice: ",
    //   patientdetails,
    //   docId
    // );
    if (patientdetails?.patientdetails?.patientid) {
      if (opBilldetailsvalidation(patientdetails.patientdetails)) {
        let createdata = await FillOpBillingData(
          patientdetails.patientdetails,
          token,
          username
        );
        switch (createdata.statuscode) {
          case 200:
            if (createdata.outdata.created) {
              // console.log(createdata);
              toastSuccessStatus("create op bill Successfully!!", createdata);
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
            // setretriggersubmit(true);
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

  // console.log("I am create Invoice Patient: ", patientdetails.patientdetails);

  return (
    <div>
      {" "}
      <h1 className="NPR">CREATE LAB INVOICE </h1>
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

            <div className="fieldRow">
              <span className="patHeading">Patient Name</span>
              {/* <span className="star">*</span> */}
              <input
                type="text"
                className="RecInp"
                value={searchPatientResult.patientname}
              />
              {""}
            </div>
            <ConsultingDoctor
              searchDoc={searchDoc}
              setsearchDoc={setsearchDoc}
              setSelectedOption={setSelectedOption}
              newddlist={props.newddlist}
              triggertoggle={props.triggertoggle}
              triggerreset={triggerreset}
              setTriggertoggle={props.setTriggertoggle}
            />
            <PaymentType
              setpatientdetails={setpatientdetails}
              triggerreset={triggerreset}
            />

            <div>
              {labItems.map((lab, index) => (
                <div key={index} className="fieldRow">
                  <span className="patHeading">Lab Item</span>
                  <span className="star">*</span>
                  <select
                    className="RecInp"
                    value={lab.labItem}
                    onChange={(e) =>
                      handleInputChange(index, "labItem", e.target.value)
                    }
                  >
                    <option value="">Select Lab Item</option>
                    {props.labchargesdata.map((item) => (
                      <option key={item.serviceid} value={item.servicename}>
                        {item.servicename}
                      </option>
                    ))}
                  </select>
                  <>
                    <span className="patHeading">No of Item</span>
                    <span className="star">*</span>
                    <input
                      type="text"
                      className="RecInp"
                      placeholder="No of Item"
                      value={lab.noOfItem}
                      onChange={(e) =>
                        handleInputChange(index, "noOfItem", e.target.value)
                      }
                    />
                    <input type="hidden" value={lab.serviceid} />
                  </>
                  )
                </div>
              ))}

              <button onClick={handleAddLabItem}>Add Lab Item</button>
            </div>
          </div>
        </div>
      </div>
      <div className="buttondiv">
        <button class="button-6 savesubmit" role="button" onClick={resetform}>
          Reset
        </button>
        <button
          class="button-6 savesubmit"
          role="button"
          onClick={callValidationAndSubmit}
        >
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default CreateInvoice;
