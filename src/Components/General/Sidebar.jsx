import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
function Sidebar({ Info1, Info2, parentPath }) {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const TOG = () => {
    setToggle(!toggle);
    // console.log(toggle);
  };
  const TOG2 = () => {
    setToggle(!toggle2);
    // console.log(toggle2);
  };

  const activeStyle = "bg-white mb-2 mt-2 box-content border-solid rounded-md";
  return (
    <>
      <div>
        <img src={Info1.imgURL} alt="ImageMissing" className="ReceptionImage" />
        <br />
        <div className="receptionWord">{Info1.Title}</div>
      </div>
      <div className="flex flex-col ml-2 mr-2 sidebarOptions">
        {Object.entries(Info2).map(([key, value]) => (
          <div key={key} className="flex flex-col items-start">
            <Link
              to={`${key}`}
              className={`mb-1 text-[#5e17eb] ${
                location.pathname === `${parentPath}/${key}` ? activeStyle : ""
              }`}
            >
              {value}
            </Link>
          </div>
        ))}
        <div className="flex flex-col items-start">
          <Link
            onClick={TOG}
            to="/reception/createvisit/OP"
            className={`mb-1 text-[#5e17eb] `}
          >
            Create Visit
          </Link>
        </div>

        {(location.pathname === "/reception/createvisit" ||
          location.pathname === "/reception/createvisit/OP" ||
          location.pathname === "/reception/createvisit/IP") && (
          <div className="optt flex flex-col">
            <Link
              className={`options option p-0 ml-5  ${
                location.pathname === "/reception/createvisit/OP"
                  ? activeStyle
                  : ""
              }`}
              to="createvisit/OP"
            >
              Create Visit OP
            </Link>
            <Link
              className={`options option p-0 ml-5  ${
                location.pathname === "/reception/createvisit/IP"
                  ? activeStyle
                  : ""
              }`}
              to="createvisit/IP"
            >
              Create Visit IP
            </Link>
          </div>
        )}

        <div className="flex flex-col items-start">
          <Link
            onClick={TOG}
            to="/reception/createinvoice/OP"
            className={`mb-1 text-[#5e17eb] `}
          >
            Billing
          </Link>
        </div>
        {(location.pathname === "/reception/createinvoice" ||
          location.pathname === "/reception/createinvoice/OP" ||
          location.pathname === "/reception/createinvoice/IP") && (
          <div className="optt flex flex-col">
            <Link
              className={`options option  p-0 ml-5  ${
                location.pathname === "/reception/createinvoice/OP"
                  ? activeStyle
                  : ""
              }`}
              to="createinvoice/OP"
            >
              Billing OP
            </Link>
            <Link
              className={`options option  p-0 ml-5  ${
                location.pathname === "/reception/createinvoice/IP"
                  ? activeStyle
                  : ""
              }`}
              to="createinvoice/IP"
            >
              Billing IP
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default Sidebar;
