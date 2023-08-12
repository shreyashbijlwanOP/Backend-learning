import classNames from "classnames";

const TextInput = ({
  register,
  name,
  label,
  error,
  callback,
  mandatory = false,
  type,
  placeholder,
  inputClass,
  labelClass,
}) => {
  return (
    <div className="form-floating my-3">
      <input
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...register(name)}
        name={name}
        className={classNames("form-control", inputClass, {
          "is-invalid": error,
        })}
        onChange={callback ? callback : null}
      />
      <label className={classNames(labelClass)}>
        {label} {mandatory && <span className="text-danger">*</span>}{" "}
      </label>
      {error && <small className="form-label text-danger fs-6">{error}</small>}
    </div>
  );
};

export default TextInput;
