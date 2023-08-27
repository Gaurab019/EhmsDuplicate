import hospitalLogo from "../Images/Asset_compressed_v2.png";

export const Con = {
  Reception: {
    parentPath: "/reception",
    SideBarInfo1: {
      // imgURL: "https://rudrajyotinathray.files.wordpress.com/2022/04/g.jpeg",
      imgURL: hospitalLogo,
      Title: "Reception",
    },
    SideBarInfo2: {
      newPatient: "Registration",
      search: "Search",
      // '': "Create Visit",
      // 'createvisit/OP': "Create Visit OP",
      // createinvoice: "Create Invoice",
    },
    newPatient: {
      InputFields: [
        ["Name", 1, "text"],
        ["Date", 1, "date"],
        ["Sex", 1, "text"],
        ["Mobile", 1, "text"],
        ["Alternate Mobile", 0, "text"],
        ["EmailId", 0, "email"],
      ],
    },
    Search: {
      InputFields: [["OR", 0, "label"]],
    },
    CreateVisitIP: {
      InputFields: [["Payment Type", 1, "text"]],
    },
    CreateVisitOP: {
      InputFields: [["Payment Type", 1, "text"]],
    },
    createInvoice: {
      InputFields: [
        ["Patient Name", 1, "text"],
        ["Patient Ph No", 1, "number"],
      ],
    },
    OutPatientBilling: {
      InputFields: [
        ["Patient Name", 1, "text"],
        ["Patient Ph No", 1, "number"],
      ],
    },
    InPatientBilling: {
      InputFields: [
        ["Patient Name", 1, "text"],
        ["Patient Ph No", 1, "number"],
      ],
    },
  },
  Lab: {
    parentPath: "/lab",
    SideBarInfo1: {
      imgURL: "https://rudrajyotinathray.files.wordpress.com/2022/04/g.jpeg",
      Title: "Laboratory",
    },
    SideBarInfo2: {
      catalogitems: "CREATE ITEM",
    },
    createInvoice: {
      InputFields: [
        ["Patient Name", 1, "text"],
        ["Patient Ph No", 1, "number"],
      ],
    },
    catalogItems: {
      InputFields: [
        ["Lab Item Name", 1, "text"],
        ["mrp", 1, "text"],
      ],
    },
  },
};
export const RegistrationDataModel = [
  {
    otherchargeitemid: "1",
    noofitmes: "1",
    categoryid: "1",
    cost: "",
    manualAmtEntry: false,
  },
];
export const OtherChargesDataModel = [
  {
    otherItem: "",
    serviceid: "",
    noOfItem: "",
    categoryid: "1",
    cost: "",
    manualAmtEntry: false,
  },
];
export const LabChargesDataModel = [
  {
    labItem: "",
    noOfItem: "",
    serviceid: "",
    cost: "",
    categoryid: "2",
  },
];
export const LabChargesDataModelIP = [
  {
    labItem: "",
    noOfItem: "",
    serviceid: "",
    cost: "",
    categoryid: "2",
  },
];
export const BedChargesDataModel = [
  {
    bedItem: "",
    noOfItem: "",
    serviceid: "",
    cost: "",
    categoryid: "4",
  },
];

export const DoctorChargesDataModel = [
  {
    doctorid: "",
    nooftimes: 1,
    categoryid: "3",
    amount: 0,
  },
];

export const CardDetails = {
  IPR: "IPR No",
  BedCategoryName: "Bed Type",
  PatientID: "Patient ID",
  Patient: "Patient",
  Sex: "Sex",
  Age: "Age",
  Mobile: "Mobile",
  DepartmentName: "Dept Name",
  RelativePhone: "Rel Phone",
  RelativeName: "Relative Name",
  RelativeRelation: "Relation",
  Doctor: "Doctor",
  Address: "Address",
  FloorNo: "Floor No",
  RoomNo: "Room No",
  BedNo: "Bed No",
};

export const InpatientDoctorModel = [
  {
    doctortypeid: 1,
    doctorid: "",
    categoryid: "3",
    doctorname: "",
  },
];

export const doctorIDGeneric = 105;
