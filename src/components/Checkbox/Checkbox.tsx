import React from "react";
import "./Checkbox.scss";

interface CheckboxProps {
  label?: string;
  mainLabel?: string;
  checked: string;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  mainLabel,
  onChange,
}) => {
  console.log(">> checked", checked);
  return (
    <div className="custom-checkbox">
      {mainLabel && (
        <label className="custom-textarea__label">{mainLabel}</label>
      )}
      <div className="flex-center">
        <input
          type="checkbox"
          checked={checked === "true"}
          onChange={(e) => onChange(e.target.checked)}
          className={`custom-checkbox__input ${
            checked === "true" ? "custom-checkbox__tick" : ""
          }`}
        />
        {label && <label className="custom-checkbox__label">{label}</label>}
        <div className="custom-checkbox__box" />
        {checked === "true" && (
          <div
            onClick={() => onChange(!checked)}
            className="custom-checkbox__tick"
          >
          </div>
        )}
      </div>{" "}
    </div>
  );
};

export default Checkbox;
