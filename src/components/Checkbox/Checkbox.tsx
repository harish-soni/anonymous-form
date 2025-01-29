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
  onChange,
}) => {
  return (
    <div className="custom-checkbox">
      <div className="flex-center">

        <input
          type="checkbox"
          checked={checked === "true"}
          onChange={(e) => onChange(e.target.checked)}
          className={`custom-checkbox__input ${
            checked === "true" ? "custom-checkbox__tick" : ""
          }`}
        />
        <div className="custom-checkbox__box" />
        {checked === "true" && (
          <div
            onClick={() => onChange(!checked)}
            className="custom-checkbox__tick"
          >
          </div>
        )}
              {label && <label className="custom-checkbox__label">{label}</label>}

      </div>{" "}
    </div>
  );
};

export default Checkbox;
