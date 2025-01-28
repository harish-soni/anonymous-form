import { useState } from "react";
import "./FormStepper.scss";
import BorderAnimation from "../BorderAnimation/BorderAnimation";

export interface IStepProps {
  placeholder: string;
  label: string;
  subQues?: Step[];
}

interface Step extends IStepProps {
  title: string;
  componentToRender: (key: string, step: IStepProps) => JSX.Element;
}

interface FormStepperProps {
  onSubmit: () => void;
  steps: Step[];
}

export const FormStepper = ({ steps, onSubmit }: FormStepperProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    if (activeIndex < steps.length - 1) {
      setActiveIndex((prev) => prev + 1);
      return;
    }
    if (activeIndex === steps.length - 1) {
      onSubmit();
    }
  };

  const handlePrevious = () => {
    if (activeIndex > 0) {
      setActiveIndex((prev) => prev - 1);
    }
  };

  const ActiveComponent = steps[activeIndex].componentToRender;
  const SubQues = steps[activeIndex].subQues;
  const activeTitle = steps[activeIndex].title;

  return (
    <div className="form-stepper form-stepper--shadow">
      <div className="form-stepper__heading">
        <h1 className="form-stepper__h1">Bcz Feedback Matters</h1>
      </div>
      <div className="form-stepper form-stepper__form">
        <div className="form-stepper__titles">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`form-stepper__title`}
              onClick={() => setActiveIndex(index)}
            >
              <BorderAnimation active={index === activeIndex}>
                {step.title}
              </BorderAnimation>
            </div>
          ))}
        </div>

        <div className="form-stepper__content">
          <div className="form-stepper__component desktop">
            {ActiveComponent(activeTitle, steps[activeIndex])}
            {SubQues &&
              SubQues.map((subQues) =>
                subQues.componentToRender(activeTitle, steps[activeIndex])
              )}
          </div>
          <div className="form-stepper__component mobile">
            {steps.map((step) => {
              return <>
                {ActiveComponent(step.title, step)}
                {step?.subQues?.map((subQues) =>
                  subQues.componentToRender(activeTitle, steps[activeIndex])
                )}
                    </>
            })}
          </div>

          <div className="form-stepper__navigation">
            <button
              onClick={handlePrevious}
              disabled={activeIndex === 0}
              className="form-stepper__button"
            >
              Previous
            </button>
            <button onClick={handleNext} className="form-stepper__button">
              {steps.length - 1 === activeIndex ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
