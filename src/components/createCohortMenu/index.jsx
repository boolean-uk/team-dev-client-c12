import { useState, useEffect, useRef } from "react";
import useModal from "../../hooks/useModal";
import Button from "../button";
import { createCohort } from "../../service/apiClient";
import AddStudentsToCohort from "./step2";
import './style.css';

const AddCohortMenu = ({closeMenu}) => {
    const { closeModal } = useModal()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [cohortName, setCohortName] = useState('')
    const [course, setCourse] = useState('')
    const [message, setMessage] = useState(null)
    const [cohortData, setCohortData] = useState(null)
    const [currentStep, setCurrentStep] = useState(1)
    const menuRef = useRef(null);

    const onEnterCohortName = (e) => {
        setCohortName(e.target.value)
    }

    const onSelectCourse = (e) => {
        setCourse(e.target.value)
    }

    const onSetStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const onSetEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const onSubmit = async () => {
        if (!cohortName || !course) {
            setMessage('Cohort name and Course must be provided in order to add a new cohort')
        }
        const data = { cohortName, course, startDate, endDate }
        setCohortData(data)
        setCurrentStep(2)
    }

    return (
        <>
            <main className="add-cohort-menu-container">
                <div className="add-cohort-contents">
                    <div className="top-title">
                        <h3>Add cohort</h3>
                        <p>Create a new cohort</p>
                    </div>

                    <section>
                        <label>
                            Cohort Name*: 
                            <input
                                type="text"
                                value={cohortName}
                                onChange={onEnterCohortName}
                                placeholder=" Enter cohort name"
                            />
                        </label>
                    </section>

                    <section>
                        <label>
                            Course*:
                            <select value={course} onChange={onSelectCourse}>
                                <option value=""> Select a course</option>
                                <option value="SoftwareDev">Software Development</option>
                                <option value="FrontEndDev">Front-end Development</option>
                                <option value="DataAnalytics">Data Analytics</option>
                            </select>
                        </label>
                    </section>

                    <section>
                        <label>
                            Start Date: 
                            <input
                                type="date"
                                value={startDate}
                                onChange={onSetStartDate}
                            />
                        </label>
                    </section>

                    <section>
                        <label>
                            End Date:
                            <input
                                type="date"
                                value={endDate}
                                onChange={onSetEndDate}
                            />
                        </label>
                    </section>

                    <div className="footnote">
                        <p>*Required</p>
                    </div>

                    <div className="buttons">
                        <div className='cancel-button'>
                            <Button  text='Cancel' onClick={closeMenu}/>                            
                        </div>
                        <div className='next-button'>
                            <Button text='Next' onClick={()=>onSubmit()}/>
                        </div>
                    </div>       
                    {message && <p>{message}</p>}
                </div>
            </main>
            {currentStep === 2 && <AddStudentsToCohort cohortData={cohortData} />}
        </>
    )    
}

export default AddCohortMenu