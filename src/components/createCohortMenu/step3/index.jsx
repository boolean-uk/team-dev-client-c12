import React, { useState, useEffect } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { getUsers } from '../../../service/apiClient';
import Button from '../../button';
import Card from '../../card';
import ProfileCircle from '../../profileCircle';
import './style.css';

const CheckCohortToAdd = ({ cohortData }) => {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(3)
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        getUsers() 
    }, []);

    const onBackClick = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep-1)
        }
    }

    const onChange = async (e) => {
        const searchValue = e.target.value;
        setSearchVal(searchValue);

        try {
            const allUsers = await getUsers();
            const filteredResults = allUsers.filter((user) => {
                if (user.firstName && user.lastName) {
                    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
                    return fullName.includes(searchValue.toLowerCase());
                }
            return false;
        });
            setResults(filteredResults);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const newCohort = cohortData
    const studentsInCohort = cohortData.selectedStudents
    
    const getInitials = (firstName, lastName) => {
        const firstInitial = firstName ? firstName.charAt(0).toUpperCase() : '';
        const secondInitial = lastName ? lastName.charAt(0).toUpperCase() : '';
        return [firstInitial, secondInitial];
    };

    const onSelectStudent = (user) => {
        setSelectedStudents((prevSelectedStudents) => {
            const isSelected = prevSelectedStudents.find(student => student.id === user.id);
            if (isSelected) {
                return prevSelectedStudents.filter(student => student.id !== user.id);
            } else {
                return [...prevSelectedStudents, user];
            }
        });
    };

    const onNextClick = () => {
        const dataToPass = {
            ...cohortData,
            selectedStudents
        };
    
    };

    return (
        <div className="add-cohort-menu-container">
            <div className="add-cohort-contents">
                <h3>Add cohort</h3>
                <p>Check details to create new cohort</p>
                <div>
                    <input
                        type="text"
                        placeholder="Search for people"
                        value={searchVal}
                        onChange={onChange}
                    />
                </div>
                <div>
                    <select>
                        {results.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='students-in-cohort'>
                    <Card className='students-in-cohort-card' name="results">
                        {studentsInCohort.length === 0 && (
                        <p>{`There are no students in cohort ${newCohort.name}`}</p>
                        )}
                        {studentsInCohort.length > 0 && (
                            <ul className='students-in-cohort-list'>
                                {studentsInCohort.map((student) => {
                                const isSelected = selectedStudents.some(student => student.id === student.id);
                                const listItemClass = isSelected ? 'student-in-cohort-card selected' : 'student-in-cohort-card';
                                return (
                                    <li
                                        key={student.id}
                                        className={listItemClass}
                                        onClick={() => onSelectStudent(student)}
                                    >
                                        <ProfileCircle
                                            initials={getInitials(student.firstName, student.lastName)}
                                            hasCascadingMenu={false}
                                        />
                                        <div className='found-student-details'>
                                            <span>{`${student.firstName} ${student.lastName}`}</span>
                                            <p>{`Software Developer, Cohort ${student.cohortId}`}</p>
                                        </div>
                                        {isSelected && <span className='checkmark'>✔</span>}
                                    </li>
                                    );
                                })}
                            </ul>
                        )}
                    </Card>
                </div>                  
                <div className="buttons">
                    <div className='cancel-button'>
                        <Button text='Back' onClick={onBackClick} />
                    </div>
                    <div className='next-button'>
                        <Button text='Add students' onClick={onNextClick} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckCohortToAdd;
