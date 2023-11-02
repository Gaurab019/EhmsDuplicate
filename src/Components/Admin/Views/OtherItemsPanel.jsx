import React, { useState } from "react";
import AddLabItems from "../Components/Lab Components/AddLabItem";
import SearchLabItem from "../Components/Lab Components/SearchLabItem";
import AddOtherItems from "../Components/Other Item Components/AddOtherItem";
import SearchOtherItem from "../Components/Other Item Components/SearchOtherItem";

const activeStyle =
  "bg-green-500 mb-2 mt-2 box-content border-solid rounded-md text-white  font-semibold pb-2 pt-2 hover:bg-white hover:text-black hover:border-amber-500 hover:border-2 box-border ";

const OtherItemsPanel = () => {
  const [selectedOption, setSelectedOption] = useState("AddOtherItems");

  return (
    <div className="[height:100%] [width:100%]">
      <h1 className="bg-[#f2ecff] text-[#04040c] h-24 flex items-center justify-start box-border p-5 rounded-l-xl ml-2 mt-2 mb-12 [width:100%]">
        Other Items Panel{" "}
      </h1>
      <div className="flex gap-5">
        <div className="flex flex-col [flex:20]">
          <button
            className={activeStyle}
            onClick={() => {
              setSelectedOption("AddOtherItems");
            }}
          >
            Add Other Item
          </button>
          {/* <button
            className={activeStyle}
            onClick={() => {
              setSelectedOption("SearchOtherItems");
            }}
          >
            Search Other Item
          </button> */}
        </div>
        <div className="[flex:80]">
          {selectedOption == "AddOtherItems" ? (
            <AddOtherItems />
          ) : selectedOption == "SearchOtherItems" ? (
            <SearchOtherItem />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherItemsPanel;
