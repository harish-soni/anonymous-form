import React from "react";
import "./TextArea.scss";

interface TextAreaProps {
  label?: string;
  value?: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ label, ...props }) => {
  return (
    <div className="custom-textarea">
      {label && <label className="custom-textarea__label">{label}</label>}
      <div className="custom-textarea__wrapper">
        <textarea
          value={props.value}
          placeholder={props.placeholder}
          rows={3}
          className="custom-textarea__input"
          onChange={(e) => props.onChange(e.target.value)}
        />
        <div className="custom-textarea__border" />
      </div>
    </div>
  );
};

export default TextArea;
