var _ = require("lodash");

export const patientdetailsvalidation = (formdata) => {
  // validate name
  if (validate("namevalue", "namevalue", formdata)) return false;
  // validate age
  if (validate("age", "age", formdata)) return false;
  // validate sex
  if (validate("sex", "sex", formdata)) return false;
  // // validate emailid
  // if(validate("formdata.emailid", "emailid", formdata)) return false;
  // validate mobile
  if (validate("mobile", "mobile", formdata)) return false;
  // // validate altmobile
  // if(validate("formdata.altmobile", "altmobile", formdata)) return false;
  // // validate landline
  // if(validate("formdata.landline", "namevalue", formdata)) return false;
  // validate name
  // if (validate("consultingdoctor", "consultingdoctor", formdata)) return false;
  // validate name
  if (validate("charges", "charges", formdata)) return false;
  // validate name
  if (validate("transactionid", "transactionid", formdata)) return false;

  // console.log("All Validations clear ");
  return true;
};
export const inpatientdetailsvalidation = (formdata) => {
  // validate name
  if (validate("patientid", "patientid", formdata)) return false;
  // validate age
  if (validate("patientname", "patientname", formdata)) return false;
  // validate sex
  if (validate("govtidvalue", "govtidvalue", formdata)) return false;
  // validate relativename
  if (validate("relativename", "relativename", formdata)) return false;
  // validate relativerelation
  if (validate("relativerelation", "relativerelation", formdata)) return false;
  // validate relativerelation
  if (validate("relativephonenumber", "relativephonenumber", formdata))
    return false;
  // validate address
  if (validate("address", "address", formdata)) return false;
  // validate floornumber
  if (validate("floornumber", "floornumber", formdata)) return false;
  // validate bedno
  if (validate("bedno", "bedno", formdata)) return false;
  // validate roomno
  if (validate("roomno", "roomno", formdata)) return false;
  //validate govttypedetails
  if (formdata.govttypedetails.length <= 0) return false;
  // validate bedtypedetails
  if (formdata.bedtypedetails.length <= 0) return false;
  // validate deptdetails
  if (formdata.deptdetails.length <= 0) return false;
  // validate consultingdoctor
  if (formdata.consultingdoctor.length <= 0) return false;

  // console.log("All Validations clear ");
  return true;
};

const validate = (fieldpath, fieldname, formdata) => {
  if (fieldname in formdata) {
    // console.log(_.get(formdata, fieldpath, ""));
    if (!_.isNumber(_.get(formdata, fieldpath, ""))) {
      if (_.isEmpty(_.get(formdata, fieldpath, ""))) {
        // console.log("is empty ", fieldpath, fieldname);
        return true;
      }
    } else {
      if (_.get(formdata, fieldpath, "") <= 0) {
        // console.log("is empty ", fieldpath, fieldname);
        return true;
      }
    }
    return false;
  } else {
    // console.log("no field ", fieldpath, fieldname);

    return true;
  }
};

export const searchpatientvalidation = (patientid, phonenumber) => {
  if (_.isEmpty(patientid) || _.isUndefined(patientid)) {
    if (_.isEmpty(phonenumber)) {
      return false;
    }
  }
  return true;
};
export const searchInPatientValidation = (InPatientId) => {
  if (_.isEmpty(InPatientId)) {
    return false;
  }
  return true;
};

export const visitingdetailsvalidation = (formdata) => {
  // validate name
  if (validate("patientid", "patientid", formdata)) return false;
  // validate consultingdoctor
  if (validate("consultingdoctor", "consultingdoctor", formdata)) return false;
  // validate visitingcharges
  // if (validate("visitingcharges", "visitingcharges", formdata)) return false;

  // console.log("All Validations clear ");
  return true;
};

export const opBilldetailsvalidation = (formdata) => {
  console.log("opBilldetailsvalidation: ", formdata);
  // validate name
  if (validate("patientid", "patientid", formdata)) return false;
  // validate Doctor ID
  if (validate("docId", "docId", formdata)) return false;
  // validate labcharges
  if (validate("labcharges", "labcharges", formdata)) return false;
  // validate transactionid
  if (validate("transactionid", "transactionid", formdata)) return false;

  // console.log("All Validations clear ");
  return true;
};
export const ipBilldetailsvalidation = (formdata) => {
  // console.log("opBilldetailsvalidation: ", formdata);
  // validate name
  if (validate("patientid", "patientid", formdata)) return false;
  // validate Doctor ID
  if (validate("docId", "docId", formdata)) return false;
  // validate labcharges
  // if (validate("labcharges", "labcharges", formdata)) return false;
  // validate bedcharges
  // if (validate("bedcharges", "bedcharges", formdata)) return false;
  if (
    validate("bedcharges", "bedcharges", formdata) &&
    validate("labcharges", "labcharges", formdata) &&
    validate("othercharges", "othercharges", formdata)
  )
    return false;
  // validate transactionid
  if (validate("transactionid", "transactionid", formdata)) return false;

  // console.log("All Validations clear ");
  return true;
};
