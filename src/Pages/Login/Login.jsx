import React, { useEffect, useState } from "react";
import "./Login.css";
import "@lottiefiles/lottie-player";
import LottieAnimation from "../../Components/General/DocAnim";
// import { getJWTtoken } from "./apis/userverification";
import "react-toastify/dist/ReactToastify.css";
import {
  setErrorToast,
  toastSuccessStatus,
} from "../../Components/General/sendToast";
import { useNavigate } from "react-router-dom";
import {
  useTokenStore,
  usePasswordStore,
  useUsernameStore,
} from "../../store/store";

var _ = require("lodash");

function App() {
  const token = useTokenStore((state) => state.token.token);
  const statuscode = useTokenStore((state) => state.token.statuscode);
  const role = useTokenStore((state) => state.token.role);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const username = useUsernameStore((state) => state.username);
  const setusername = useUsernameStore((state) => state.setusername);
  const password = usePasswordStore((state) => state.password);
  const setpassword = usePasswordStore((state) => state.setpassword);
  const navigate = useNavigate();

  const [trigger, settrigger] = useState(false);

  const login = async () => {
    // // console.log(username);
    // // console.log(password);
    // try {
    await fetchnewToken(process.env.REACT_APP_GetTokenURL, username, password);
    // } catch (error) {
    // // console.log("error triggered");
    // // console.log(error);
    // // console.log(error.response.status);
    // // console.log(statuscode);
    // }
    settrigger(!trigger);
  };

  useEffect(() => {
    if (_.isNull(token) || _.isUndefined(token) || token === "") {
      // // console.log("use effecttriggered");
      let httpcode = statuscode;
      setErrorToast(httpcode);
    } else {
      toastSuccessStatus("Login Successful");

      if (role === "Lab") {
        navigate("/lab/catalogitems", {
          replace: true,
        });
      } else if (role === "Reception") {
        navigate("/reception/newPatient", {
          replace: true,
        });
      }
    }
  }, [trigger]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm">
          <span className="wttfo">Welcome to the future of </span>
          <span className="ehms">E-HMS!</span>
          <LottieAnimation />
        </div>
        <div className="col-sm">
          <div className="Right">
            <h3 className="ltd">LOGIN TO DASHBOARD</h3>
            {/* <input
              className="inputs"
              placeholder="Username"
              type="text"
              onChange={(e) => setuserName(e.target.value)}
              value={userName}
            /> */}
            <div className="form__group field">
              <input
                type="input"
                className="form__field inputs"
                placeholder="Username"
                name="name"
                id="name"
                required
                onChange={(e) => setusername(e.target.value)}
              />
              {/* <label for="name" class="form__label">
                UserName
              </label> */}
            </div>

            <div className="form__group field">
              <input
                type="password"
                className="form__field inputs"
                placeholder="Password"
                name="name"
                id="name"
                required
                onChange={(e) => setpassword(e.target.value)}
              />
              {/* <label for="name" class="form__label">
                Password
              </label> */}
            </div>
            {/* <input
              className="inputs"
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={Password}
            /> */}

            <button className="button-6 savesubmit" onClick={login}>
              LOGIN
            </button>
          </div>
        </div>
      </div>
      {/* <center className="foot">
        <p className="footer">&copy; 2023 Hospital. Designed by SoberSouls</p>
      </center> */}
    </div>
  );
}

export default App;
