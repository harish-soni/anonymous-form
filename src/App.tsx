import { useState } from "react";
import "./App.scss";
import { FormStepper, IStepProps } from "./components/FormStepper/FormStepper";
import TextArea from "./components/TextArea/TextArea";

function App() {
  const [responseObject, setResponseObject] = useState<{
    [key: string]: string;
  }>({});

  const handleInputChange = (key: string, value: string) => {
    setResponseObject((prev) => ({ ...prev, [key]: value }));
  };

  // Example components
  const Step1 = (key: string, stepData: IStepProps) => (
    <TextArea
      value={responseObject[key] || ""}
      onChange={(val) => handleInputChange(key, val)}
      label={stepData.label}
      placeholder={stepData.placeholder}
    />
  );
  const Step2 = (key: string, stepData: IStepProps) => {
    return (
      <TextArea
        value={responseObject[key] || ""}
        onChange={(val) => handleInputChange(key, val)}
        label={stepData.label}
        placeholder={stepData.placeholder}
      />
    );
  };
  const Step3 = (key: string, stepData: IStepProps) => (
    <TextArea
      value={responseObject[key] || ""}
      onChange={(val) => handleInputChange(key, val)}
      label={stepData.label}
      placeholder={stepData.placeholder}
    />
  );

  const steps = [
    {
      title: "Personal Info",
      componentToRender: Step1,
      placeholder: "Your Personal Info",
      label: "Your Personal Info",
    },
    {
      title: "Contact Details",
      componentToRender: Step2,
      placeholder: "Contact Details",
      label: "Contact Details",
    },
    {
      title: "Security",
      componentToRender: Step3,
      placeholder: "Security",
      label: "Security",
    },
  ];
  return (
    <>
      <div className="main-bg">
        <div className="overlay"></div>
        <div className="o2">
          <FormStepper steps={steps} />
        </div>
      </div>
    </>
  );
}

export default App;
