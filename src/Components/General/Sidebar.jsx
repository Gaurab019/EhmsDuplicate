import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
function Sidebar({ Info1, Info2, parentPath, logout, role }) {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const TOG = () => {
    setToggle(!toggle);
    // console.log(toggle);
  };
  // const TOG2 = () => {
  //   setToggle(!toggle2);
  //   // console.log(toggle2);
  // };

  const baseTextColor = "text-[#b7b7f2]";
  const activeStyle =
    "bg-[#77ffab] mb-2 mt-2 box-content border-solid rounded-md text-[#130b1f]  font-semibold ";
  return (
    <div className="[height:100vh] fixed  min-w-[20vw] xl:min-w-[15vw] left-0 top-0 bg-[#17181a] flex flex-col items-center justify-center">
      <div className="[flex:20%] [width:100%] flex flex-col justify-center gap-2 items-center box-border">
        <img src={Info1.imgURL} alt="ImageMissing" className="ReceptionImage" />
        <br />
        {role == "Admin" ? (
          <div className="text-[#fafafa]">Admin</div>
        ) : (
          <div className="text-[#fafafa]">{Info1.Title}</div>
        )}
      </div>
      <div className="flex flex-col pl-6 pr-2 [flex:60%] [width:100%] text-xl gap-4 box-border">
        {role == "Admin" ? (
          <>
            <div className="flex flex-col items-start">
              <Link
                onClick={TOG}
                // to="/reception/adminpanel/dashboard"
                to="/reception/adminpanel/addlab"
                className={`mb-1 ${baseTextColor} `}
              >
                Admin
              </Link>
            </div>
            {(location.pathname === "/reception/adminpanel" ||
              location.pathname === "/reception/adminpanel/dashboard" ||
              location.pathname === "/reception/adminpanel/addlab" ||
              location.pathname === "/reception/adminpanel/addOther") && (
              <div className="text-lg flex flex-col">
                {/* <Link
                  className={`text-center p-2  ml-5  ${
                    location.pathname === "/reception/adminpanel/dashboard"
                      ? activeStyle
                      : `${baseTextColor}`
                  }`}
                  to="adminpanel/dashboard"
                >
                  Dashboard
                </Link> */}
                <Link
                  className={`text-center p-2  ml-5  ${
                    location.pathname === "/reception/adminpanel/addlab"
                      ? activeStyle
                      : `${baseTextColor}`
                  }`}
                  to="adminpanel/addlab"
                >
                  Lab Items Panel
                </Link>
                <Link
                  className={`text-center p-2  ml-5  ${
                    location.pathname === "/reception/adminpanel/addOther"
                      ? activeStyle
                      : `${baseTextColor}`
                  }`}
                  to="adminpanel/addOther"
                >
                  Other Items Panel
                </Link>
              </div>
            )}
          </>
        ) : (
          <></>
        )}
        <div className="flex flex-col items-start ">
          <Link
            onClick={TOG}
            to="/reception/newPatient"
            className={`mb-1   ${
              location.pathname === `${parentPath}/newPatient`
                ? `${activeStyle} pl-4 pr-4 pt-2 pb-2 `
                : `${baseTextColor}`
            } `}
          >
            Registration
          </Link>
        </div>
        <div className="flex flex-col items-start">
          <Link
            onClick={TOG}
            to="/reception/Search"
            className={`mb-1  ${
              location.pathname === `${parentPath}/Search`
                ? `${activeStyle} pl-4 pr-4 pt-2 pb-2`
                : `${baseTextColor}`
            }`}
          >
            Search
          </Link>
        </div>
        <div className="flex flex-col items-start">
          <Link
            onClick={TOG}
            to="/reception/PharmacyBilling"
            className={`mb-1  ${
              location.pathname === `${parentPath}/PharmacyBilling`
                ? `${activeStyle} pl-4 pr-4 pt-2 pb-2`
                : `${baseTextColor}`
            }`}
          >
            Pharmacy Billing
          </Link>
        </div>
        <div className="flex flex-col items-start">
          <Link
            onClick={TOG}
            to="/reception/createvisit/OP"
            className={`mb-1 ${baseTextColor} `}
          >
            Create Visit
          </Link>
        </div>

        {(location.pathname === "/reception/createvisit" ||
          location.pathname === "/reception/createvisit/OP" ||
          location.pathname === "/reception/createvisit/IP") && (
          <div className="text-lg flex flex-col">
            <Link
              className={`text-center p-2 ml-5  ${
                location.pathname === "/reception/createvisit/OP"
                  ? activeStyle
                  : `${baseTextColor}`
              }`}
              to="createvisit/OP"
            >
              Create Visit OP
            </Link>
            <Link
              className={`text-center p-2 ml-5   ${
                location.pathname === "/reception/createvisit/IP"
                  ? activeStyle
                  : `${baseTextColor}`
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
            className={`mb-1 ${baseTextColor} `}
          >
            Billing
          </Link>
        </div>
        {(location.pathname === "/reception/createinvoice" ||
          location.pathname === "/reception/createinvoice/OP" ||
          location.pathname === "/reception/createinvoice/IP") && (
          <div className="text-lg flex flex-col">
            <Link
              className={`text-center p-2  ml-5  ${
                location.pathname === "/reception/createinvoice/OP"
                  ? activeStyle
                  : `${baseTextColor}`
              }`}
              to="createinvoice/OP"
            >
              Billing OP
            </Link>
            <Link
              className={`text-center p-2  ml-5  ${
                location.pathname === "/reception/createinvoice/IP"
                  ? activeStyle
                  : `${baseTextColor}`
              }`}
              to="createinvoice/IP"
            >
              Billing IP
            </Link>
          </div>
        )}
      </div>
      <button
        className="[height:5%] [width:80%] mb-5 bg-red-600  text-white font-bold  rounded-md hover:bg-white hover:text-black"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
