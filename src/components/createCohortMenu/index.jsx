import { useState } from "react";
import useModal from "../../hooks/useModal";
import UserDetails from "../UserDetails";
import Button from "../button";
import { createCohort } from "../../service/apiClient";
import './style.css';

const AddCohortMenu = () => {
    const { closeModal } = useModal()
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [cohortName, setCohortName] = useState('')
    const [course, setCourse] = useState('')
    const [message, setMessage] = useState(null)

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
        const cohortData = { cohortName, course, startDate, endDate }
        const res = await createCohort(cohortData)

        if (!cohortName || !course) {
            setMessage('Cohort name and Course must be provided in order to add a new cohort')
        }

        if (res.status === 'success') {
            setMessage(`Cohort ${cohortName} is being created`)
            setTimeout(() => {
                setMessage(null)
                closeModal()
            },2000)
        } else {
            setMessage('Failed to create new cohortData. Please try again')
        }
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
                        <Button/>
                        <Button/>
                    </div>                                          
                </div>
            </main>
        </>
    )    
}

export default AddCohortMenu