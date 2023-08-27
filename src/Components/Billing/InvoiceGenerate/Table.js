import React from "react";

export default function Table({
  list,
  totalmrp,
  additionalhospitalcharges,
  discount,
  gstvalue,
  transactionid,
  payable,
}) {
  return (
    <>
      <table
        width="100%"
        className=" border-t-[1px] border-b-[1px] border-black"
      >
        <thead className="border-b-[1px] border-black">
          <tr className=" p-1">
            <td className="font-bold">Sl No</td>
            <td className="font-bold">Service Name</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            {/* <td className="font-bold">Discount</td> */}
            <td className="font-bold">Total</td>
          </tr>
        </thead>
        {list.map(({ serviceName, Qty, TotalMrp, Discount, Payable }, id) => (
          <React.Fragment key={id + 1}>
            <tbody>
              <tr className="h-10">
                <td className="text-base">{id + 1}</td>
                <td className="text-base">{serviceName.toUpperCase()}</td>
                <td className="text-base">{Qty}</td>
                <td className="text-base">{TotalMrp}</td>
                {/* <td>{Discount}</td> */}
                <td className="text-base">{Payable}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>
      {/* <hr width="100%" className="border-[px] border-black"></hr> */}
    </>
  );
}
