import { create } from "zustand";
import axios from "axios";

export const useTokenStore = create((set) => ({
  token: { token: "", message: "", statuscode: "", role: "" },
  setStatusCode: (newStatus) =>
    set((state) => ({ token: { ...state.token, statuscode: newStatus } })),
  setToken: (newToken) =>
    set((state) => ({ token: { ...state.token, token: newToken } })),
  fetchnewToken: async (serverURL, username, password) => {
    // console.log("Requesting New Token....");
    serverURL = process.env.REACT_APP_GetTokenURL;
    let queryObj = {
      username: username,
      password: password,
    };
    try {
      let output = await axios.post(serverURL, queryObj);
      // // console.log(output);
      let servertoken = output.data.token;

      set((state) => ({
        token: {
          token: servertoken,
          statuscode: output.status,
          role: output.data.usergroup[0].groupname,
        },
      }));
    } catch (error) {
      try {
        let httpcode = error.response.status;
        // console.log(error);
        set((state) => ({
          token: {
            token: "",
            statuscode: httpcode,
            message: error,
          },
        }));
      } catch (error) {
        set((state) => ({
          token: {
            token: "",
            statuscode: 500,
            message: error,
          },
        }));
      }
    }
  },
}));
export const useUsernameStore = create((set) => ({
  username: "",
  setusername: (username) => set(() => ({ username: username })),
}));
export const usePasswordStore = create((set) => ({
  password: "",
  setpassword: (password) => set(() => ({ password: password })),
}));

export const useDoctorStore = create((set) => ({
  doctors: { data: [], message: "", statuscode: "" },
  fetchalldoctors: async (serverURL, token) => {
    serverURL = process.env.REACT_APP_GetAllDoctors;
    const config = {
      headers: {
        tokendata: token,
      },
    };

    try {
      let output = await axios.get(serverURL, config);
      // console.log(output);
      let doctordata = output.data.data.data;
      set((state) => ({
        doctors: {
          ...state.doctors,
          data: doctordata,
          statuscode: output.status,
        },
      }));
    } catch (error) {
      try {
        let httpcode = error.response.status;
        // console.log(httpcode);
        set((state) => ({
          doctors: {
            ...state.doctors,

            statuscode: httpcode,
            message: error,
          },
        }));
      } catch (error) {
        set((state) => ({
          doctors: {
            ...state.doctors,

            statuscode: 500,
            message: error,
          },
        }));
      }
    }
  },
}));

export const useBillChargesStore = create((set) => ({
  //*********************************************************************
  //* collect all data in billCharges and send based on requirement !!!    *
  //*********************************************************************

  billCharges: { data: [], message: "", statuscode: "" },

  fetchBillChargesTable: async (serverURL, token) => {
    serverURL = process.env.REACT_APP_BillChargesTable;
    const config = {
      headers: {
        tokendata: token,
      },
    };
    try {
      let output = await axios.get(serverURL, config);

      // let doctordata1 = output.data.data.data;
      // console.log("useBillChargesTable0: ", output.data.data.data);
      set((state) => ({
        billCharges: {
          ...state.billCharges,
          data: output.data.data.data,
          statuscode: output.status,
        },
      }));
    } catch (error) {
      try {
        // let httpcode = error.response.status;
        set((state) => ({
          billCharges: {
            ...state.billCharges,

            statuscode: error.response.status,
            message: error,
          },
        }));
      } catch (error) {
        set((state) => ({
          billCharges: {
            ...state.billCharges,

            statuscode: 500,
            message: error,
          },
        }));
      }
    }
  },
}));
export const useInPatientCodeStore = create((set) => ({
  // inpatientstaffstatus: { data: [], message: "", statuscode: "" },
  // inpatientnursetype: { data: [], message: "", statuscode: "" },
  // inpatientdoctortype:{ data: [], message: "", statuscode: "" },
  // inpatientstatus:{ data: [], message: "", statuscode: "" },
  // departmentsvalues:{ data: [], message: "", statuscode: "" },
  // beddetails:{ data: [], message: "", statuscode: "" },
  //*********************************************************************
  //* collect all data in inpatientcodetables and send based on requirement !!!    *
  //*********************************************************************

  inpatientcodetables: { data: [], message: "", statuscode: "" },

  fetchInPatientCodeTable: async (serverURL, token) => {
    serverURL = process.env.REACT_APP_InPatientCodeTables;
    const config = {
      headers: {
        tokendata: token,
      },
    };
    try {
      let output = await axios.get(serverURL, config);

      // let doctordata1 = output.data.data.data;
      // console.log("useInPatientCodes: ", output.data.data);
      set((state) => ({
        inpatientcodetables: {
          ...state.inpatientcodetables,
          data: output.data.data,
          statuscode: output.status,
        },
      }));
    } catch (error) {
      try {
        // let httpcode = error.response.status;
        set((state) => ({
          inpatientcodetables: {
            ...state.inpatientcodetables,

            statuscode: error.response.status,
            message: error,
          },
        }));
      } catch (error) {
        set((state) => ({
          inpatientcodetables: {
            ...state.inpatientcodetables,

            statuscode: 500,
            message: error,
          },
        }));
      }
    }
  },
}));

export const usePatientIDStore = create((set) => ({
  patientID: "",
  setpatientID: (newpatientID) => {
    // // console.log("inside set patient id: ", newpatientID);
    set(() => ({ patientID: newpatientID }));
  },
}));
export const useInPatientIDStore = create((set) => ({
  inPatientID: "",
  setInpatientID: (newpatientID) => {
    // // console.log("inside set Inpatient id: ", newpatientID);
    set(() => ({ inPatientID: newpatientID }));
  },
}));

export const useIPDetailsStore = create((set) => ({
  ippatientdetails: {
    patientid: "",
    patientname: "",
    govttypedetails: [],
    govtidvalue: "",
    relativename: "",
    relativerelation: "",
    relativephonenumber: "",
    address: "",
    bedtypedetails: [],
    floornumber: "",
    bedno: "",
    roomno: "",
    deptdetails: [],
    consultingdoctor: [],
  },
  setippatientid: (newpatientID) => {
    set((state) => ({
      ippatientdetails: { ...state.ippatientdetails, patientid: newpatientID },
    }));
  },
  setippatientname: (newpatientname) => {
    set((state) => ({
      ippatientdetails: {
        ...state.ippatientdetails,
        patientname: newpatientname,
      },
    }));
  },
  setippatientgovtidtype: (govttypedetails) => {
    set((state) => ({
      ippatientdetails: {
        ...state.ippatientdetails,
        govttypedetails: govttypedetails,
      },
    }));
  },
  setippatientgovtidvalue: (docvalue) => {
    set((state) => ({
      ippatientdetails: { ...state.ippatientdetails, govtidvalue: docvalue },
    }));
  },
  setippatientrelativename: (relativename) => {
    set((state) => ({
      ippatientdetails: {
        ...state.ippatientdetails,
        relativename: relativename,
      },
    }));
  },
  setippatientrelativerelation: (relativerelation) => {
    set((state) => ({
      ippatientdetails: {
        ...state.ippatientdetails,
        relativerelation: relativerelation,
      },
    }));
  },
  setippatientrelativephonenumber: (relativephonenumber) => {
    set((state) => ({
      ippatientdetails: {
        ...state.ippatientdetails,
        relativephonenumber: relativephonenumber,
      },
    }));
  },
  setippatientaddress: (address) => {
    set((state) => ({
      ippatientdetails: { ...state.ippatientdetails, address: address },
    }));
  },
  setippatientbedtypeid: (bedtypedetails) => {
    set((state) => ({
      ippatientdetails: {
        ...state.ippatientdetails,
        bedtypedetails: bedtypedetails,
      },
    }));
  },
  setippatientfloornumber: (floornumber) => {
    set((state) => ({
      ippatientdetails: { ...state.ippatientdetails, floornumber: floornumber },
    }));
  },
  setippatientbedno: (bedno) => {
    set((state) => ({
      ippatientdetails: { ...state.ippatientdetails, bedno: bedno },
    }));
  },
  setippatientroomno: (roomno) => {
    set((state) => ({
      ippatientdetails: { ...state.ippatientdetails, roomno: roomno },
    }));
  },
  setippatientdeptid: (deptdetails) => {
    set((state) => ({
      ippatientdetails: { ...state.ippatientdetails, deptdetails: deptdetails },
    }));
  },
  setippatientconsultingdoctor: (consultingdoctor) => {
    set((state) => ({
      ippatientdetails: {
        ...state.ippatientdetails,
        consultingdoctor: consultingdoctor,
      },
    }));
  },

  resetippatientdetails: () => {
    set((state) => ({
      ippatientdetails: {
        ...state.ippatientdetails,
        patientid: "",
        patientname: "",
        govttypedetails: [],
        govtidvalue: "",
        relativename: "",
        relativerelation: "",
        relativephonenumber: "",
        address: "",
        bedtypedetails: [],
        floornumber: "",
        bedno: "",
        roomno: "",
        deptdetails: [],
        consultingdoctor: [],
      },
    }));
  },
}));
