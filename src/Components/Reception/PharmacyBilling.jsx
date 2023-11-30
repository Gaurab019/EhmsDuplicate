import React, { useState } from "react";
import InputComponent from "../General/InputComponent";
import { FaSearch } from "react-icons/fa";
import Button from "../General/Button";
import SelectDropdown from "../General/SelectDropdown";

export const PharmacyBilling = ({ newddlist }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [tableData, setTableData] = useState([]);
  // const handleSelect = () => {
  //   setTableData([
  //     ...tableData,
  //     { column1: selectedOption[0], column2: "Item 1B", column3: "Item 1C" },
  //   ]);
  // };

  // const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  // const handleSelect = (selectedOption) => {
  //   console.log(`Selected option: ${selectedOption}`);
  //   // Perform any additional actions on option selection
  // };
  
  console.log("selectedOption",selectedOption)
  return (
    <div className="container">
        <div className="col-12">
          <h1 className="bg-[#f2ecff] text-[#04040c] h-24 flex items-center justify-start box-border p-5 rounded-l-xl ml-4 mt-2 mb-12 [width:100%]">
            Pharmacy Billing
          </h1>
        </div>
        
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
                          <div className="d-grid mt-2 col-12 col-sm-2 align-self-start">
                              <button type="submit" className="btn btn-primary ">Search</button> 
                              {/* <Button 
                                  buttonText={Filter}
                                  buttonclassName="btn btn-primary"
                                  onClick={(e) => { e.preventDefault(); handleSubmit("filterFormData" )}}
                              /> */}
                          </div>
                          {/* <div class="search-container">
                            {/* <input type="text" id="searchInput" placeholder="Search..." /> 
                            <button onclick="">Search</button>
                          </div> */}
                          {/* <button class="search-container" onclick="">Search</button> */}
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
                        {/* <FaSearch /> */}
                        {/* <div class="search-container">
                          {/* <input type="text" id="searchInput" placeholder="Search..." /> 
                          <button onclick="">Search</button>
                        </div> */}
            
                    </div>
                </form>
            </div>
            <div>
              <div className="col" style={{ width: "50%" }}>
                <SelectDropdown 
                  // options={options}
                  // className={'cust_dropdown mb-4'}
                />
              </div>
            </div>
        </div>
  
        {/* <div className="flex justify-content-center" style={{ width: "50%" }}>
          <SelectDropdown
            newddlist={newddlist}
            setSelectedOption={setSelectedOption}
          />
          <div className="buttondiv">
            <button
              type="submit"
              className="button-6 savesubmit"
              onClick={handleSelect}
            >
              Add
            </button>
          </div>
        </div> */}

        {/* <div>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th
                    style={{
                      width: "33.33%",
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Column 1
                  </th>
                  <th
                    style={{
                      width: "33.33%",
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Column 2
                  </th>
                  <th
                    style={{
                      width: "33.33%",
                      border: "1px solid #ddd",
                      padding: "8px",
                      textAlign: "left",
                    }}
                  >
                    Column 3
                  </th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((item, index) => (
                  <tr key={index}>
                    {Object.values(item).map((value, index) => (
                      <td
                        key={index}
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                          textAlign: "left",
                        }}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
        </div> */}
    </div>
      
     
   
  );
};
