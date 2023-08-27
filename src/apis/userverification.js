import axios from "axios";

// export const getJWTtoken = async (serverURL, username, password) => {
//   let queryObj = {
//     username: username,
//     password: password,
//   };
//   let output = await axios.post(serverURL, queryObj);
//   // console.log(output);
//   return output;
// };

export const enterPatientDetails = async (serverURL, token, patientdetails) => {
  let data = {
    message: "",
    statuscode: "",
    outdata: {},
  };
  serverURL = process.env.REACT_APP_CreatePatient;
  const config = {
    headers: {
      tokendata: token,
    },
  };
  try {
    let output = await axios.post(serverURL, patientdetails, config);
    // // console.log(output);
    data.outdata = output.data;
    data.statuscode = output.status;
  } catch (error) {
    data.message = error;
    try {
      data.statuscode = error.response.status;
    } catch (error) {
      data.statuscode = 500;
    }
  }
  return data;
};
export const enterVisitingDetails = async (
  serverURL,
  token,
  visitingdetails
) => {
  let data = {
    message: "",
    statuscode: "",
    outdata: {},
  };
  serverURL = process.env.REACT_APP_CreateVisit;
  const config = {
    headers: {
      tokendata: token,
    },
  };
  try {
    let output = await axios.post(serverURL, visitingdetails, config);
    // console.log(output);
    data.outdata = output.data;
    data.statuscode = output.status;
  } catch (error) {
    // console.log(error);
    data.message = error;
    try {
      data.statuscode = error.response.status;
    } catch (error) {
      data.statuscode = 500;
    }
  }
  return data;
};
export const enterIPVisitingDetails = async (
  serverURL,
  token,
  ipvisitingdetails
) => {
  let data = {
    message: "",
    statuscode: "",
    outdata: {},
  };
  serverURL = process.env.REACT_APP_CreateIPVisit;
  const config = {
    headers: {
      tokendata: token,
    },
  };
  try {
    let output = await axios.post(serverURL, ipvisitingdetails, config);
    // console.log(output);
    data.outdata = output.data;
    data.statuscode = output.status;
  } catch (error) {
    // console.log(error);
    data.message = error;
    try {
      data.statuscode = error.response.status;
    } catch (error) {
      data.statuscode = 500;
    }
  }
  return data;
};
export const createOPLabbillDetails = async (
  serverURL,
  token,
  visitingdetails
) => {
  let data = {
    message: "",
    statuscode: "",
    outdata: {},
  };
  serverURL = process.env.REACT_APP_CreateOPLabbill;
  const config = {
    headers: {
      tokendata: token,
    },
  };
  try {
    let output = await axios.post(serverURL, visitingdetails, config);
    // console.log("createOPLabbillDetails: ", output);
    data.outdata = output.data;
    data.statuscode = output.status;
  } catch (error) {
    // console.log("createOPLabbillDetailsE", error);
    data.message = error;
    try {
      data.statuscode = error.response.status;
    } catch (error) {
      data.statuscode = 500;
    }
  }
  return data;
};
export const createIPbillDetails = async (
  serverURL,
  token,
  visitingdetails
) => {
  let data = {
    message: "",
    statuscode: "",
    outdata: {},
  };
  serverURL = process.env.REACT_APP_CreateIPbill;
  const config = {
    headers: {
      tokendata: token,
    },
  };
  try {
    let output = await axios.post(serverURL, visitingdetails, config);
    // console.log("createIPbillDetails: ", output);
    data.outdata = output.data;
    data.statuscode = output.status;
  } catch (error) {
    // console.log("createIPbillDetailsE", error);
    data.message = error;
    try {
      data.statuscode = error.response.status;
    } catch (error) {
      data.statuscode = 500;
    }
  }
  return data;
};
export const searchPatientDetails = async (
  serverURL,
  patientid,
  phonenumber,
  token
) => {
  serverURL = process.env.REACT_APP_SearchPatient;
  // console.log("patientid", patientid);
  // console.log("phonenumber", phonenumber);
  serverURL = serverURL
    .replaceAll("[patientid]", patientid)
    .replaceAll("[phone]", phonenumber);
  const config = {
    headers: {
      tokendata: token,
    },
  };
  let data = {
    message: "",
    statuscode: "",
    outdata: {},
  };

  try {
    let output = await axios.get(serverURL, config);
    // console.log(output);
    data.outdata = output.data;
    data.statuscode = output.status;
  } catch (error) {
    data.message = error;
    try {
      data.statuscode = error.response.status;
    } catch (error) {
      data.statuscode = 500;
    }
  }
  return data;
};

export const searchInPatientDetails = async (
  serverURL,
  InPatientid,
  // phonenumber,
  token
) => {
  serverURL = process.env.REACT_APP_SearchInPatientID;
  // console.log("InPatientid", InPatientid);
  // // console.log("phonenumber", phonenumber);
  serverURL = serverURL.replaceAll("[InPatientid]", InPatientid);
  // .replaceAll("[phone]", phonenumber);
  const config = {
    headers: {
      tokendata: token,
    },
  };
  let data = {
    message: "",
    statuscode: "",
    outdata: {},
  };

  try {
    let output = await axios.get(serverURL, config);
    // console.log(output);
    data.outdata = output.data;
    data.statuscode = output.status;
  } catch (error) {
    data.message = error;
    try {
      data.statuscode = error.response.status;
    } catch (error) {
      data.statuscode = 500;
    }
  }
  return data;
};
