export default function ClientDetailsIP({
  invoiceNumber,
  invoiceDate,
  IPR,
  patientid,
  patientname,
  relativename,
  relativerelation,
  relativephone,
  sex,
  age,
  doctorname,
}) {
  // // console.log('I am IP BILL ClientDetailsIP',invoiceNumber,
  // invoiceDate,
  // IPR,
  // patientid,
  // patientname,
  // relativename,
  // relativerelation,
  // relativephone,
  // sex,
  // age,
  // doctorname,)
  return (
    <>
      <section
        className="mt-5 mb-5 flex justify-between items-start [word-spacing:3px] pl-5 pr-5"
        width="100%"
      >
        <div className="flex flex-col justify-evenly items-start gap-3 [flex: 30]">
          <p className="text-sm  mb-1 [flex: 30]">
            Bill No :{" "}
            <span className="text-base ml-2 font-semibold">
              {" "}
              {invoiceNumber}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Patient :{" "}
            <span className=" text-base ml-2 font-semibold">{patientname}</span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Relative Name :{" "}
            <span className=" text-base ml-2 font-semibold">
              {relativename}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Ref. By :{" "}
            <span className=" text-base ml-2 font-semibold uppercase">
              {doctorname}
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-evenly items-start gap-3 [flex: 30]">
          <p className="text-sm  mb-1 [flex: 30]">
            Bill Date :{" "}
            <span className="text-base ml-2 font-semibold">
              {" "}
              {invoiceDate}{" "}
            </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            Age/Sex :{" "}
            <span className=" text-base ml-2 font-semibold">
              {age}/{sex}
            </span>
          </p>

          <p className="text-sm  mb-1 [flex: 30]">
            Relative Mobile :{" "}
            <span className=" text-base ml-2 font-semibold">
              {relativephone}
            </span>
          </p>
        </div>
        <div className="flex flex-col justify-evenly items-start gap-3 [flex: 30]">
          <p className=" text-sm  mb-1 [flex: 30]">
            IPR : <span className="text-base ml-2 font-semibold"> {IPR} </span>
          </p>
          <p className=" text-sm  mb-1 [flex: 30]">
            MRN :{" "}
            <span className="text-base ml-2 font-semibold"> {patientid} </span>
          </p>
          <p className="text-sm  mb-1 [flex: 30]">
            S/W/D/B/O :{" "}
            <span className=" text-base ml-2 font-semibold">
              {relativerelation}
            </span>
          </p>
        </div>
        {/* <div className="flex justify-evenly items-center gap-10">
            <p className="text-sm  mb-1 [flex: 30]">
              Address: <span>{address}</span>
            </p>
          </div> */}
      </section>
    </>
  );
}
