import React from "react";
import FormDetails from "../General/FormDetails";
import { Con } from "../../models/Configure";
function CatalogItems() {
  const InputFields = Con.Lab.catalogItems.InputFields;
  return (
    <div>
      {" "}
      <h1 className="NPR">Create LAB Catalog Item</h1>
      <div className="Rece-flex-container">
        <div className="container-right">
          <div className="patientDet">
            <FormDetails InputFields={InputFields} />
          </div>
        </div>
      </div>
      <div className="buttondiv">
        <button class="button-6 savesubmit" role="button">
          ADD
        </button>
        <button class="button-6 savesubmit" role="button">
          SUBMIT
        </button>
      </div>
    </div>
  );
}

export default CatalogItems;
