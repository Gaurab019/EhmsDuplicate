import {
  enterPatientDetails,
  enterVisitingDetails,
  createOPLabbillDetails,
  createIPbillDetails,
  enterIPVisitingDetails,
} from "../apis/userverification";
import { v4 } from "uuid";
// import {
//   patientDetailsTemplate,
//   visitingdetailstemplate,
// } from "../models/templatemodels";
import {
  RegistrationDataModel,
  DoctorChargesDataModel,
  InpatientDoctorModel,
} from "../models/Configure";

export const FillPatientData = async (formdata, token, username) => {
  // console.log(formdata);
  // console.log(token);
  let patientDetailsTemplatelocal = {
    name: "",
    age: "",
    sex: "",
    emailid: "",
    mobile: "",
    altmobile: "",
    landline: "",
    doctorid: 101,
    registrationcharges: "",
    transactionid: "",
    requestid: "",
    username: username,
    othercharges: [],
  };
  // Object.assign(patientDetailsTemplatelocal, patientDetailsTemplate);

  // // console.log(v4());
  patientDetailsTemplatelocal.requestid = v4();
  patientDetailsTemplatelocal.name = formdata.namevalue;
  patientDetailsTemplatelocal.age = formdata.age;
  patientDetailsTemplatelocal.sex = formdata.sex;
  patientDetailsTemplatelocal.emailid =
    "emailid" in formdata ? formdata.emailid : "";
  patientDetailsTemplatelocal.mobile = formdata.mobile;
  patientDetailsTemplatelocal.altmobile =
    "altmobile" in formdata ? formdata.altmobile : "";
  patientDetailsTemplatelocal.landline =
    "landline" in formdata ? formdata.landline : "";
  // patientDetailsTemplatelocal.consultingdoctor = formdata.consultingdoctor;
  patientDetailsTemplatelocal.registrationcharges = formdata.charges;
  patientDetailsTemplatelocal.transactionid = formdata.transactionid;

  // console.log("JSON data sent to backend: ", patientDetailsTemplatelocal);
  //Call API
  let createpatientoutput = await enterPatientDetails(
    process.env.REACT_APP_CreatePatient,
    token,
    patientDetailsTemplatelocal
  );
  return createpatientoutput;
};

export const FillInPatientData = async (formdata, token, username) => {
  // console.log("Incomming form data: ", formdata);
  // // console.log(token);
  let InPatientDetailsTemplatelocal = {
    patientID: "",
    departmentid: "",
    username: username,
    relativename: "",
    relativerelation: "",
    relativephonenumber: "",
    patientstatusid: "1",
    governmentidtype: "",
    governmentidnumber: "",
    address: "",
    requestid: "",
    bedcategoryid: "",
    floorno: "",
    roomno: "",
    bedno: "",
    doctors: [
      {
        ...InpatientDoctorModel[0],
      },
    ],
    nurses: [],
  };
  // Object.assign(patientDetailsTemplatelocal, patientDetailsTemplate);

  // // console.log(v4());
  InPatientDetailsTemplatelocal.requestid = v4();
  InPatientDetailsTemplatelocal.patientID = formdata.patientid;
  InPatientDetailsTemplatelocal.departmentid = formdata.deptid;
  InPatientDetailsTemplatelocal.relativename = formdata.relativename;
  InPatientDetailsTemplatelocal.relativerelation = formdata.relativerelation;
  InPatientDetailsTemplatelocal.relativephonenumber =
    formdata.relativephonenumber;
  InPatientDetailsTemplatelocal.governmentidtype = formdata.govtid;
  InPatientDetailsTemplatelocal.governmentidnumber = formdata.govtidvalue;
  InPatientDetailsTemplatelocal.address = formdata.address;
  InPatientDetailsTemplatelocal.bedcategoryid = formdata.bedcategoryid;
  InPatientDetailsTemplatelocal.floorno = formdata.floornumber;
  InPatientDetailsTemplatelocal.roomno = formdata.roomno;
  InPatientDetailsTemplatelocal.bedno = formdata.bedno;
  InPatientDetailsTemplatelocal.doctors[0].doctorid = formdata.doctorid;
  InPatientDetailsTemplatelocal.doctors[0].doctorname = formdata.doctorname;

  // console.log("JSON data sent to backend: ", InPatientDetailsTemplatelocal);
  //Call API
  let createpatientoutput = await enterIPVisitingDetails(
    process.env.REACT_APP_CreateIPVisit,
    token,
    InPatientDetailsTemplatelocal
  );
  return createpatientoutput;
};

export const FillVisitingData = async (
  formdata,
  token,
  username,
  addregistrationflag
) => {
  // // console.log("addregistrationflag: ", addregistrationflag);
  let visitingdetailstemplatelocal = {
    patientid: "",
    consultingdoctor: "",
    visitingcharges: 0,
    transactionid: "",
    doctorid: "",
    username: username,
    requestid: "",
    manualEntry: false,
    doctorcharges: [{ ...DoctorChargesDataModel[0] }],
  };

  visitingdetailstemplatelocal.requestid = v4();
  visitingdetailstemplatelocal.patientid = formdata.patientid;
  visitingdetailstemplatelocal.consultingdoctor = formdata.consultingdoctor;
  visitingdetailstemplatelocal.visitingcharges = formdata.charges;
  visitingdetailstemplatelocal.transactionid = formdata.transactionid;
  visitingdetailstemplatelocal.doctorid = formdata.doctorid;
  visitingdetailstemplatelocal.manualEntry = formdata.manualEntry;
  visitingdetailstemplatelocal.doctorcharges[0].doctorid = formdata.doctorid;

  if (addregistrationflag) {
    // visitingdetailstemplatelocal.othercharges = othercharges;
    visitingdetailstemplatelocal.othercharges = RegistrationDataModel;
  }
  // console.log(visitingdetailstemplatelocal);

  //Call API
  let createvisitingoutput = await enterVisitingDetails(
    process.env.REACT_APP_CreateVisit,
    token,
    visitingdetailstemplatelocal
  );

  return createvisitingoutput;
};

export const FillOpBillingData = async (
  formdata,
  token,
  username,
  addregistrationflag
) => {
  // // console.log(formdata);

  let opBillingDatalocal = {
    patientid: "",
    doctorid: "",
    requestid: "",
    transactionid: "",
    username: username,
    labcharges: [],
  };
  opBillingDatalocal.requestid = v4();
  opBillingDatalocal.patientid = formdata.patientid;
  opBillingDatalocal.doctorid = formdata.docId;
  opBillingDatalocal.transactionid = formdata.transactionid;
  opBillingDatalocal.labcharges = formdata.labcharges;

  if (addregistrationflag) {
    // visitingdetailstemplatelocal.othercharges = othercharges;
    opBillingDatalocal.othercharges = RegistrationDataModel;
  }

  // console.log("opBillingDatalocal: ", opBillingDatalocal);

  //Call API
  let createvisitingoutput = await createOPLabbillDetails(
    process.env.REACT_APP_CreateOPLabbill,
    token,
    opBillingDatalocal
  );
  // console.log("FORMDATAcreatevisitingoutput-OP : ", createvisitingoutput);
  return createvisitingoutput;
};

export const FillIpBillingData = async (
  formdata,
  token,
  username,
  addregistrationflag
) => {
  // console.log("FillIpBillingData: ", formdata);
  let ipBillingDatalocal = {
    inpatientID: "",
    requestid: "",
    transactionid: "",
    doctorid: "",
    username: username,
    labcharges: [],
    bedcharges: [],
    othercharges: [],
    doctorcharges: [],
  };
  ipBillingDatalocal.requestid = v4();
  ipBillingDatalocal.inpatientID = formdata.patientid;
  ipBillingDatalocal.doctorid = formdata.docId;
  ipBillingDatalocal.transactionid = formdata.transactionid;
  ipBillingDatalocal.labcharges = formdata.labcharges;
  ipBillingDatalocal.bedcharges = formdata.bedcharges;
  ipBillingDatalocal.othercharges = formdata.othercharges;

  // console.log("IPBillingDatalocal: ", ipBillingDatalocal);
  if (addregistrationflag) {
    console.log("registration charges added");
    let registrationcharges = { ...RegistrationDataModel[0] };
    console.log(registrationcharges);
    ipBillingDatalocal.othercharges.push(registrationcharges);
  }

  //Call API
  let createvisitingoutput = await createIPbillDetails(
    process.env.REACT_APP_CreateIPbill,
    token,
    ipBillingDatalocal
  );
  // console.log("FORMDATAcreatevisitingoutput-IP : ", createvisitingoutput);
  return createvisitingoutput;
};
