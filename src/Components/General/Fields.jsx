import { useEffect, useState } from "react";
import { useIPDetailsStore } from "../../store/store";
import { usePatientIDStore } from "../../store/store";
// import { useBootstrapPrefix } from "react-bootstrap/esm/ThemeProvider";
import variables from "../../models/variables.json";
var _ = require("lodash");

export const NameField = ({
  triggerreset,
  setpatientdetails,
  disabled,
  externalvalue,
  count,
}) => {
  const [value, setValue] = useState("");
  const handleOnChange = (e) => {
    let inputValue = e.target.value;

    // Remove leading numbers
    inputValue = inputValue.replace(/^\d+/, "");

    // Replace multiple spaces with a single space
    inputValue = inputValue.replace(/\s+/g, " ");

    // Disallow special characters
    inputValue = inputValue.replace(/[^A-Za-z\s]/g, "");

    // Remove space at the beginning of the string
    inputValue = inputValue.trimLeft();

    setValue(inputValue);

    setpatientdetails((prevState) => ({
      patientdetails: {
        ...prevState.patientdetails,
        namevalue: inputValue.trim(),
      },
    }));
  };

  useEffect(() => {
    setValue("");
  }, [triggerreset, count]);

  useEffect(() => {
    if (_.isEmpty(externalvalue.trim())) setValue(externalvalue);
  }, [externalvalue]);

  return (
    <div className="fieldRow">
      <span className="patHeading">Full Name</span>
      <span className="star">*</span>
      <input
        required
        id="name"
        title="Enter Full Name"
        type="text"
        className="RecInp"
        placeholder="Name"
        maxLength={32}
        value={value}
        // onChange={(e) => {

        // setpatientdetails((prevState) => ({
        //   patientdetails: {
        //     ...prevState.patientdetails,
        //     namevalue: e.target.value,
        //   },
        // }));
        //   setValue(e.target.value);
        // }}
        onChange={handleOnChange}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const DisabledPatientName = ({ externalvalue }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log("external value changed", externalvalue);
    if (_.isUndefined(externalvalue)) {
      setValue("");
    } else {
      setValue(externalvalue);
    }
  }, [externalvalue]);
  return (
    <div className="fieldRow">
      <span className="patHeading">Patient Name</span>
      <span className="star"> </span>
      <input type="text" className="RecInp" value={value} readOnly />
      <span className="refreshicon"></span>
    </div>
  );
};

export const Age = ({ triggerreset, setpatientdetails }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue("");
  }, [triggerreset]);
  return (
    <div className="fieldRow">
      <span className="patHeading">Age</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Age"
        type="number"
        className="RecInp"
        placeholder="Age"
        value={value}
        onChange={(e) => {
          // console.log(e.target.value);
          if (e.target.value.length <= 3 && e.target.value >= 0) {
            if (e.target.value.length == 0) {
              setpatientdetails((prevState) => ({
                patientdetails: {
                  ...prevState.patientdetails,
                  age: e.target.value,
                },
              }));
              setValue(e.target.value);
            } else if (e.target.value > 0) {
              setpatientdetails((prevState) => ({
                patientdetails: {
                  ...prevState.patientdetails,
                  age: e.target.value,
                },
              }));
              setValue(e.target.value);
            }
          }
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

// export const Sex = ({ triggerreset, setpatientdetails }) => {
//   const [value, setValue] = useState("");
//   useEffect(() => {
//     setValue("");
//   }, [triggerreset]);
//   return (
//     <div className="fieldRow">
//       <span className="patHeading">Sex</span>
//       <span className="star">*</span>
//       <input
//         required
//         type="text"
//         className="RecInp"
//         placeholder="Sex"
//         value={value}
//         maxLength={1}
//         onChange={(e) => {
//           setpatientdetails((prevState) => ({
//             patientdetails: {
//               ...prevState.patientdetails,
//               sex: e.target.value,
//             },
//           }));
//           setValue(e.target.value);
//         }}
//       />
//       <span className="refreshicon"></span>
//     </div>
//   );
// };

export const Sex = ({ triggerreset, setpatientdetails }) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue("");
  }, [triggerreset]);

  const handleRadioButtonChange = (selectedValue) => {
    setpatientdetails((prevState) => ({
      ...prevState,
      patientdetails: {
        ...prevState.patientdetails,
        sex: selectedValue,
      },
    }));
    setValue(selectedValue);
  };

  return (
    // <div className="flex  gap-2 ">
    <div className="fieldRow ">
      {/* <div className="patHeading flex justify-end items-center"> */}
      <div className="patHeading">
        <span className="text-[#36454f] text-base font-normal [letter-spacing: 0.5px] box-border">
          Sex
        </span>
        {/* <span className="star ml-2">*</span> */}
      </div>
      <span className="star ml-2">*</span>
      <div className="flex justify-center items-center gap-16 [flex:70] [width:400px] [height:25px] box-border">
        {/* <div className="RecInp"> */}
        <label className=" m-0 flex items-center justify-start font-medium gap-1 text-base">
          <input
            type="radio"
            name="sex"
            value="M"
            checked={value === "M"}
            onChange={() => handleRadioButtonChange("M")}
          />
          M
        </label>

        <label className=" m-0 flex items-center justify-start font-medium gap-1 text-base ">
          <input
            type="radio"
            name="sex"
            value="F"
            checked={value === "F"}
            onChange={() => handleRadioButtonChange("F")}
          />
          F
        </label>
        <label className=" m-0 flex items-center justify-start font-medium gap-1 text-base">
          <input
            type="radio"
            name="sex"
            value="O"
            checked={value === "O"}
            onChange={() => handleRadioButtonChange("O")}
          />
          Oth
        </label>
      </div>
      <span className="refreshicon"></span>
    </div>
  );
};

export const EmailField = ({ triggerreset, setpatientdetails }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue("");
  }, [triggerreset]);
  return (
    <div className="fieldRow">
      <span className="patHeading">Email</span>
      {/* <span className="star">*</span> */}
      <span className="star"></span>
      <input
        // required
        type="text"
        className="RecInp"
        value={value}
        maxLength={50}
        placeholder="Email"
        onChange={(e) => {
          setpatientdetails((prevState) => ({
            patientdetails: {
              ...prevState.patientdetails,
              emailid: e.target.value,
            },
          }));
          setValue(e.target.value);
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const Mobile = ({ triggerreset, setpatientdetails }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue("");
  }, [triggerreset]);
  return (
    <div className="fieldRow">
      <span className="patHeading">Mobile</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Mobile Number"
        type="number"
        value={value}
        maxLength={10}
        className="RecInp"
        placeholder="Mobile"
        onChange={(e) => {
          if (e.target.value.length <= 10 && e.target.value >= 0) {
            if (e.target.value.length == 0) {
              setpatientdetails((prevState) => ({
                patientdetails: {
                  ...prevState.patientdetails,
                  mobile: e.target.value,
                },
              }));
              setValue(e.target.value);
            } else if (e.target.value > 0) {
              setpatientdetails((prevState) => ({
                patientdetails: {
                  ...prevState.patientdetails,
                  mobile: e.target.value,
                },
              }));
              setValue(e.target.value);
            }
          }
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const Altmobile = ({ triggerreset, setpatientdetails }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue("");
  }, [triggerreset]);
  return (
    <div className="fieldRow">
      <span className="patHeading">Alternate Mobile</span>
      {/* <span className="star">*</span> */}
      <span className="star"></span>
      <input
        // required
        type="number"
        value={value}
        maxLength={10}
        className="RecInp"
        placeholder="Alternate Mobile"
        onChange={(e) => {
          if (e.target.value < 9999999999 && e.target.value >= 0) {
            if (e.target.value.length == 0) {
              setpatientdetails((prevState) => ({
                patientdetails: {
                  ...prevState.patientdetails,
                  altmobile: e.target.value,
                },
              }));
              setValue(e.target.value);
            } else if (e.target.value > 0) {
              setpatientdetails((prevState) => ({
                patientdetails: {
                  ...prevState.patientdetails,
                  altmobile: e.target.value,
                },
              }));
              setValue(e.target.value);
            }
          }
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const Landline = ({ triggerreset, setpatientdetails }) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue("");
  }, [triggerreset]);
  return (
    <div className="fieldRow">
      <span className="patHeading">Landline</span>
      {/* <span className="star">*</span> */}
      <span className="star"></span>
      <input
        // required
        type="number"
        value={value}
        maxLength={10}
        className="RecInp"
        placeholder="Landline"
        onChange={(e) => {
          if (e.target.value < 9999999999 && e.target.value >= 0) {
            if (e.target.value.length == 0) {
              setpatientdetails((prevState) => ({
                patientdetails: {
                  ...prevState.patientdetails,
                  landline: e.target.value,
                },
              }));
              setValue(e.target.value);
            } else if (e.target.value > 0) {
              setpatientdetails((prevState) => ({
                patientdetails: {
                  ...prevState.patientdetails,
                  landline: e.target.value,
                },
              }));
              setValue(e.target.value);
            }
          }
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const Amount = ({ triggerreset, setpatientdetails, externalvalue }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(0);
  }, [triggerreset]);

  useEffect(() => {
    // // console.log("received external value = ", externalvalue);
    setpatientdetails((prevState) => ({
      patientdetails: {
        ...prevState.patientdetails,
        charges: externalvalue,
      },
    }));
    setValue(externalvalue);
  }, [externalvalue]);

  return (
    <div className="fieldRow">
      <span className="patHeading">Amount Payable</span>
      <span className="star">*</span>
      {/* <label className="RecInp amountPayable">{externalvalue}</label> */}
      <input
        required
        type="text"
        value={variables.moneyprefix.concat(value)}
        className="RecInp"
        placeholder="Amount Payable"
        disabled
        readOnly
        // onChange={(e) => {
        //   setpatientdetails((prevState) => ({
        //     patientdetails: {
        //       ...prevState.patientdetails,
        //       visitingcharges: e.target.value,
        //     },
        //   }));
        //   setValue(e.target.value);
        // }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};
export const ManualAmount = ({ triggerreset, setpatientdetails }) => {
  const [value, setValue] = useState();

  useEffect(() => {
    console.log("reset triggered");
    setValue("");
  }, [triggerreset]);

  return (
    <div className="fieldRow">
      <span className="patHeading">Amount Payable</span>
      <span className="star">*</span>
      {/* <label className="RecInp amountPayable">{externalvalue}</label> */}
      <input
        required
        type="number"
        title="Enter Amount"
        value={value}
        className="RecInp"
        placeholder="Amount Payable"
        min="0.01"
        step="0.01"
        onChange={(e) => {
          if (!isNaN(e.target.value)) {
            setpatientdetails((prevState) => ({
              patientdetails: {
                ...prevState.patientdetails,
                charges: e.target.value,
              },
            }));
            setValue(e.target.value);
          }
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const PaymentType = ({
  triggerreset,
  setpatientdetails,
  externalvalue,
}) => {
  const [value, setValue] = useState("");
  useEffect(() => {
    setValue("");
  }, [triggerreset]);

  useEffect(() => {
    // // console.log("external value changed", externalvalue);
    if (_.isUndefined(externalvalue)) {
      setValue("");
    } else {
      setValue(externalvalue);
    }
  }, [externalvalue]);

  return (
    <div className="fieldRow">
      <span className="patHeading">Payment Type</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Payment Type"
        type="text"
        className="RecInp"
        value={value}
        maxLength={50}
        placeholder="Payment Type"
        onChange={(e) => {
          setpatientdetails((prevState) => ({
            patientdetails: {
              ...prevState.patientdetails,
              transactionid: e.target.value,
            },
          }));
          setValue(e.target.value);
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const PatientID = ({
  triggerreset,
  setpatientdetails,
  patientid,
  setpatientid,
  searchPatient,
  needsearch,
  BsSearch,
}) => {
  const [value, setValue] = useState("");
  const [updateStore, setupdateStore] = useState(true); // this variable will be used to stop store from getting updated on each keystore.
  useEffect(() => {
    // // console.log("reset form triggered for patient id");
    setValue("");
    patientid = "";
  }, [triggerreset]);

  // if (!_.isEmpty(patientid) && !_.isUndefined(patientid)) setValue(patientid);

  return (
    <div className="fieldRow">
      <span className="patHeading">Patient ID</span>
      <span className="star">*</span>
      <input
        type="number"
        required
        title="Enter Patient ID"
        className="RecInp"
        value={value == "" ? patientid : value}
        placeholder="Patient ID"
        onChange={(e) => {
          // console.log(value, " ", patientid);
          if (updateStore) {
            setupdateStore(false);
            setpatientid("");
          }

          if (e.target.value.length <= 10 && e.target.value >= 0) {
            setpatientid(e.target.value);
            setpatientdetails((prevState) => ({
              patientdetails: {
                ...prevState.patientdetails,
                patientid: e.target.value,
              },
            }));
            // setpatientid(e.target.value);
            setValue(e.target.value);
          }
        }}
        onFocus={(e) => {
          if (e.target.value.length <= 10 && e.target.value >= 0) {
            setpatientdetails((prevState) => ({
              patientdetails: {
                ...prevState.patientdetails,
                patientid: e.target.value,
              },
            }));
            // setpatientid(e.target.value);
            setValue(e.target.value);
          }
        }}
        autoFocus
      />{" "}
      {needsearch ? (
        <span
          className="refreshicon iconstyle "
          onClick={(e) => {
            searchPatient();
            // console.log("search triggered");
          }}
        >
          <div className="searchstyle">
            <BsSearch />
          </div>
        </span>
      ) : (
        <span className="refreshicon iconstyle "></span>
      )}
    </div>
  );
};
export const SearchInPatientID = ({
  triggerreset,
  setpatientdetails,
  patientid,
  setpatientid,
  searchPatient,
  needsearch,
  BsSearch,
}) => {
  const [value, setValue] = useState("");
  const [updateStore, setupdateStore] = useState(true); // this variable will be used to stop store from getting updated on each keystore.
  useEffect(() => {
    // // console.log("reset form triggered for patient id");
    setValue("");
    patientid = "";
  }, [triggerreset]);

  // if (!_.isEmpty(patientid) && !_.isUndefined(patientid)) setValue(patientid);
  // // console.log('Fields setpatientdetails: ',setpatientdetails)
  return (
    <div className="fieldRow">
      <span className="patHeading">IPR No</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Patient ID"
        type="number"
        className="RecInp"
        value={value == "" ? patientid : value}
        placeholder="Patient ID"
        onChange={(e) => {
          if (updateStore) {
            setupdateStore(false);
            setpatientid("");
          }
          if (e.target.value.length <= 10 && e.target.value >= 0) {
            setpatientid(e.target.value);
            setpatientdetails((prevState) => ({
              patientdetails: {
                ...prevState.patientdetails,
                patientid: e.target.value,
              },
            }));
            // setpatientid(e.target.value);
            setValue(e.target.value);
          }
        }}
        onFocus={(e) => {
          // console.log(e.target.value);
          if (e.target.value.length <= 10 && e.target.value >= 0) {
            setpatientdetails((prevState) => ({
              patientdetails: {
                ...prevState.patientdetails,
                patientid: e.target.value,
              },
            }));
            // setpatientid(e.target.value);
            setValue(e.target.value);
          }
        }}
        autoFocus
      />{" "}
      {needsearch ? (
        <span
          className="refreshicon iconstyle "
          onClick={(e) => {
            searchPatient();
            // console.log("search triggered");
          }}
        >
          <div className="searchstyle">
            <BsSearch />
          </div>
        </span>
      ) : (
        <span className="refreshicon iconstyle "></span>
      )}
    </div>
  );
};

export const RelativeName = () => {
  const setippatientrelativename = useIPDetailsStore(
    (state) => state.setippatientrelativename
  );
  const relativename = useIPDetailsStore(
    (state) => state.ippatientdetails.relativename
  );

  return (
    <div className="fieldRow">
      <span className="patHeading">Relative Name</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Relative Name"
        type="text"
        className="RecInp"
        placeholder="Relative Name"
        maxLength={32}
        value={relativename}
        onChange={(e) => {
          setippatientrelativename(e.target.value);
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const RelativeRelation = () => {
  const setippatientrelativerelation = useIPDetailsStore(
    (state) => state.setippatientrelativerelation
  );
  const relativerelation = useIPDetailsStore(
    (state) => state.ippatientdetails.relativerelation
  );
  return (
    <div className="fieldRow">
      <span className="patHeading">Relative Relation</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Relation"
        type="text"
        className="RecInp"
        placeholder="Relative Relation"
        maxLength={10}
        value={relativerelation}
        onChange={(e) => {
          setippatientrelativerelation(e.target.value);
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const RelativePhoneNumber = () => {
  const setippatientrelativephonenumber = useIPDetailsStore(
    (state) => state.setippatientrelativephonenumber
  );
  const relativephonenumber = useIPDetailsStore(
    (state) => state.ippatientdetails.relativephonenumber
  );
  return (
    <div className="fieldRow">
      <span className="patHeading">Relative Phone Number</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Relative Ph No"
        type="number"
        className="RecInp"
        placeholder="Relative Phone Number"
        maxLength={10}
        value={relativephonenumber}
        onChange={(e) => {
          if (e.target.value.length <= 10 && e.target.value >= 0) {
            if (e.target.value.length == 0) {
              setippatientrelativephonenumber(e.target.value);
            } else if (e.target.value > 0) {
              setippatientrelativephonenumber(e.target.value);
            }
          }
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const Address = () => {
  const setippatientaddress = useIPDetailsStore(
    (state) => state.setippatientaddress
  );
  const address = useIPDetailsStore((state) => state.ippatientdetails.address);
  return (
    <div className="fieldRow">
      <span className="patHeading">Address</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Patient Address"
        type="text"
        className="RecInp"
        placeholder="Address"
        maxLength={100}
        value={address}
        onChange={(e) => {
          setippatientaddress(e.target.value);
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const FloorNumber = () => {
  const setippatientfloornumber = useIPDetailsStore(
    (state) => state.setippatientfloornumber
  );
  const floornumber = useIPDetailsStore(
    (state) => state.ippatientdetails.floornumber
  );
  return (
    <div className="fieldRow">
      <span className="patHeading">Floor Number</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Floor No"
        type="number"
        className="RecInp"
        placeholder="Floor Number"
        maxLength={3}
        value={floornumber}
        onChange={(e) => {
          if (e.target.value < 999 && e.target.value >= 0) {
            if (e.target.value.length == 0) {
              setippatientfloornumber(e.target.value);
            } else if (e.target.value > 0) {
              setippatientfloornumber(e.target.value);
            }
          }
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const RoomNumber = () => {
  const setippatientroomno = useIPDetailsStore(
    (state) => state.setippatientroomno
  );
  const roomno = useIPDetailsStore((state) => state.ippatientdetails.roomno);
  return (
    <div className="fieldRow">
      <span className="patHeading">Room Number</span>
      <span className="star">*</span>
      <input
        required
        type="number"
        title="Enter Room No"
        className="RecInp"
        placeholder="Room Number"
        maxLength={3}
        value={roomno}
        onChange={(e) => {
          if (e.target.value < 999 && e.target.value >= 0) {
            if (e.target.value.length == 0) {
              setippatientroomno(e.target.value);
            } else if (e.target.value > 0) {
              setippatientroomno(e.target.value);
            }
          }
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

export const InPatientID = ({ searchPatient, needsearch, BsSearch }) => {
  const setippatientid = useIPDetailsStore((state) => state.setippatientid);
  const ippatientid = useIPDetailsStore(
    (state) => state.ippatientdetails.patientid
  );
  const patientID = usePatientIDStore((state) => state.patientID);

  useEffect(() => {
    // console.log("Inpatientid useeffect triggered. PatientID: ", patientID);
    if (!_.isEmpty(patientID)) {
      setippatientid(patientID);
    }
  }, []);

  return (
    <div className="fieldRow">
      <span className="patHeading">Patient ID</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Patient ID"
        type="number"
        className="RecInp"
        placeholder="Patient ID"
        maxLength={10}
        value={ippatientid}
        onChange={(e) => {
          if (e.target.value.length <= 10 && e.target.value >= 0) {
            setippatientid(e.target.value);
          }
        }}
      />
      {needsearch ? (
        <span
          className="refreshicon iconstyle "
          onClick={(e) => {
            searchPatient();
            // console.log("search triggered");
          }}
        >
          <div className="searchstyle">
            <BsSearch />
          </div>
        </span>
      ) : (
        <span className="refreshicon iconstyle "></span>
      )}
    </div>
  );
};
export const BedNumber = () => {
  const setippatientbedno = useIPDetailsStore(
    (state) => state.setippatientbedno
  );
  const bedno = useIPDetailsStore((state) => state.ippatientdetails.bedno);
  return (
    <div className="fieldRow">
      <span className="patHeading">Bed Number</span>
      <span className="star">*</span>
      <input
        required
        title="Enter Bed No"
        type="number"
        className="RecInp"
        placeholder="Bed Number"
        maxLength={3}
        value={bedno}
        onChange={(e) => {
          if (e.target.value < 999 && e.target.value >= 0) {
            if (e.target.value.length == 0) {
              setippatientbedno(e.target.value);
            } else if (e.target.value > 0) {
              setippatientbedno(e.target.value);
            }
          }
        }}
      />
      <span className="refreshicon"></span>
    </div>
  );
};

// export const PatientName = ({
//   triggerreset,
//   setpatientdetails,
//   disabled,
//   externalvalue,
// }) => {
//   const [value, setValue] = useState("");

//   useEffect(() => {
//     setValue("");
//   }, [triggerreset]);
//   useEffect(() => {
//     if (_.isEmpty(externalvalue.trim())) setValue(externalvalue);
//   }, [externalvalue]);

//   return (
//     <div className="fieldRow">
//       <span className="patHeading">Name</span>
//       <span className="star">*</span>
//       <input
//         required
//         type="text"
//         className="RecInp"
//         placeholder="Name"
//         maxLength={32}
//         value={value}
//         disabled={disabled}
//         onChange={(e) => {
//           setpatientdetails((prevState) => ({
//             patientdetails: {
//               ...prevState.patientdetails,
//               namevalue: e.target.value,
//             },
//           }));
//           setValue(e.target.value);
//         }}
//       />
//       <span className="refreshicon"></span>
//     </div>
//   );
// };
