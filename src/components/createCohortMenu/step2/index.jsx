import React, { useState, useEffect } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { getUsers } from '../../../service/apiClient';
import Button from '../../button';
import Card from '../../card';
import ProfileCircle from '../../profileCircle';
import CheckCohortToAdd from '../step3';
import './style.css';

const AddStudentsToCohort = ({closeMenu, cohortData }) => {
    const location = useLocation();
    const [currentStep, setCurrentStep] = useState(2)
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [results, setResults] = useState([]);
    const [data, setData] = useState(null)

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
        setData(dataToPass)
        setCurrentStep(3);
    };

    return (
        <div className="add-cohort-menu-container">
            <div className="add-cohort-contents">
                <h3>Add cohort</h3>
                <p>Add students to cohort</p>
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
                <div className='search-results'>
                    <Card className='search-results-card' name="results">
                        {results.length === 0 && (
                        <p>No results found.</p>
                        )}
                        {results.length > 0 && (
                            <ul className='search-results-list'>
                                {results.map((user) => {
                                    const isSelected = selectedStudents.some(student => student.id === user.id);
                                    const listItemClass = isSelected ? 'found-user-card selected' : 'found-user-card';
                                    return (
                                        <li
                                            key={user.id}
                                            className={listItemClass}
                                            onClick={() => onSelectStudent(user)}
                                        >
                                            <ProfileCircle
                                                initials={getInitials(user.firstName, user.lastName)}
                                                hasCascadingMenu={false}
                                            />
                                            <div className='found-user-details'>
                                                <span>{`${user.firstName} ${user.lastName}`}</span>
                                                <p>{`Software Developer, Cohort ${user.cohortId}`}</p>
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
            {currentStep === 3 && data && <CheckCohortToAdd cohortData={data} />}
        </div>
    );
};

export default AddStudentsToCohort;
