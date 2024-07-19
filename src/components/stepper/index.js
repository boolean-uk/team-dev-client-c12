import Steps from "./steps";
import Card from "../card";
import Button from "../button";
import "./style.css";
import { useState } from "react";

const Stepper = ({ header, children, onComplete, canProgress = true }) => {
    const [currentStep, setCurrentStep] = useState(0)

    const onBackClick = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep-1)
        }
    }

    const onNextClick = () => {
        if (!canProgress) {
            return
        }
        
        if (currentStep === children.length-1) {
            onComplete()
            return
        }

        setCurrentStep(currentStep+1)
    }

    const btnText = currentStep === children.length-1 ? 'Create profile' : 'Next'

	return (
        <Card>
            {header}
            <div className="steps-container">
                <Steps maxSteps={children.length} currentStep={currentStep} />
            </div>

            {children[currentStep]}

            <div className="stepper-buttons">
                {currentStep > 0 && 
                    <Button text="Back" classes="offwhite back" onClick={onBackClick} />
                }
                <div className="next">
                    <Button text={btnText} classes="blue" onClick={onNextClick} />
                </div>
            </div>
        </Card>
	);
};

export default Stepper;
