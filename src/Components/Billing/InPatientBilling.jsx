import React from "react";
import { useState, useEffect, useCallback } from "react";
import { BsSearch } from "react-icons/bs";
import {
  PaymentType,
  SearchInPatientID,
  DisabledPatientName,
} from "../General/Fields";
import {
  useTokenStore,
  usePasswordStore,
  useUsernameStore,
  useInPatientIDStore,
} from "../../store/store";
import ConsultingDoctor from "../General/ConsultingDoctor";
import {
  ipBilldetailsvalidation,
  searchInPatientValidation,
} from "../../Logic/Validators";
import { searchInPatientDetails } from "../../apis/userverification";
import { toastSuccessStatus, toastErrorStatus } from "../General/sendToast";
import { FillIpBillingData } from "../../Logic/FormatData";
import JsonPreview from "./OPBillPreview";
import { convertbillbreakuptoArray } from "../../utils/convertjsontoArray";
import InvoiceGenerator from "./InvoiceGenerate/InvoiceGenerator";
import {
  BedChargesDataModel,
  LabChargesDataModelIP,
  OtherChargesDataModel,
  RegistrationDataModel,
} from "../../models/Configure";
import variables from "../../models/variables.json";

function InPatientBilling(props) {
  // console.log("this is InPatientBilling: ", props);
  const [searchDoc, setsearchDoc] = useState("");

  const statuscode = useTokenStore((state) => state.token.statuscode);
  const token = useTokenStore((state) => state.token.token);
  const setToken = useTokenStore((state) => state.setToken);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const username = useUsernameStore((state) => state.username);
  const password = usePasswordStore((state) => state.password);
  const patientid = useInPatientIDStore((state) => state.inPatientID);
  const setpatientID = useInPatientIDStore((state) => state.setInpatientID);

  const [retriggersearch, setretriggersearch] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [triggerreset, settriggerreset] = useState(false);
  const [patientdetails, setpatientdetails] = useState({ patientdetails: [] });
  const [searchPatientResult, setSearchPatientResult] = useState([]);
  const [retriggersubmit, setretriggersubmit] = useState(false);
  // const [manualEntryTrigger, setmanualEntryTrigger] = useState([]);

  const [docId, setDocId] = useState("");
  const [labItems, setLabItems] = useState([{ ...LabChargesDataModelIP[0] }]);
  const [bedItems, setBedItems] = useState([{ ...BedChargesDataModel[0] }]);
  const [otherItems, setOtherItems] = useState([
    { ...OtherChargesDataModel[0] },
  ]);

  const [jsonData, setJsonData] = useState({
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorname: "",
    transactionId: "",
    labCharges: [],
    bedCharges: [],
    otherCharges: [],
  });
  const [preview, setPreview] = useState(false);
  const [generateReport, setGenerateReport] = useState(false);
  const [opBillingResponse, setopBillingResponse] = useState({
    opBillingResponse: [],
  });
  const [list, setList] = useState([]);
  const [showRegistrationBanner, setShowRegistrationBanner] = useState(false);
  const [removeDeleteBtn, setRemoveDeleteBtn] = useState(false);

  const getDocIdFromOption = (option) => {
    try {
      const obj = JSON.parse(option);
      return obj.docid;
    } catch (error) {
      console.error("Error parsing JSON DocId:", error);
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
          labItemName: item.labItem,
          cost: item.cost,
          categoryid: "2",
        })),
    [labItems]
  );

  const bedcharges = useCallback(
    () =>
      bedItems
        .filter((item) => item.bedItem !== "" && item.noOfItem !== "")
        ?.map((item) => ({
          bedchargeitemid: item.serviceid,
          noofdays: item.noOfItem,
          bedItemName: item.bedItem,
          cost: item.cost,
          categoryid: "4",
        })),
    [bedItems]
  );

  const othercharges = useCallback(
    () =>
      otherItems
        .filter((item) => item.otherItem !== "" && item.noOfItem !== "")
        ?.map((item) => {
          // console.log(item);
          return {
            otherchargeitemid: item.serviceid,
            noofitmes: item.noOfItem,
            otherItemName: item.otherItem,
            cost: item.cost,
            categoryid: "1",
            manualAmtEntry: item.manualAmtEntry,
          };
        }),
    [otherItems]
  );

  useEffect(() => {
    // console.log("selected option effect triggered", selectedOption,"docID", docId);
    if (selectedOption) {
      setDocId(getDocIdFromOption(selectedOption[1]));
      setpatientdetails((prevState) => ({
        ...prevState,
        patientdetails: {
          ...prevState.patientdetails,
          consultingdoctor: selectedOption,
          docId: docId,
          doctorname: selectedOption[0],
          // labcharges: labcharges(),
          // bedcharges: bedcharges(),
        },
      }));
    }
    // }, [selectedOption, labcharges, docId, bedcharges]);
  }, [selectedOption, docId]);

  useEffect(() => {
    setpatientdetails((prevState) => ({
      ...prevState,
      patientdetails: {
        ...prevState.patientdetails,
        labcharges: labcharges(),
      },
    }));
  }, [labItems]);
  useEffect(() => {
    setpatientdetails((prevState) => ({
      ...prevState,
      patientdetails: {
        ...prevState.patientdetails,
        bedcharges: bedcharges(),
      },
    }));
  }, [bedItems]);
  useEffect(() => {
    setpatientdetails((prevState) => ({
      ...prevState,
      patientdetails: {
        ...prevState.patientdetails,
        othercharges: othercharges(),
      },
    }));
  }, [otherItems]);

  useEffect(() => {
    if (generateReport) {
      callDownloadReport();
    }
  }, [generateReport]);

  useEffect(() => {
    // console.log("json data length: ", jsonData.labCharges.length);
    if (
      jsonData?.labCharges?.length > 0 ||
      jsonData?.bedCharges?.length > 0 ||
      jsonData?.otherCharges?.length > 0
    ) {
      setpatientdetails((prevState) => ({
        ...prevState,
        patientdetails: {
          ...prevState.patientdetails,
          labcharges: jsonData?.labCharges,
          bedcharges: jsonData?.bedCharges,
          othercharges: jsonData?.otherCharges,
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
    setBedItems([]);
    setOtherItems([]);
    setSearchPatientResult({});
    setopBillingResponse({});
    setShowRegistrationBanner(false);
    setRemoveDeleteBtn(false);
    setpatientdetails({});
    toastSuccessStatus("Form Reset Successfully");
  };

  const searchPatient = async () => {
    // console.log(
    //   "Invoice  ",
    //   process.env.REACT_APP_SearchInPatientID,
    //   patientdetails.patientdetails.patientid
    // );
    let searchoutput = {};
    if (
      searchInPatientValidation(patientdetails.patientdetails.patientid, "")
    ) {
      let searchdata = await searchInPatientDetails(
        process.env.REACT_APP_SearchInPatientID,
        patientdetails.patientdetails.patientid,
        token
      );
      // console.log("CreateInvoice SearchData", searchdata);
      switch (searchdata.statuscode) {
        case 200:
          if (searchdata.outdata.iprecord.data.length <= 0) {
            toastErrorStatus("No Patient Found!!");
            break;
          }
          // // console.log("CreateInvoice ",searchdata.outdata.iprecord.data);
          searchoutput.success = true;
          searchoutput.patientid =
            searchdata.outdata.iprecord.data[0].inpatientid;
          searchoutput.patientname =
            searchdata.outdata.iprecord.data[0].patientname;

          // console.log(
          //   "searchdata2: ",
          //   searchoutput,
          //   "searchPatientResult: ",
          //   searchPatientResult
          // );
          searchoutput.success = true;
          searchoutput.addregistrationflag =
            searchdata.outdata.iprecord.data[0].registrationpaidflag == 0
              ? true
              : false;
          searchdata.outdata.iprecord.data[0].registrationpaidflag == 0
            ? setShowRegistrationBanner(true)
            : setShowRegistrationBanner(false);

          if (searchoutput.addregistrationflag) {
            // setOtherItems([...otherItems, { ...RegistrationDataModel[0] }]);
            setShowRegistrationBanner(true);
          } else {
            setShowRegistrationBanner(false);
          }
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
      const service = props.billChargesTable[0]?.labchargesdata?.find(
        (item) => item.servicename === value
      );
      if (service) {
        // // console.log("INpatiant service : ",service)
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

    if (labItems.some((lab) => lab.noOfItem === "")) {
      // Prevent adding empty lab item
      toastErrorStatus("Please add number of items ");
      return;
    }
    setLabItems([...labItems, { labItem: "", noOfItem: "", serviceid: "" }]);
  };

  const handleDeleteLabItem = (index) => {
    const newLabItems = [...labItems];
    newLabItems.splice(index, 1);
    setLabItems(newLabItems);
  };

  const handleInputChangeBed = (index, field, value) => {
    const newLabItems = [...bedItems];
    newLabItems[index][field] = value;

    if (field === "bedItem") {
      // Find the corresponding serviceid for the selected bedItem
      const service = props.billChargesTable[1].bedchargesdata.find(
        (item) => item.servicename === value
      );
      if (service) {
        // // console.log("INpatiant service 1: ",service)
        const serviceid = service.serviceid;
        newLabItems[index]["serviceid"] = serviceid;
        newLabItems[index]["cost"] = service.cost;
      } else {
        // Reset serviceid if bedItem is not found
        newLabItems[index]["serviceid"] = "";
      }
    }

    setBedItems(newLabItems);
  };

  const handleAddBedItem = () => {
    if (bedItems.some((bed) => bed.bedItem === "")) {
      // Prevent adding empty bed item
      toastErrorStatus("Please add bed items!");
      return;
    }

    if (bedItems.some((bed) => bed.noOfItem === "")) {
      // Prevent adding empty bed item
      toastErrorStatus("Please add number of items ");
      return;
    }
    setBedItems([...bedItems, { bedItem: "", noOfItem: "", serviceid: "" }]);
  };

  const handleDeleteBedItem = (index) => {
    const newLabItems = [...bedItems];
    newLabItems.splice(index, 1);
    setBedItems(newLabItems);
  };
  const handleInputChangeOtherItems = (index, field, value) => {
    // console.log(index, field, value);
    const newOtherItems = [...otherItems];
    newOtherItems[index][field] = value;

    if (field === "otherItem") {
      // Find the corresponding serviceid for the selected bedItem
      const service = props.billChargesTable[2].otherchargesdata.find(
        (item) => item.servicename === value
      );
      if (service) {
        // // console.log("INpatiant service 1: ",service)
        const serviceid = service.serviceid;
        newOtherItems[index]["serviceid"] = serviceid;
        newOtherItems[index]["cost"] = service.cost;
      } else {
        // Reset serviceid if bedItem is not found
        newOtherItems[index]["serviceid"] = "";
      }
    }

    if (!newOtherItems[index]["manualAmtEntry"]) {
      console.log("revert back cost");
      console.log(newOtherItems[index]);
      const service = props.billChargesTable[2].otherchargesdata.find(
        (item) => item.servicename === newOtherItems[index]["otherItem"]
      );
      // console.log(service);
      newOtherItems[index]["cost"] = service.cost;
    }
    console.log(newOtherItems);

    setOtherItems(newOtherItems);
  };

  const handleAddOtherItem = () => {
    if (otherItems.some((otheritem) => otheritem.otherItem === "")) {
      // Prevent adding empty bed item
      toastErrorStatus("Please add Other items!");
      return;
    }

    if (otherItems.some((otheritem) => otheritem.noOfItem === "")) {
      // Prevent adding empty bed item
      toastErrorStatus("Please add other number of items ");
      return;
    }
    setOtherItems([
      ...otherItems,
      {
        otherItem: "",
        noOfItem: "",
        serviceid: "",
        manualAmtEntry: false,
        cost: "",
      },
    ]);
  };

  const handleDeleteOtherItem = (index) => {
    const newOtherItems = [...otherItems];
    newOtherItems.splice(index, 1);
    setOtherItems(newOtherItems);
  };

  const callValidationAndSubmit = async (e) => {
    // console.log(
    //   "callValidationAndSubmit create Invoice: ",
    //   patientdetails,
    //   docId
    // );
    e.preventDefault();
    if (patientdetails?.patientdetails?.patientid) {
      if (ipBilldetailsvalidation(patientdetails.patientdetails)) {
        let createdata = await FillIpBillingData(
          patientdetails.patientdetails,
          token,
          username,
          searchPatientResult.addregistrationflag
        );
        switch (createdata.statuscode) {
          case 200:
            if (createdata.outdata.created) {
              setShowRegistrationBanner(false);
              toastSuccessStatus("create op bill Successfully!!");
              setopBillingResponse(createdata?.outdata?.billingdata?.data);
              setGenerateReport(true);
              setRemoveDeleteBtn(true);
              // console.log(
              //   "Download OP Bill0 : ",
              //   createdata,
              //   opBillingResponse
              // );

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
            setretriggersubmit(true);
            break;
          default:
            resetform();
            toastErrorStatus("Something went wrong. Try Again!!");
            break;
        }
      } else toastErrorStatus("Incomplete Details");
    } else {
      toastErrorStatus("Incomplete Form");
      resetform();
    }
  };
  const previewFormData = () => {
    // setPreview(!preview)
    console.log(patientdetails.patientdetails);
    if (ipBilldetailsvalidation(patientdetails.patientdetails)) {
      setPreview(!preview);
      // console.log("callValidationAndSubmit create Invoice1: ", patientdetails);

      setJsonData((prevState) => ({
        ...prevState,
        patientId: patientdetails.patientdetails.patientid,
        patientName: searchPatientResult.patientname,
        doctorId: patientdetails.patientdetails.docId,
        doctorname: patientdetails.patientdetails.doctorname,
        transactionId: patientdetails.patientdetails.transactionid,
        labCharges: patientdetails.patientdetails.labcharges,
        bedCharges: patientdetails.patientdetails.bedcharges,
        otherCharges: patientdetails.patientdetails.othercharges,
      }));
      // // console.log("jsonData: ", jsonData);
    } else {
      toastErrorStatus(
        "Some Details are missing!! Please fill all required details!!"
      );
    }
  };

  const callDownloadReport = () => {
    let breakuplist = convertbillbreakuptoArray(opBillingResponse.breakup);
    setList(breakuplist);
    // console.log("breakuplistupdated : ", breakuplist, list, opBillingResponse);
  };
  // // console.log("I am create Invoice Patient: ",patientdetails.patientdetails,removeDeleteBtn);
  // // console.log('labItems: ',labItems,"props labchrages : ",props.billChargesTable)

  return (
    <div className="[height:100%] [width:100%] overflow-y-scroll overflow-x-clip">
      {" "}
      <h1 className="bg-[#f2ecff] text-[#04040c] h-24 flex items-center justify-start box-border p-5 rounded-l-xl ml-2 mt-2 mb-12 [width:100%]">
        Create IP Billing{" "}
      </h1>
      <div className="Rece-flex-item-right">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            callValidationAndSubmit(e);
          }}
          className="flex flex-col"
        >
          {!generateReport && !preview && (
            <div className="Rece-flex-container">
              <div className="container-right">
                <div className="patientDet">
                  <SearchInPatientID
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
                <span className="star">*</span> 
                <input
                  type="text"
                  className="RecInp"
                  value ={searchPatientResult.patientname}
                />{""}
              </div> */}
                  <ConsultingDoctor
                    searchDoc={searchDoc}
                    setsearchDoc={setsearchDoc}
                    setSelectedOption={setSelectedOption}
                    selectedoption={patientdetails.patientdetails?.doctorname}
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
                  {/* <div>
                    <span className="patHeading">Advance Bill</span>
                    <span className="star">*</span>
                    <input
                      required
                      title="Advance Bill"
                      type="checkbox"
                      checked={false}
                      className="RecInp"
                      maxLength={50}
                      placeholder="Payment Type"
                      onChange={(e) => {
                        console.log(e.target.checked);
                      }}
                    />
                  </div> */}
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
                        <div className="flex justify-center items-center gap-1">
                          <span className="patHeading">Lab Item</span>
                          <span className="text-red-500">*</span>
                          <select
                            required
                            className="w-44 h-8"
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
                            {props.billChargesTable[0]?.labchargesdata?.map(
                              (item) => (
                                <option
                                  key={item.serviceid}
                                  value={item.servicename}
                                >
                                  {item.servicename.concat(" - Rs ", item.cost)}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="flex justify-center items-center  gap-1">
                          <span className="patHeading">Qty</span>
                          <span className="text-red-500">*</span>
                          <input
                            required
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
                          <input type="hidden" value={lab.serviceid} />
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDeleteLabItem(index)}
                          >
                            Delete
                          </button>
                        </div>
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
                  <div className="flex justify-center items-center gap-2 flex-col">
                    {bedItems?.map((bed, index) => (
                      <div
                        key={index}
                        className="flex flex-row gap-3 items-center justify-center "
                      >
                        <div className="flex justify-center items-center gap-1">
                          <span className="patHeading">Bed Item</span>
                          <span className="text-red-500">*</span>
                          <select
                            required
                            className="w-44 h-8"
                            value={bed.bedItem}
                            onChange={(e) =>
                              handleInputChangeBed(
                                index,
                                "bedItem",
                                e.target.value
                              )
                            }
                          >
                            <option value="">Select Bed Item</option>
                            {props.billChargesTable[1].bedchargesdata?.map(
                              (item) => (
                                <option
                                  key={item.serviceid}
                                  value={item.servicename}
                                >
                                  {item.servicename.concat(" - Rs ", item.cost)}
                                </option>
                              )
                            )}
                          </select>
                        </div>
                        <div className="flex justify-center items-center  gap-1">
                          <span className="patHeading">Days</span>
                          <span className="text-red-500">*</span>
                          <input
                            required
                            type="number"
                            className="w-10 h-8"
                            placeholder="No of Item"
                            value={bed.noOfItem}
                            onChange={(e) => {
                              if (e.target.value < 999 && e.target.value >= 0) {
                                if (e.target.value.length == 0) {
                                  handleInputChangeBed(
                                    index,
                                    "noOfItem",
                                    e.target.value
                                  );
                                } else if (e.target.value > 0) {
                                  handleInputChangeBed(
                                    index,
                                    "noOfItem",
                                    e.target.value
                                  );
                                }
                              }
                            }}
                          />
                          <input type="hidden" value={bed.serviceid} />
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => handleDeleteBedItem(index)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="add-btn"
                      onClick={handleAddBedItem}
                      text-align="right"
                    >
                      Add Bed Item
                    </button>
                  </div>
                  <div className="flex justify-center items-center gap-2 flex-col">
                    {otherItems?.map((otheritem, index) => (
                      <div
                        key={index}
                        className="flex flex-col gap-1 items-center justify-center "
                      >
                        <div className="flex justify-center items-center gap-1">
                          <div className="flex justify-center items-center gap-1">
                            <span className="patHeading">Other Items</span>
                            <span className="text-red-500">*</span>
                            <select
                              required
                              className="w-44 h-8"
                              value={otheritem.otherItem}
                              onChange={(e) =>
                                handleInputChangeOtherItems(
                                  index,
                                  "otherItem",
                                  e.target.value
                                )
                              }
                            >
                              <option value="">Select Other Item</option>
                              {props.billChargesTable[2].otherchargesdata?.map(
                                (item) => (
                                  <option
                                    key={item.serviceid}
                                    value={item.servicename}
                                  >
                                    {item.servicename.concat(
                                      " - Rs ",
                                      item.cost
                                    )}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                          <div className="flex justify-center items-center  gap-1">
                            <span className="patHeading">Qty</span>
                            <span className="text-red-500">*</span>
                            <input
                              required
                              type="number"
                              className="w-10 h-8"
                              placeholder="No of Item"
                              value={otheritem.noOfItem}
                              onChange={(e) => {
                                if (
                                  e.target.value < 999 &&
                                  e.target.value >= 0
                                ) {
                                  if (e.target.value.length == 0) {
                                    handleInputChangeOtherItems(
                                      index,
                                      "noOfItem",
                                      e.target.value
                                    );
                                  } else if (e.target.value > 0) {
                                    handleInputChangeOtherItems(
                                      index,
                                      "noOfItem",
                                      e.target.value
                                    );
                                  }
                                }
                              }}
                            />
                            <input type="hidden" value={otheritem.serviceid} />
                            <div className="font-light flex flex-col justify-center items-center text-xs gap-2 ml-4">
                              <div className="flex items-center justify-between gap-1 bg-slate-300 p-1 rounded">
                                <input
                                  type="checkbox"
                                  defaultChecked={false}
                                  checked={otheritem.manualAmtEntry}
                                  id={`ManualAmtEntry${index}`}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    console.log(index);
                                    handleInputChangeOtherItems(
                                      index,
                                      "manualAmtEntry",
                                      e.target.checked
                                    );
                                    // setmanualEntryTrigger(!manualEntryTrigger);
                                  }}
                                />
                                <label
                                  htmlFor={`ManualAmtEntry${index}`}
                                  className="text-purple-700 mb-0 text-xs"
                                >
                                  Manual Amt Entry
                                </label>
                              </div>
                              <button
                                type="button"
                                className="delete-btn"
                                onClick={() => handleDeleteOtherItem(index)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        <div>
                          {otheritem.manualAmtEntry ? (
                            <div className="flex gap-2 items-center justify-evenly">
                              <span className="patHeading">
                                Amount
                                <span className="text-red-500 ml-1">*</span>
                              </span>
                              <input
                                required
                                type="number"
                                className="w-32 h-8"
                                placeholder="No of Item"
                                // min="0.01"
                                // step="0.01"
                                value={otheritem.cost}
                                onChange={(e) => {
                                  console.log(e.target.value);
                                  if (e.target.value >= 0) {
                                    handleInputChangeOtherItems(
                                      index,
                                      "cost",
                                      e.target.value
                                    );
                                    console.log("Amount");
                                  }
                                }}
                              />
                            </div>
                          ) : (
                            void 0
                          )}
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="add-btn"
                      onClick={handleAddOtherItem}
                      text-align="right"
                    >
                      Add Other Item
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-center items-center flex-col xl:flex-row">
            <div>
              {preview && (
                <div>
                  <JsonPreview
                    setJsonData={setJsonData}
                    jsonData={jsonData}
                    removeDeleteBtn={removeDeleteBtn}
                    handleDeleteLabItem={handleDeleteLabItem}
                    handleDeleteBedItem={handleDeleteBedItem}
                    handleDeleteOtherItem={handleDeleteOtherItem}
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
                    onClick={() => {
                      setPreview(false);
                      setGenerateReport(false);
                      setRemoveDeleteBtn(false);
                    }}
                    type="button"
                  >
                    Back
                  </button>
                )}
                {!generateReport && !preview && (
                  <button
                    class="button-6 savesubmit"
                    type="button"
                    onClick={previewFormData}
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
                patientid={opBillingResponse?.admissiondetails.patientid}
                patientname={opBillingResponse?.admissiondetails.patientname}
                sex={opBillingResponse?.admissiondetails.sex}
                doctorname={
                  opBillingResponse?.admissiondetails.consultingdoctor
                }
                age={
                  opBillingResponse?.admissiondetails.age + variables.agesuffix
                }
                phonenumber={
                  opBillingResponse?.admissiondetails.relativephonenumber
                }
                totalmrp={opBillingResponse?.mrp.toFixed(2)}
                additionalhospitalcharges={opBillingResponse?.additionalhospitalcharges.toFixed(
                  2
                )}
                IPR={opBillingResponse?.admissiondetails?.IPRNo}
                relativename={opBillingResponse?.admissiondetails?.relativename}
                relativephone={
                  opBillingResponse?.admissiondetails?.relativephonenumber
                }
                relativerelation={
                  opBillingResponse?.admissiondetails?.relativerelation
                }
                // relativephone={opBillingResponse?.admissiondetails?.relativephonenumber}
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

export default InPatientBilling;

// 1) Preview same page
// 2) preview page submit button
// 3) submit button click- pdf display
// 4) allow user to download
