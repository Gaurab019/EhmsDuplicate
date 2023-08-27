import React from "react";

function FormDetails({ InputFields }) {
  return (
    <>
      {Object.entries(InputFields).map(([index, key]) => (
        <div
          className={key[2] == "label" ? "LabelDivider" : "fieldRow"}
          key={index}
        >
          <span className={key[2] == "label" ? "LabelDivider" : "patHeading"}>
            {key[0]}
          </span>
          {key[1] == 1 ? (
            <span className="star">*</span>
          ) : (
            <span className="star"></span>
          )}
          {key[2] == "label" ? (
            void 0
          ) : (
            <>
              <input
                type={key[2]}
                className="RecInp"
                placeholder={key[0]}
                maxLength={32}
              />
              <span className="refreshicon"></span>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default FormDetails;
