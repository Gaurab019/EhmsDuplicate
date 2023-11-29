import React, { useState } from "react";
import {
  InputBox1,
  InputBox2,
  InputBox3,
  SelectDropdown,
} from "../PharmacyBilling/Fields";

export const PharmacyBilling = ({ newddlist }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [tableData, setTableData] = useState([]);
  const handleSelect = () => {
    setTableData([
      ...tableData,
      { column1: selectedOption[0], column2: "Item 1B", column3: "Item 1C" },
    ]);
  };
  console.log("selectedOption",selectedOption)
  return (
    <div className="[height:100%] [width:100%]">
      <h1 className="bg-[#f2ecff] text-[#04040c] h-24 flex items-center justify-start box-border p-5 rounded-l-xl ml-4 mt-2 mb-12 [width:100%]">
        Pharmacy Billing
      </h1>

      <div className="flex" style={{ width: "70%" }}>
        <InputBox1 className={""} />
        <InputBox2 />
        <InputBox3 />
      </div>
      <div className="container">
        <div className="col">
          <div className="flex" style={{ width: "50%" }}>
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
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
            <div className="col">
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  {/* <thead> */}
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
                  {/* </thead> */}
                  {/* <tbody> */}
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
                  {/* </tbody> */}
                </table>
            </div>
        </div>
      </div>
    </div>
  );
};
