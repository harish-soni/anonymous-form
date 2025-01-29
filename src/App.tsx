import { useState } from "react";
import "./App.scss";
import { FormStepper, IStepProps } from "./components/FormStepper/FormStepper";
import TextArea from "./components/TextArea/TextArea";
import Axios from "axios";
import { Loader } from "./components/Loader/Loader";
import { Toast } from "./components/Toast/Toast"; // Updated import
import Checkbox from "./components/Checkbox/Checkbox";

function App() {
  const [responseObject, setResponseObject] = useState<{
    [key: string]: string;
  }>({});

  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleInputChange = (key: string, value: string) => {
    setResponseObject((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (key: string, value: string) => {
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
      label: "How was the Reward and Recognition ceremony for you? Do you have any suggestions or changes you would like to see specifically for the R&R ceremony?",
      subQues: [
        {
          title: "Preference",
          componentToRender: () => (
            <div className="custom-checkbox-container">

              <label className="custom-textarea__label">{'What would you prefer for next outing?'}</label>

              <div className="flex">

                <Checkbox
                  checked={responseObject["Day Outing"]}
                  label="Day Outing"
                  onChange={(e) =>
                    handleCheckboxChange("Day Outing", e.toString())
                  }
                />
                <Checkbox
                  checked={responseObject["Night Stay"]}
                  label="Night Stay"
                  onChange={(e) =>
                    handleCheckboxChange("Night Stay", e.toString())
                  }
                />
              </div>            </div>
          ),
          placeholder: "Enter your feedback here",
          label: "What would you prefer?",
        },
      ],
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
      title: "Venue",
      componentToRender: (key: string, stepData: IStepProps) =>
        Step(key, stepData),
      placeholder: "Enter your feedback here",
      label:
        "Was the venue suitable for the event in terms of location, and ambiance?",
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
      responseObject
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
