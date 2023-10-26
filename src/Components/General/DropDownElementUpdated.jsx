import React from "react";
import Select from "react-select";
import { useState } from "react";
var _ = require("lodash");

const DropDownElementV2 = ({
  resetDropdown,
  newddlist,
  setSelectedOption,
  selectedoption,
}) => {
  // // console.log(selectedoption);
  return (
    <Select
      key={resetDropdown ? "key1" : "key0"}
      defaultValue={{
        value: selectedoption.length <= 0 ? "" : selectedoption[1],
        label: selectedoption.length <= 0 ? "" : selectedoption[0],
      }}
      onChange={(e) => {
        setSelectedOption([e.label, e.value]);
      }}
      options={newddlist}
      isSearchable={true}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: state.isFocused ? "blue" : "grey",
          color: "black",
          height: "30px",
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          color: "black",
        }),
        container: (baseStyles, state) => ({
          ...baseStyles,
          flex: "70",
        }),
      }}
    />
  );
};

export default DropDownElementV2;
