import classNames from "classnames";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const TextInput = ({
  name,
  label,
  callback,
  error,
  mandatory = false,
  register,
  inputClass,
  labelClass,
}) => {
  const [passwordState, setPasswordState] = useState({
    type: "password",
    isVisible: false,
  });
  return (
    <div>
      <div className="form-floating mb-3 position-relative">
        <input
          type={passwordState.type}
          autoComplete="off"
          {...register(name)}
          placeholder="Enter password Here"
          name={name}
          className={classNames("form-control", inputClass, {
            "is-invalid": error,
          })}
          onChange={callback ? callback : null}
        />
        {!passwordState.isVisible && (
          <span
            onClick={() =>
              setPasswordState({
                type: "text",
                isVisible: true,
              })
            }
          >
            <FaEye className="text-black-50 position-absolute end-0 top-0 mt-3 me-2 fs-3"></FaEye>
          </span>
        )}
        {passwordState.isVisible && (
          <span
            onClick={() =>
              setPasswordState({
                type: "password",
                isVisible: false,
              })
            }
          >
            <FaEyeSlash className="text-black-50 position-absolute end-0 top-0 mt-3 me-2 fs-3"></FaEyeSlash>
          </span>
        )}

        <label className={classNames(labelClass)}>
          {label} {mandatory && <span className="text-danger">*</span>}
        </label>
        {error && (
          <small className="form-label text-danger fs-6">{error}</small>
        )}
      </div>
    </div>
  );
};

export default TextInput;
