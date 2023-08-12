import classNames from "classnames";

const BooleanCheckbox = ({
  name,
  label,
  error,
  callback,
  value,
  mandatory = false,
  inputClass,
  labelClass,
}) => {
  return (
    <>
      <input
        type="checkbox"
        value={value}
        name={name}
        className={classNames("form-checkbox", inputClass, {
          "is-invalid": error,
        })}
        onChange={callback ? callback : null}
      />
      <label className={classNames(labelClass)}>
        {label} {mandatory && <span className="text-danger">*</span>}{" "}
      </label>
      {error && <small className="form-label text-danger fs-6">{error}</small>}
    </>
  );
};

export default BooleanCheckbox;
