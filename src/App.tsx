import { useState } from "react";
import "./App.scss";
import { FormStepper, IStepProps } from "./components/FormStepper/FormStepper";
import TextArea from "./components/TextArea/TextArea";
import Axios from "axios";
import { Loader } from "./components/Loader/Loader";
import { Toast } from "./components/Toast/Toast"; // Updated import

function App() {
  const [responseObject, setResponseObject] = useState<{
    [key: string]: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setResponseObject((prev) => ({ ...prev, [key]: value }));
  };

  // Example components
  const Step = (key: string, stepData: IStepProps) => (
    <TextArea
      value={responseObject[key] || ""}
      onChange={(val) => handleInputChange(key, val)}
      label={stepData.label}
      placeholder={stepData.placeholder}
    />
  );

  const steps = [
    {
      title: "R&R Event",
      componentToRender: (key: string, stepData: IStepProps) =>
        Step(key, stepData),
      placeholder: "Enter your feedback here",
      label: "How would you rate for the last R&R event on our Team?",
    },
    {
      title: "Food",
      componentToRender: (key: string, stepData: IStepProps) =>
        Step(key, stepData),
      placeholder: "Enter your feedback here",
      label:
        "How satisfied were you with the variety and quality of food provided during the outing?",
    },
    {
      title: "Logistics",
      componentToRender: (key: string, stepData: IStepProps) =>
        Step(key, stepData),
      placeholder: "Enter your feedback here",
      label:
        "Did the logistics (transportation, scheduling, coordination) meet your expectations for the event?",
    },
    {
      title: "Activities",
      componentToRender: (key: string, stepData: IStepProps) =>
        Step(key, stepData),
      placeholder: "Enter your feedback here",
      label:
        "How engaging and enjoyable did you find the activities planned during the outing?",
    },
  ];
  const handleSubmit = () => {
    const hasValue = Object.values(responseObject).some(
      (value) => value.trim() !== ""
    );

    if (!hasValue) {
      setToastMessage("Please enter at least one answer.");
      return;
    }
    setLoading(true);
    Axios.post(
      "https://us-central1-coditas-website.cloudfunctions.net/saveRegistration",
      steps.reduce((acc: any, step: any) => {
        acc[step.title] = responseObject[step.title];
        return acc;
      }, {})
    )
      .then(() => {
        setToastMessage("Saved successfuly!");
      })
      .catch(() => {
        setToastMessage("Something went wrong please try again!");
      })
      .finally(() => {
        setResponseObject({});
        setLoading(false);
      });
  };

  return (
    <>
      {loading && <Loader />}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
      <div className="main-bg">
        <div className="overlay"></div>
        <div className="o2">
          <FormStepper onSubmit={handleSubmit} steps={steps} />
        </div>
      </div>
    </>
  );
}

export default App;
