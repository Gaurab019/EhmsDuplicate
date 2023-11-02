import React, { useRef, useEffect, useState } from "react";
import { submitAddLabItemsForm } from "../../Controller/AddLabItemsControl";
import { useUsernameStore } from "../../../../store/store";
import { usePasswordStore } from "../../../../store/store";
import { useTokenStore } from "../../../../store/store";

const AddLabItems = () => {
  const token = useTokenStore((state) => state.token.token);
  const statuscode = useTokenStore((state) => state.token.statuscode);
  const setToken = useTokenStore((state) => state.setToken);
  const fetchnewToken = useTokenStore((state) => state.fetchnewToken);
  const username = useUsernameStore((state) => state.username);
  const password = usePasswordStore((state) => state.password);

  const [formSubmit, setFormSubmit] = useState(false);

  const itemNameRef = useRef();
  const mrpRef = useRef();
  const discountRef = useRef();
  const shareRevenueRef = useRef();

  useEffect(() => {
    if (
      itemNameRef.current.value &&
      mrpRef.current.value &&
      discountRef.current.value
    ) {
      submitAddLabItemsForm(
        {
          proceedurename: itemNameRef.current.value,
          mrp: mrpRef.current.value,
          discount: discountRef.current.value,
          sharerevenue: shareRevenueRef.current.checked,
          GSTValue: process.env.REACT_APP_GSTValue,
        },
        token,
        setToken,
        fetchnewToken,
        username,
        password,
        statuscode
      )
        .then(() => {
          itemNameRef.current.value = "";
          mrpRef.current.value = "";
          discountRef.current.value = "";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token, formSubmit]);
  return (
    <div className=" overflow-y-scroll overflow-x-clip">
      <form
        id="AddLabForm"
        onSubmit={(e) => {
          e.preventDefault();
          // callValidationAndSubmit(e);
          console.log("Form submitted");
          setFormSubmit(!formSubmit);
        }}
      >
        <div className="Rece-flex-container">
          <div className="container-right">
            <div className="patientDet">
              <div className=" grid grid-cols-1 gap-x-5 gap-y-2  box-border [width:100%] xl:grid-cols-2 mb-10">
                <div className="flex gap-2 justify-center items-center pl-2 pr-2">
                  <label className="text-[#36454f] text-base font-normal [letter-spacing: 0.5px] box-border">
                    Item
                  </label>
                  <label className="text-red-500"> *</label>
                  <input
                    type="text"
                    placeholder="Lab Item Name"
                    ref={itemNameRef}
                    required
                  />
                </div>
                <div className="flex gap-2 justify-center items-center pl-2 pr-2">
                  <label className="text-[#36454f] text-base font-normal [letter-spacing: 0.5px] box-border">
                    Mrp
                  </label>
                  <label className="text-red-500"> *</label>
                  <input
                    type="number"
                    placeholder="Mrp"
                    ref={mrpRef}
                    required
                  />
                </div>
                <div className="flex gap-2 justify-center items-center pl-2 pr-2">
                  <label className="text-[#36454f] text-base font-normal [letter-spacing: 0.5px] box-border">
                    Discount
                  </label>
                  <label className="text-red-500"> *</label>
                  <input
                    type="number"
                    required
                    placeholder="Discount"
                    ref={discountRef}
                    max={100}
                    min={0}
                  />
                </div>
                <div className="flex gap-2 justify-center items-center pl-2 pr-2">
                  <label className="text-[#36454f] text-base font-normal [letter-spacing: 0.5px] box-border">
                    Share Revenue
                  </label>
                  <label className="text-red-500"> *</label>
                  <input
                    ref={shareRevenueRef}
                    type="checkbox"
                    defaultChecked={true}
                    id="ManualEntry"
                  />
                </div>
              </div>
              <div className="flex justify-center items-center gap-2 flex-col">
                <button
                  className="bg-green-500 text-white p-3 rounded-lg"
                  // onClick={handleAddLabItem}
                  type="onSubmit"
                >
                  Create Lab Item
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="flex flex-col justify-center items-center xl:flex-row"></div> */}
      </form>
    </div>
  );
};

export default AddLabItems;
