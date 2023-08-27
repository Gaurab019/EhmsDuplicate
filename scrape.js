// import ClientDetails from "./ClientDetails";
// import Dates from "./Dates";
// import Footer from "./Footer";
// import Header from "./Header";
// import MainDetails from "./MainDetails";
// import Notes from "./Notes";
// import Table from "./Table";
// import TableForm from "./TableForm";
// import ReactToPrint from "react-to-print";
// import { useState, useRef, useEffect } from "react";
// import InvoiceAdd from "./InvoiceAdd";

// export default function InvoiceGenerator({
//   name,
//   address,
//   clientName,
//   clientAddress,
//   invoiceDate,
//   dueDate,
//   description,
//   quantity,
//   price,
//   amount,
//   list,
//   setList,
//   total,
//   notes,
//   website,
//   phone,
//   bankAccount,
//   bankName,
//   email,
//   invoiceNumber,
//   setTotal,
//   setName,
//   setAddress,
//   setEmail,
//   setWebsite,
//   setPhone,
//   setBankName,
//   setBankAccount,
//   setClientName,
//   setClientAddress,
//   setInvoiceNumber,
//   setInvoiceDate,
//   setDueDate,
//   setDescription,
//   setQuantity,
//   setPrice,
//   setAmount,
//   setNotes,
// }) {
//   const componentRef = useRef();
//   // const [gobackInvoice,setGobackInvoice] = useState(false)
//   const handlePrint = () => {
//     window.print();
//   };
//   return (
//     <>
//       <div className="invoice__preview bg-white p-5 rounded">
//         <ReactToPrint
//           trigger={() => (
//             <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
//               Print / Download
//             </button>
//           )}
//           content={() => componentRef.current}
//         />
//         <div ref={componentRef} className="p-5">
//           <Header handlePrint={handlePrint} />
//           {/* <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
//             // onClick={() => setGobackInvoice(!gobackInvoice)}
//             >
//             go Back
//               </button> */}

//           {/* {  gobackInvoice && <InvoiceAdd
//           name={name}
//           address={address}
//           clientName={clientName}
//           clientAddress={clientAddress}
//           invoiceDate={invoiceDate}
//           dueDate={dueDate}
//           description={description}
//           quantity={quantity}
//           price={price}
//           amount={amount}
//           list={list}
//           setList={setList}
//           total={total}
//           notes={notes}
//           website={website}
//           phone={phone}
//           bankAccount={bankAccount}
//           bankName={bankName}
//           email={email}
//           setTotal={setTotal}
//           invoiceNumber={invoiceNumber}
//           setName={setName}
//           setAddress={setAddress}
//           setEmail={setEmail}
//           setWebsite={setWebsite}
//           setPhone={setPhone}
//           setBankName={setBankName}
//           setBankAccount={setBankAccount}
//           setClientName={setClientName}
//           setClientAddress={setClientAddress}
//           setInvoiceNumber={setInvoiceNumber}
//           setInvoiceDate={setInvoiceDate}
//           setDueDate={setDueDate}
//           setDescription={setDescription}
//           setQuantity={setQuantity}
//           setPrice={setPrice}
//           setAmount={setAmount}
//           setNotes={setNotes}
//           />} */}
//           <MainDetails name={name} address={address} />

//           <ClientDetails
//             clientName={clientName}
//             clientAddress={clientAddress}
//           />

//           <Dates
//             invoiceNumber={invoiceNumber}
//             invoiceDate={invoiceDate}
//             dueDate={dueDate}
//           />

//           <Table
//             description={description}
//             quantity={quantity}
//             price={price}
//             amount={amount}
//             list={list}
//             setList={setList}
//             total={total}
//             setTotal={setTotal}
//           />

//           <Notes notes={notes} />

//           <Footer
//             name={name}
//             address={address}
//             website={website}
//             email={email}
//             phone={phone}
//             bankAccount={bankAccount}
//             bankName={bankName}
//           />
//         </div>
//         {/* <button
//             onClick={() => setShowInvoice(false)}
//             className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
//           >
//             Edit Information
//           </button> */}
//       </div>
//     </>
//   );
// }

// "homepage": "https://Gaurab019.github.io/HospitalManagementSystem",
// "predeploy": "npm run build",
// "deploy": "gh-pages -d build",
