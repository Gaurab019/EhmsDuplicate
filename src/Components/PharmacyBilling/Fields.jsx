import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import DropDownElement from "../General/DropDownElement";

export const InputBox1 = () => {
  const [value, setValue] = useState("");
  let needsearch = true;
  return (
    <div className="container">
        <div className="row">
          <div className="col">
            <div className="fieldRow">
              <span className="patHeading">label 1</span>
              <span className="star">*</span>
              <input
                type="text"
                required
                title="Enter"
                className="RecInp"
                value={value}
                placeholder="Label 1"
                onChange={(e) => {
                  setValue(e.target.value);
                }}
              />{" "}
              {needsearch ? (
                <span
                  className="refreshicon iconstyle "
                  onClick={(e) => {
                    // console.log("search triggered");
                  }}
                >
                  <div className="searchstyle">
                    <BsSearch />
                  </div>
              </span>
            ) : (
              <span className="refreshicon iconstyle "></span>
            )}
          </div>
          </div>
        </div>
    </div>
  );
};

export const InputBox2 = () => {
  const [value, setValue] = useState("");

  return (
    <div className="container">
        <div className="row">
          <div className="col">
            <div className="fieldRow">
            <span className="patHeading">Label 2</span>
            <span className="star"> </span>
            <input
              type="text"
              className="RecInp"
              value={value}
              placeholder="Label 2"
              onChange={(e) => setValue(e.target.value)}
            />
            <span className="refreshicon"></span>
            </div>
          </div>
        </div>
    </div>
  );
};

export const InputBox3 = () => {
  const [value, setValue] = useState("");

  return (
    <div className="container">
        <div className="row">
          <div className="col">
            <div className="fieldRow">
            <span className="patHeading">Label 3</span>
            <span className="star"> </span>
            <input
              type="text"
              className="RecInp"
              value={value}
              placeholder="Label 3"
              onChange={(e) => setValue(e.target.value)}
            />
            <span className="refreshicon"></span>
            </div>
          </div>
        </div>
    </div>
  );
};

export const SelectDropdown = ({ newddlist, setSelectedOption }) => {
  return (
    <div className="container">
      <div className="col">
            <div className="fieldRow">
            <span className="patHeading">Select Options</span>
            <span className="star">*</span>
          
            <DropDownElement
              // selectedoption={selectedoption}
              // resetDropdown={resetDropdown}
              newddlist={newddlist}
              setSelectedOption={setSelectedOption}
            />
            
            </div>
        </div>
    </div>
  );
};