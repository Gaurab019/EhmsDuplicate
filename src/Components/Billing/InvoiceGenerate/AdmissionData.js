export default function AdmissionData({
  IPR,
  patientid,
  patientname,
  sex,
  age,
  Address,
  admissionDate,
  relativename,
  relativerelation,
  relativephone,
  doctorname,
  floorno,
  bedno,
  roomno,
  bedcategorytype,
  departmentname,
}) {
  // // console.log(
  //   "I am IP BILL ClientDetailsIP",
  //   invoiceNumber,
  //   invoiceDate,
  //   IPR,
  //   patientid,
  //   patientname,
  //   relativename,
  //   relativerelation,
  //   relativephone,
  //   sex,
  //   age,
  //   doctorname
  // );
  return (
    <>
      <section
        className="mt-5 mb-5 grid grid-cols-2 justify-between items-start [word-spacing:3px] pl-5 pr-5 pb-5 border-solid border-b-[2px]"
        width="100%"
      >
        <div className="flex flex-col justify-evenly items-start gap-3 [flex: 30]">
          <p className="text-sm  mb-1 [flex: 30]">
            IPR No :{" "}
            <span className="text-base ml-2 font-semibold"> {IPR}</span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            PatientID :{" "}
            <span className=" text-base ml-2 font-semibold">{patientid}</span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Patient :{" "}
            <span className=" text-base ml-2 font-semibold">{patientname}</span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Age/Sex :{" "}
            <span className=" text-base ml-2 font-semibold">
              {age}/{sex}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Relative Name :{" "}
            <span className=" text-base ml-2 font-semibold">
              {relativename}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Relation :{" "}
            <span className=" text-base ml-2 font-semibold">
              {relativerelation}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Relative Phone :{" "}
            <span className=" text-base ml-2 font-semibold">
              {relativephone}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Address :{" "}
            <span className=" text-base ml-2 font-semibold">{Address}</span>
          </p>
        </div>
        <div className="flex flex-col justify-evenly items-start gap-3 [flex: 30]">
          <p className="text-sm  mb-1 [flex: 30]">
            Admission Date :{" "}
            <span className="text-base ml-2 font-semibold">
              {" "}
              {admissionDate}{" "}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Department :{" "}
            <span className="text-base ml-2 font-semibold">
              {" "}
              {departmentname}{" "}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Ref. By :{" "}
            <span className=" text-base ml-2 font-semibold uppercase">
              {doctorname}
            </span>
          </p>

          <p className="text-sm  mb-1 [flex: 30]">
            Bed Cateogry :{" "}
            <span className=" text-base ml-2 font-semibold">
              {bedcategorytype}
            </span>
          </p>
          <p className=" text-sm  mb-1 [flex: 30]">
            Floor No :{" "}
            <span className="text-base ml-2 font-semibold"> {floorno} </span>
          </p>
          <p className=" text-sm  mb-1 [flex: 30]">
            Room No :{" "}
            <span className="text-base ml-2 font-semibold"> {roomno} </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Bed No :{" "}
            <span className=" text-base ml-2 font-semibold">{bedno}</span>
          </p>
        </div>
        {/* <div className="flex flex-col justify-evenly items-start gap-3 [flex: 30]"></div> */}
        {/* <div className="flex justify-evenly items-center gap-10">
            <p className="text-sm  mb-1 [flex: 30]">
              Address: <span>{address}</span>
            </p>
          </div> */}
      </section>
    </>
  );
}
