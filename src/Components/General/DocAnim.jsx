import React, { useEffect, useState } from "react";
import "@lottiefiles/lottie-player";
import "../../App.css";
const LottieAnimation = () => {
  const [isScreenSmall, setIsScreenSmall] = useState(
    window.innerWidth < 768 || window.innerHeight < 500
  );

  useEffect(() => {
    const handleResize = () => {
      const x = window.innerWidth < 768 || window.innerHeight < 500;
      const y = window.innerWidth < 768 || window.innerHeight < 700;
      setIsScreenSmall(x && y);
    };

    // Attach event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      {isScreenSmall ? null : (
        <div className="flex-container">
          <div className="flex-item-left">
            <img
              src={require("../../Images/doctor.png")}
              className="[height:430px] [width:250px] absolute [top:38%] [left:3%] md:[left:15%] md:[top:45%] lg:[left:20%] lg:[top:45%]"
              alt="DoctorImage"
            />
          </div>

          <div className="absolute p-3 [top:50%] [left:20%] lg:[top:60%] md:[top:60%]">
            <lottie-player
              src="https://assets4.lottiefiles.com/packages/lf20_1elvfrxr.json"
              className="lottie-animation"
              background="transparent"
              speed="1"
              style={{ width: "250px", height: "250px" }}
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>
      )}
    </>
  );
};

export default LottieAnimation;
