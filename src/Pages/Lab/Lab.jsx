import React from "react";
import SideBar from "../../Components/General/Sidebar";
import { Route, Routes } from "react-router-dom";
import { Con } from "../../models/Configure";
import CatalogItems from "../../Components/Lab/catalogItems";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTokenStore } from "../../store/store";
import { usePasswordStore } from "../../store/store";
import { useUsernameStore } from "../../store/store";
import { useDoctorStore } from "../../store/store";
var _ = require("lodash");

function Lab() {
  const SideBarInfo1 = Con.Lab.SideBarInfo1;
  const SideBarInfo2 = Con.Lab.SideBarInfo2;
  const parentPath = Con.Lab.parentPath;

  const username = useUsernameStore((state) => state.username);
  const password = usePasswordStore((state) => state.password);
  const setpassword = usePasswordStore((state) => state.setpassword);
  const setusername = useUsernameStore((state) => state.setusername);
  const token = useTokenStore((state) => state.token.token);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const setToken = useTokenStore((state) => state.setToken);
  const doctorarr = useDoctorStore((state) => state.doctors.data);
  const Docstatuscode = useDoctorStore((state) => state.doctors.statuscode);
  const fetchalldoctors = useDoctorStore((state) => state.fetchalldoctors);
  const [newddlist, setnewddlist] = useState([]);
  const [triggertoggle, setTriggertoggle] = useState(false);

  const navigate = useNavigate();
  const getAlldata = async () =>
    await fetchalldoctors(process.env.REACT_APP_GetAllDoctors, token);
  const getTokenData = async () =>
    await fetchnewToken(process.env.REACT_APP_GetTokenURL, username, password);

  const logout = () => {
    setpassword("");
    setusername("");
    setToken("");
  };

  useEffect(() => {
    if (_.isNull(token) || _.isUndefined(token) || token == "") {
    } else {
      let ddlist = [];
      // console.log("inner function called");
      // console.log(doctorarr);
      if (Docstatuscode == 401) getTokenData();
      if (!_.isEmpty(doctorarr)) {
        doctorarr.map((item) => {
          ddlist.push({
            value: item.doctorname,
            label: `DR. ${item.doctorname.toUpperCase()}`,
          });
        });
      }
      setnewddlist(ddlist);
    }
  }, [doctorarr]);

  useEffect(() => {
    if (_.isNull(token) || _.isUndefined(token) || token == "") {
      // console.log("No Token");
      navigate("/", {
        replace: true,
      });
    } else if (username == "" || password == "") {
      setToken("");
    } else {
      // console.log(token);
      // console.log("token found");
      navigate(`${parentPath}/createinvoice`);
    }
  }, []);

  useEffect(() => {
    if (_.isNull(token) || _.isUndefined(token) || token == "") {
      // console.log("No Token");
      navigate("/", {
        replace: true,
      });
    }
  }, [token]);

  useEffect(() => {
    if (_.isNull(token) || _.isUndefined(token) || token == "") {
    } else {
      if (username == "" || password == "") {
        setToken("");
      } else {
        getAlldata();
        // console.log("token found");
      }
    }
  }, [triggertoggle]);
  // console.log("doctor List from LAB ", newddlist);

  return (
    <div className="receptionDiv">
      <div className="Rece-flex-container">
        <div className="Rece-flex-item-left">
          <SideBar
            Info1={SideBarInfo1}
            Info2={SideBarInfo2}
            parentPath={parentPath}
          />
          <button class="button-23" onClick={logout}>
            Logout
          </button>
        </div>
        <div className="Rece-flex-item-right">
          <Routes>
            <Route path="catalogitems" element={<CatalogItems />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Lab;
