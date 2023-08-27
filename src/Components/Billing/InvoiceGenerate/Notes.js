export default function Notes({
  notes,
  transactionid,
  totalmrp,
  billername,
  payable,
}) {
  return (
    <>
      <section className="">
        <div className="flex justify-between border-b-[1px] border-black ">
          <div className="mr-10 ">
            <h2 className="flex pt-5 items-end justify-end text-gray-800 text-sm [word-spacing:5px]">
              {"Billed By: "}{" "}
              <p className="text-sm font-bold ml-1">
                {" "}
                {billername.toUpperCase()}
              </p>
            </h2>
          </div>
          <div className="pb-1 pt-1 grid grid-cols-2 content-center text-center gap-2 border-l-[1px] border-black pl-2 items-end">
            <h2 className="flex items-end justify-end text-gray-800 text-sm [word-spacing:5px] ">
              Gross Value :
            </h2>
            <p className="text-sm font-bold">{totalmrp}</p>
            {/* <h2 className="flex items-end justify-end text-gray-800 text-base font-bold  [word-spacing:5px]">
            Hospital Charges : {additionalhospitalcharges}
          </h2> */}
            {/* <h2 className="flex items-end justify-end text-gray-800 text-base font-bold  [word-spacing:5px]">
            Discount : {discount}
          </h2> */}
            {/* <h2 className="flex items-end justify-end text-gray-800 text-base font-bold">
            Gst : {gstvalue}
          </h2> */}
            <h2 className="flex items-end justify-end text-gray-800 text-sm   [word-spacing:5px]">
              Bill Total :
            </h2>
            <p className="text-sm font-bold">{payable}</p>
          </div>
        </div>
        <div>
          <h2 className="mb-5 pt-5  flex items-start justify-between text-gray-800 text-base font-bold [word-spacing:5px]">
            Payment Mode : {transactionid}
            <span className="font-bold">Authorised Signature</span>
          </h2>
        </div>
      </section>
    </>
  );
}
