import React from "react";
import { useState, useEffect, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import variables from "../../models/variables.json";
import { PaymentType, PatientID, DisabledPatientName } from "../General/Fields";
import {
  useTokenStore,
  usePasswordStore,
  useUsernameStore,
  usePatientIDStore,
} from "../../store/store";
import DoctorListInBilling from "../General/ConsultingDoctor";
import {
  searchpatientvalidation,
  opBilldetailsvalidation,
} from "../../Logic/Validators";
import { searchPatientDetails } from "../../apis/userverification";
import { toastSuccessStatus, toastErrorStatus } from "../General/sendToast";
import { FillOpBillingData } from "../../Logic/FormatData";
import JsonPreview from "./OPBillPreview";
import { convertbillbreakuptoArray } from "../../utils/convertjsontoArray";
import InvoiceGenerator from "./InvoiceGenerate/InvoiceGenerator";
import apioutput from "../../apioutput.json";
import { LabChargesData, LabChargesDataModel } from "../../models/Configure";
var _ = require("lodash");

function OutPatientBilling(props) {
  // // console.log("this is OutPatientBilling: ", props);
  const [searchDoc, setsearchDoc] = useState("");

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
  const [patientdetails, setpatientdetails] = useState({});
  const [showRegistrationBanner, setShowRegistrationBanner] = useState(false);
  const [searchPatientResult, setSearchPatientResult] = useState({});
  const [retriggersubmit, setretriggersubmit] = useState(false);

  const [docId, setDocId] = useState("");
  const [labItems, setLabItems] = useState([{ ...LabChargesDataModel[0] }]);

  const [jsonData, setJsonData] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorname: "",
    transactionId: "",
    labCharges: [],
  });
  const [preview, setPreview] = useState(false);
  const [generateReport, setGenerateReport] = useState(false);
  const [removeDeleteBtn, setRemoveDeleteBtn] = useState(false);
  const [opBillingResponse, setopBillingResponse] = useState({
    opBillingResponse: [],
  });
  const [list, setList] = useState([]);

  // // console.log("preview: ", preview, ": ", patientid);
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
        // .filter((item) => item.labItem !== "" && item.noOfItem !== "")
        .filter((item) => item.labItem !== "")
        ?.map((item) => ({
          labitemid: item.serviceid,
          // nooftimes: item.noOfItem,
          nooftimes: 1,
          labItemName: item.labItem,
          cost: item.cost,
          categoryid: "2",
        })),
    [labItems]
  );

  // // console.log("this is Create Invoice PROPS", props);

  useEffect(() => {
    // console.log("Triggered create OP useeffect. PatientID: ", patientid);
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
    console.log(
      "selected option effect triggered",
      selectedOption,
      "doc",
      docId
    );
    if (selectedOption) {
      setDocId(getDocIdFromOption(selectedOption[1]));
      // console.log("selected option effect triggered1", selectedOption[0]);
      setpatientdetails((prevState) => ({
        ...prevState,
        patientdetails: {
          ...prevState.patientdetails,
          consultingdoctor: selectedOption,
          fulldocdata: selectedOption,
          docId: docId,
          doctorname: selectedOption[0],
          // labcharges: labcharges(),
        },
      }));
    }
    // }, [selectedOption, labcharges, docId]);
  }, [selectedOption, docId]);

  useEffect(() => {
    // if (labItems.length > 0) {
    // if (!labItems[0].labItem == "") {
    setpatientdetails((prevState) => ({
      ...prevState,
      patientdetails: {
        ...prevState.patientdetails,
        labcharges: labcharges(),
      },
    }));
    // }
    // }
  }, [labItems]);

  useEffect(() => {
    if (generateReport) {
      callDownloadReport();
    }
  }, [generateReport]);

  useEffect(() => {
    console.log("json data length: ", jsonData.labCharges);
    if (jsonData?.labCharges?.length > 0) {
      setpatientdetails((prevState) => ({
        ...prevState,
        patientdetails: {
          ...prevState.patientdetails,
          labcharges: jsonData?.labCharges,
        },
      }));
    } else {
      setPreview(false);
      setGenerateReport(false);
    }
  }, [jsonData]);

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

  const resetform = () => {
    settriggerreset(!triggerreset);
    setpatientID("");
    setLabItems([]);
    setSearchPatientResult({});
    setShowRegistrationBanner(false);
    setopBillingResponse({});
    setRemoveDeleteBtn(false);
    setpatientdetails({});
    toastSuccessStatus("Form Reset Successfully");
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
          searchoutput.success = true;
          searchoutput.patientid = searchdata.outdata.data[0].patientid;
          searchoutput.patientname = searchdata.outdata.data[0].patientname;
          searchoutput.patientdob = searchdata.outdata.data[0].patientdob;
          searchoutput.mobilenum = searchdata.outdata.data[0].mobilenum;
          searchoutput.addregistrationflag =
            searchdata.outdata.data[0].registrationpaidflag == 0 ? true : false;
          searchoutput.consultingdoctor =
            patientdetails.patientdetails.consultingdoctor;
          searchdata.outdata.data[0].registrationpaidflag == 0
            ? setShowRegistrationBanner(true)
            : setShowRegistrationBanner(false);
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
          if (statuscode === 401) {
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
      const service = props.billChargesTable.find(
        (item) => item.servicename === value
      );
      if (service) {
        const serviceid = service.serviceid;
        newLabItems[index]["serviceid"] = serviceid;
        newLabItems[index]["cost"] = service.cost;
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

    // if (labItems.some((lab) => lab.noOfItem === "")) {
    //   // Prevent adding empty lab item
    //   toastErrorStatus("Please add number of items ");
    //   return;
    // }
    setLabItems([...labItems, { labItem: "", noOfItem: "", serviceid: "" }]);
  };

  const handleDeleteLabItem = (index) => {
    const newLabItems = [...labItems];
    newLabItems.splice(index, 1);
    setLabItems(newLabItems);
  };

  const callValidationAndSubmit = async (e) => {
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
          username,
          searchPatientResult.addregistrationflag
        );
        switch (createdata.statuscode) {
          case 200:
            if (createdata.outdata.created) {
              toastSuccessStatus("create op bill Successfully!!");
              // console.log(
              //   "Download OP Bill0 : ",
              //   createdata,
              //   opBillingResponse
              // );
              setShowRegistrationBanner(false);
              // setopBillingResponse((prevState) => ({
              //   opBillingResponse: createdata?.outdata?.billingdata?.data
              // }))
              setopBillingResponse(createdata?.outdata?.billingdata?.data);
              setGenerateReport(true);
              setRemoveDeleteBtn(true);
              // setPreview(!preview);
              // let breakuplist = convertbillbreakuptoArray(opBillingResponse.breakup);
              // // console.log("breakuplist1 : ",breakuplist)
              // setList(breakuplist);
              // // console.log("breakuplist LIST : ", list);
              // // console.log("Created Data from OpBill: ", createdata);
              // // console.log("Download OP Bill2 : ", opBillingResponse);
              // // console.log("Download OP Bill Completed : ");
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
            if (statuscode === 401) {
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
      toastErrorStatus("Incomplete Form");
    }
  };

  // // console.log("I am create Invoice Patient: ", patientdetails.patientdetails);
  // // console.log(
  //   "labItems: ",
  //   labItems,
  //   "props labchrages : ",
  //   props.billChargesTable
  // );

  const previewFormData = () => {
    // setPreview(!preview)
    if (opBilldetailsvalidation(patientdetails.patientdetails)) {
      setPreview(!preview);
      // // console.log("callValidationAndSubmit create Invoice1: ", patientdetails);
      // console.log("DoctorName: ", patientdetails.patientdetails.doctorname);
      setJsonData((prevState) => ({
        ...prevState,
        patientId: patientdetails.patientdetails.patientid,
        patientName: searchPatientResult.patientname,
        doctorId: patientdetails.patientdetails.docId,
        doctorname: patientdetails.patientdetails.doctorname,
        transactionId: patientdetails.patientdetails.transactionid,
        labCharges: patientdetails.patientdetails.labcharges,
      }));
    } else {
      toastErrorStatus(
        "Some Details are missing!! Please fill all required details!!"
      );
    }
  };

  const callDownloadReport = () => {
    // console.log("callDownloadReport: ", opBillingResponse);
    // setGenerateReport(true);
    let breakuplist = convertbillbreakuptoArray(opBillingResponse.breakup);
    // console.log("breakuplist: ", breakuplist);
    setList(breakuplist);
    // console.log("breakuplistupdated : ", list);
  };

  return (
    <div className="[height:100%] [width:100%] overflow-y-scroll overflow-x-clip">
      <h1 className="bg-[#f2ecff] text-[#04040c] h-24 flex items-center justify-start box-border p-5 rounded-l-xl ml-2 mt-2 mb-12 [width:100%]">
        Create Lab Billing{" "}
      </h1>
      <div className="Rece-flex-item-right">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            callValidationAndSubmit(e);
          }}
        >
          {!generateReport && !preview && (
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
                    externalvalue={searchPatientResult.patientname}
                    triggerreset={triggerreset}
                  />
                  {/* <div className="fieldRow">
                  <span className="patHeading">Patient Name</span>
                   <span className="sgittar">*</span>
                  <input
                    type="text"
                    className="RecInp"
                    value={searchPatientResult.patientname}
                    readOnly
                  />
                  <span contentEditable="true" style={spanStyle}>{searchPatientResult.patientname}</span>
                </div> */}
                  {/* <ConsultingDoctor
                  searchDoc={searchDoc}
                  selectedoption={patientdetails.patientdetails?.doctorname}
                  setsearchDoc={setsearchDoc}
                  setSelectedOption={setSelectedOption}
                  newddlist={props.newddlist}
                  triggertoggle={props.triggertoggle}
                  triggerreset={triggerreset}
                  setTriggertoggle={props.setTriggertoggle}
                /> */}
                  <DoctorListInBilling
                    searchDoc={searchDoc}
                    selectedoption={patientdetails.patientdetails?.doctorname}
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
                    externalvalue={
                      patientdetails.patientdetails?.transactionid
                        ? patientdetails.patientdetails?.transactionid
                        : ""
                    }
                  />
                  {showRegistrationBanner && (
                    <div className="text-red-500 text-sm">
                      * Registration Charges will be added for this patient in
                      final bill
                    </div>
                  )}

                  <div className="flex justify-center items-center gap-2 flex-col">
                    {labItems?.map((lab, index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center justify-center "
                      >
                        <div className="flex justify-start items-center gap-2">
                          <span className="patHeading">Lab Item</span>
                          <span className="text-red-500">*</span>
                          <select
                            required
                            className="w-80 h-8"
                            value={lab.labItem}
                            onChange={(e) =>
                              handleInputChange(
                                index,
                                "labItem",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Lab Item</option>
                            {props.billChargesTable?.map((item) => (
                              <option
                                key={item.serviceid}
                                value={item.servicename}
                              >
                                {item.servicename.concat(" - Rs ", item.cost)}
                              </option>
                            ))}
                          </select>
                        </div>
                        {/* <div className="flex justify-center items-center  gap-1">
  
                          <span className="patHeading">Qty</span>
                          <span className="text-red-500">*</span>
                          <input
                            type="number"
                            className="w-10 h-8"
                            placeholder="No of Item"
                            value={lab.noOfItem}
                            onChange={(e) => {
                              if (e.target.value < 999 && e.target.value >= 0) {
                                if (e.target.value.length == 0) {
                                  handleInputChange(
                                    index,
                                    "noOfItem",
                                    e.target.value
                                  );
                                } else if (e.target.value > 0) {
                                  handleInputChange(
                                    index,
                                    "noOfItem",
                                    e.target.value
                                  );
                                }
                              }
                            }}
                          />
                          </div> */}
                        <input type="hidden" value={lab.serviceid} />
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() => handleDeleteLabItem(index)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}

                    <button
                      className="add-btn"
                      onClick={handleAddLabItem}
                      type="button"
                    >
                      Add Lab Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex flex-col justify-center items-center xl:flex-row">
            <div>
              {preview && (
                <div>
                  <JsonPreview
                    setJsonData={setJsonData}
                    jsonData={jsonData}
                    removeDeleteBtn={removeDeleteBtn}
                    handleDeleteLabItem={handleDeleteLabItem}
                  />
                </div>
              )}
              <div className="buttondiv">
                {!generateReport && !preview && (
                  <button
                    class="button-6 savesubmit"
                    onClick={resetform}
                    type="button"
                  >
                    Reset
                  </button>
                )}
                {preview && (
                  <button
                    class="button-6 savesubmit"
                    type="button"
                    onClick={() => {
                      setPreview(false);
                      setGenerateReport(false);
                      setRemoveDeleteBtn(false);
                    }}
                  >
                    Back
                  </button>
                )}
                {!generateReport && !preview && (
                  <button
                    class="button-6 savesubmit"
                    onClick={previewFormData}
                    type="button"
                  >
                    Preview
                  </button>
                )}
                {preview && !generateReport && (
                  <button
                    class="button-6 savesubmit"
                    // onClick={callValidationAndSubmit}
                    type="submit"
                    // disabled={generateReport}
                  >
                    SUBMIT
                  </button>
                )}
                {/* {generateReport && (
                <button class="button-6 savesubmit" onClick={callDownloadReport}>
                  Download
                </button>
              )} */}
              </div>
            </div>
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
        </form>
      </div>
    </div>
  );
}

export default OutPatientBilling;

// 1) Preview same page
// 2) preview page submit button
// 3) submit button click- pdf display
// after submit -> download or OPBilling/reset
// 4) allow user to download
