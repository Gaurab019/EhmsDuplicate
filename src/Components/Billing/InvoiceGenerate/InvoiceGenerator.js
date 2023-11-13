import ClientDetails from "./ClientDetails";
import ClientDetailsIP from "./ClientDetailsIP";
import Dates from "./Dates";
import Footer from "./Footer";
import Header from "./Header";
import MainDetails from "./MainDetails";
// import Notes from "./Notes";
import Table from "./Table";
// import TableForm from "./TableForm";
import ReactToPrint from "react-to-print";
import { useState, useRef, useEffect } from "react";
import Notes from "./Notes";
import AdmissionData from "./AdmissionData";
import asset from "../../../Images/Asset_compressed_v2.png";
import hospitallogo from "../../../Images/hospital_logo_3.png";

export default function InvoiceGenerator({
  //Adding the variables required for the generation of the OP bill
  patientid,
  patientname,
  sex,
  doctorname,
  billername,
  age,
  phonenumber,
  totalmrp,
  additionalhospitalcharges,
  transactionid,
  gstvalue,
  payable,
  list,
  invoiceDate,
  invoiceNumber,
  admissionReceipt = false,
  IPR,
  relativename,
  relativerelation,
  relativephone,
  Address,
  admissionDate,
  floorno,
  bedno,
  roomno,
  bedcategorytype,
  departmentname,
  //Adding the variables required for the generation of the OP bill
}) {
  // console.log("IPRNo: ", IPR);
  const componentRef = useRef();
  // const [gobackInvoice,setGobackInvoice] = useState(false)
  const handlePrint = () => {
    window.print();
  };
  return (
    <>
      <div className="invoice__preview bg-white p-10 rounded">
        <ReactToPrint
          trigger={() => (
            <button
              type="button"
              className="bg-blue-500 ml-5  hover:text-blue-500 font-bold py-2 px-8 rounded shadow border-2 border-blue-500 printbutton transition-all duration-300"
            >
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
        <div ref={componentRef} className="p-5 font-sans">
          <Header
            handlePrint={handlePrint}
            address={"Near Menaka Theatre, Raichur Road, Mahabubnagar (TS)"}
            hospitalphno={"94402 33361"}
            hospitallogo={hospitallogo}
            asset={asset}
          />
          <MainDetails admissionReceipt={admissionReceipt} IPR={IPR} />
          {admissionReceipt ? (
            <>
              <AdmissionData
                IPR={IPR}
                patientid={patientid}
                patientname={patientname}
                sex={sex}
                age={age}
                Address={Address}
                admissionDate={admissionDate}
                relativename={relativename}
                relativephone={relativephone}
                relativerelation={relativerelation}
                doctorname={doctorname}
                floorno={floorno}
                bedno={bedno}
                roomno={roomno}
                bedcategorytype={bedcategorytype}
                departmentname={departmentname}
              />
              <Footer billername={billername} />
            </>
          ) : (
            <>
              {!IPR ? (
                <ClientDetails
                  invoiceNumber={invoiceNumber}
                  invoiceDate={invoiceDate}
                  patientid={patientid}
                  patientname={patientname}
                  sex={sex}
                  age={age}
                  doctorname={doctorname}
                  phone={phonenumber}
                />
              ) : (
                <ClientDetailsIP
                  invoiceNumber={invoiceNumber}
                  invoiceDate={invoiceDate}
                  IPR={IPR}
                  patientid={patientid}
                  patientname={patientname}
                  sex={sex}
                  age={age}
                  doctorname={doctorname}
                  relativephone={relativephone}
                  relativename={relativename}
                  relativerelation={relativerelation}
                />
              )}
              <Table list={list} />
              <Notes
                billername={billername}
                totalmrp={totalmrp}
                additionalhospitalcharges={additionalhospitalcharges}
                transactionid={transactionid}
                gstvalue={gstvalue}
                payable={payable}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}
