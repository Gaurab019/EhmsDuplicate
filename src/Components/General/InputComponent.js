import React from 'react'

const InputComponent = (props) => {
    const {className, isMandiIcon} = props
    
  return (
    <div className={props.inputContainer || "input-group mb-3"}>
        {!!props.label ? <label className={props.labelClassName || "form-label"}>{props.label}{isMandiIcon ? <span className="mandi">*</span> : null}</label> : null} 
        <input
            id={props.id ? props.id : props.name}
            type={props.type}
            className={className}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            onClick={props.onClick}
            onFocus={props.onFocus}
            placeholder={props.placeholder}
            style={props.style}
            maxLength={props.maxLength}
            minLength={props.minLength}
            readOnly={props.readOnly}
            autoComplete={props.autoComplete || "off"}
            ref={props.ref}
            onKeyDown={props.onKeyDown ? props.onKeyDown : (event) => { if (event.key === 'Enter') { event.preventDefault(); event.stopPropagation(); } }}
            onCopy={props.onCopy}
            onPaste={props.onPaste}
            onBlur={props.onBlur}
            disabled={props.disabled}

        />
        {
            props.isIconRequired ?
                <span aria-hidden="true" className="input-group-text" onClick={props?.iconToggle}>
                    <i className={props.iconClassName ? props.iconClassName : "fa-solid fa-user"}></i>
                </span>
                : null
        }
        {props.errorMsg ?
            <div className="invalid-feedback d-block">{props.errorMsg}</div>
            : null
        }
    </div>
    // {errorMsg && isIconRequired ? <div style={{ marginTop: -20, marginBottom: 20 }} className="invalid-feedback d-block">{showErrorMessage({ errorMsg: errorMsg, validationRules: props.validationRules })}</div> : null}
  )
}

export default InputComponent