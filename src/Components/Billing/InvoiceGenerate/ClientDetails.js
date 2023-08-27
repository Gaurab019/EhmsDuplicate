export default function ClientDetails({
  invoiceNumber,
  invoiceDate,
  patientid,
  patientname,
  sex,
  age,
  phone,
  doctorname,
}) {
  // // console.log('I am OP BILL CpentDetails',invoiceNumber,
  // invoiceDate,
  // patientid,
  // patientname,
  // sex,
  // age,
  // phone,
  // doctorname,)
  return (
    <>
      <section
        className="mt-5 mb-5 flex justify-evenly items-start [word-spacing:3px]"
        width="100%"
      >
        <div className="flex flex-col justify-evenly items-start gap-3">
          <p className="text-sm  mb-1 [flex: 30]">
            Bill No :{" "}
            <span className="text-base ml-2 font-semibold">
              {" "}
              {invoiceNumber}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Patient:{" "}
            <span className=" text-base ml-2 font-semibold">{patientname}</span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Mobile:{" "}
            <span className=" text-base ml-2 font-semibold">{phone}</span>
          </p>
        </div>
        <div className="flex flex-col justify-evenly items-start gap-3">
          <p className="text-sm  mb-1 [flex: 30]">
            Bill Date :{" "}
            <span className="text-base ml-2 font-semibold">
              {" "}
              {invoiceDate}{" "}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Sex: <span className=" text-base ml-2 font-semibold">{sex}</span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Consult. Doctor:{" "}
            <span className=" text-base ml-2 font-semibold uppercase">
              {doctorname}
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-evenly items-start gap-3">
          <p className="p-1 text-sm  mb-1 [flex: 30]">
            MRN :{" "}
            <span className="text-base ml-2 font-semibold"> {patientid} </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Age: <span className=" text-base ml-2 font-semibold">{age}</span>
          </p>
        </div>
        <div className="flex justify-evenly items-center gap-10">
          {/* <p className="text-sm  mb-1 [flex: 30]">
            Address: <span>{address}</span>
          </p> */}
        </div>
      </section>
    </>
  );
}
