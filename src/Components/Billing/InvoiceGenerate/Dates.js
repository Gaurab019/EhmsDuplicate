export default function Dates({ invoiceNumber, invoiceDate, patientid }) {
  return (
    <>
      <section className="mt-2 mb-5 flex items-start justify-start">
        <ul>
          <li className="p-1 text-base  mb-1 flex-1">
            Bill No :{" "}
            <span className="font-semibold ml-5 text-lg"> {invoiceNumber}</span>
          </li>
          <li className="p-1 text-base  mb-1 flex-1">
            Bill Date :
            <span className="font-semibold ml-5 text-lg"> {invoiceDate} </span>
          </li>
          <li className="p-1 text-base  mb-1 flex-1">
            Patient ID :
            <span className="font-semibold ml-5 text-lg"> {patientid} </span>
          </li>
          <hr className="border-[2px] w-96"></hr>
        </ul>
      </section>
    </>
  );
}
