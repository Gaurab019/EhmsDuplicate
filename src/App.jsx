import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Login from "./Pages/Login/Login";
import Reception from "./Pages/Reception/Reception";
import Lab from "./Pages/Lab/Lab";
// import Search from "./Pages/Reception/Search";
// import CreateVisit from "./Pages/Reception/CreateVisit";
// import CreateInvoice from "./Pages/Lab/createInvoice";
// import CatalogItem from "./Pages/Lab/catalogItem";
import { ToastContainer } from "react-toastify";

// these are the pages we are testing
// import OPBillPreview from "./Components/OPBillPreview";
//the data that is neede to test this page
// import testfile from "./testfile.json";
// import Test from "./Pages/Test";

function App() {
  // state variable for the test route
  // const [jsondata, setjsondata] = useState(testfile);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/testRoute" element={<Test />} /> */}
          <Route path="/reception/*" element={<Reception />} />
          <Route path="/lab/*" element={<Lab />} />
          {/* <Route path="/admin/*" element={<Lab />} /> */}
          {/* <Route path="/search" element={<Search />} />
          <Route path="/createvisit" element={<CreateVisit />} />
          <Route path="/createinvoice" element={<CreateInvoice />} />
          <Route path="/createcatalogitem" element={<CatalogItem />} /> */}
        </Routes>
      </Router>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
