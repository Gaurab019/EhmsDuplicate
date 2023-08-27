import React from "react";
const JsonPreview = ({
  jsonData,
  setJsonData,
  removeDeleteBtn,
  handleDeleteLabItem,
  handleDeleteBedItem,
  handleDeleteOtherItem,
}) => {
  console.log("I am JsonPreview: ", jsonData);

  const handleDeleteRow = (index) => {
    handleDeleteLabItem(index);
    let updatedLabCharges = [...jsonData.labCharges];
    updatedLabCharges.splice(index, 1);
    setJsonData((prevState) => {
      console.log("handleDeleteRow: ", prevState, updatedLabCharges);
      return { ...prevState, labCharges: updatedLabCharges };
    });
  };
  const handleDeleteRowBed = (index) => {
    handleDeleteBedItem(index);
    let updatedBedCharges = [...jsonData.bedCharges];
    updatedBedCharges.splice(index, 1);
    setJsonData((prevState) => {
      // console.log(prevState);
      return { ...prevState, bedCharges: updatedBedCharges };
    });
  };
  const handleDeleteRowOther = (index) => {
    handleDeleteOtherItem(index);
    let updatedOtherCharges = [...jsonData.otherCharges];
    updatedOtherCharges.splice(index, 1);
    setJsonData((prevState) => {
      // console.log(prevState);
      return { ...prevState, otherCharges: updatedOtherCharges };
    });
  };

  return (
    <div className="previewcontainer">
      <div className="previewheader">Patient Information</div>

      <div className="info">
        <div className="info-group">
          <div className="info-item">
            <span className="previewlabel">Patient ID:</span>{" "}
            <span>{jsonData.patientId}</span>
          </div>

          <div className="info-item">
            <span className="previewlabel">Patient Name:</span>{" "}
            <span>{jsonData.patientName}</span>
          </div>
        </div>

        <div className="info-group">
          <div className="info-item">
            <span className="previewlabel">Doctor ID:</span>{" "}
            <span>{jsonData.doctorId}</span>
          </div>

          <div className="info-item">
            <span className="previewlabel">Doctor Name:</span>{" "}
            <span>{jsonData.doctorname}</span>
          </div>
        </div>

        <div className="info-group">
          <div className="info-item">
            <span className="previewlabel">Transaction ID:</span>{" "}
            <span>{jsonData.transactionId}</span>
          </div>
        </div>
      </div>

      <div className="previewlabel">Charges</div>
      <div className="lab-charges">
        <table className="previewtable">
          <thead>
            <tr className="previewtr">
              <th className="previewth previewth_additional">Item Name</th>
              <th className="previewth previewth_additional">Cost</th>
              <th className="previewth previewth_additional">No. of Times</th>
              <th className="previewth previewth_additional">Action</th>
            </tr>
          </thead>
          <tbody>
            {jsonData.labCharges?.map((item, index) => (
              <tr className="previewtr" key={index}>
                <td className="previewtd">{item.labItemName}</td>
                <td className="previewtd">{item.cost}</td>
                <td className="previewtd">{item.nooftimes}</td>
                <td className="previewtd">
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRow(index)}
                    disabled={removeDeleteBtn}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {jsonData?.bedCharges ? (
        <div className="lab-charges">
          <table className="previewtable">
            <thead>
              <tr className="previewtr">
                <th className="previewth previewth_additional">Bed Types</th>
                <th className="previewth previewth_additional">Cost</th>
                <th className="previewth previewth_additional">No. of Days</th>
                <th className="previewth previewth_additional">Action</th>
              </tr>
            </thead>
            <tbody>
              {jsonData.bedCharges?.map((item, index) => (
                <tr className="previewtr" key={index}>
                  <td className="previewtd">{item.bedItemName}</td>
                  <td className="previewtd">{item.cost}</td>
                  <td className="previewtd">{item.noofdays}</td>
                  <td className="previewtd">
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteRowBed(index)}
                      disabled={removeDeleteBtn}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
      {jsonData?.otherCharges ? (
        <div className="lab-charges">
          <table className="previewtable">
            <thead>
              <tr className="previewtr">
                <th className="previewth previewth_additional">Other Cost</th>
                <th className="previewth previewth_additional">Cost</th>
                <th className="previewth previewth_additional">No. of Days</th>
                <th className="previewth previewth_additional">Action</th>
              </tr>
            </thead>
            <tbody>
              {jsonData.otherCharges?.map((item, index) => {
                return (
                  <tr className="previewtr" key={index}>
                    <td className="previewtd">{item.otherItemName}</td>
                    <td className="previewtd">{item.cost}</td>
                    <td className="previewtd">{item.noofitmes}</td>
                    <td className="previewtd">
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteRowOther(index)}
                        disabled={removeDeleteBtn}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default JsonPreview;
