import { useState } from "react";
import { BsSearch } from "react-icons/bs";
import DropDownElement from "../General/DropDownElement";
import InputComponent from "../General/InputComponent";
import { FaSearch } from "react-icons/fa";

export const InputBox = () => {
  const [value, setValue] = useState("");
  let needsearch = true;
  return (
    <div className="container">
      <div className="card">
          <div className="card-header">
              <form className="form">
                  <div className="row">
                      <div className="col-lg-3">
                        <InputComponent 
                            inputContainer="col-xs-12 col-sm-3 col-md-3 col-lg-3"
                            label={'Label 1'}
                            labelClassName="form-label"
                            type="text"
                            className="form-control"
                            placeholder={'label 1'}
                            isMandiIcon={true}
                        />
                      </div>
                      <div className="col-lg-3">
                        <InputComponent 
                            inputContainer="col-xs-12 col-sm-3 col-md-3 col-lg-3"
                            label={'Label 2'}
                            labelClassName="form-label"
                            type="text"
                            className="form-control"
                            placeholder={'label 2'}
                            isMandiIcon={true}
                        />
                      </div>
                      <div className="col-lg-3">
                        <InputComponent 
                            inputContainer="col-xs-12 col-sm-3 col-md-3 col-lg-3"
                            label={'Label 3'}
                            labelClassName="form-label"
                            type="text"
                            className="form-control"
                            placeholder={'label 3'}
                            isMandiIcon={true}
                        />
                      </div>
                      <FaSearch />
                      {/* <div className="d-grid mt-2 col-12 col-sm-2 col-md-2 col-lg-2 align-self-end">
                          {/* <button type="submit" className="btn btn-primary ">{t("fees:filter")}</button> 
                          <Button 
                              buttonText={t("fees:Filter")}
                              buttonclassName="btn btn-primary"
                              onClick={(e) => { e.preventDefault(); handleSubmit("filterFormData" )}}
                          />
                      </div> */}
          
                  </div>
              </form>
          </div>
      </div>
    </div>
  );
};

// export const InputBox2 = () => {
//   const [value, setValue] = useState("");

//   return (
//     <div className="fieldRow">
//       <span className="patHeading">Label 2</span>
//       <span className="star"> </span>
//       <input
//         type="text"
//         className="RecInp"
//         value={value}
//         placeholder="Label 2"
//         onChange={(e) => setValue(e.target.value)}
//       />
//       <span className="refreshicon"></span>
//     </div>
//   );
// };

// export const InputBox3 = () => {
//   const [value, setValue] = useState("");

//   return (
//     <div className="fieldRow">
//       <span className="patHeading">Label 3</span>
//       <span className="star"> </span>
//       <input
//         type="text"
//         className="RecInp"
//         value={value}
//         placeholder="Label 3"
//         onChange={(e) => setValue(e.target.value)}
//       />
//       <span className="refreshicon"></span>
//     </div>
//   );
// };

// export const SelectDropdown = ({ newddlist, setSelectedOption }) => {
//   return (
//     <div className="fieldRow">
//       <span className="patHeading">Select Options</span>
//       <span className="star">*</span>

//       <DropDownElement
//         // selectedoption={selectedoption}
//         // resetDropdown={resetDropdown}
//         newddlist={newddlist}
//         setSelectedOption={setSelectedOption}
//       />
//       {/* )} */}
//     </div>
//   );
// };
