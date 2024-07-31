import React, { useState, useEffect } from 'react';
import Button from '../../button';
import { getUsers } from '../../../service/apiClient';
import ProfileCircle from '../../profileCircle';
import './style.css';

const AddStudentsToCohort = ({ cohortData }) => {
    const [students, setStudents] = useState([]);
    const [searchVal, setSearchVal] = useState('');
    const [results, setResults] = useState([]);

    useEffect(() => {
        getUsers()    
    }, []);

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

    return (
        <div className="add-cohort-menu-container">
            <div className="add-cohort-contents">
                <h3>Add cohort</h3>
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
                <div className="buttons">
                    <div className='cancel-button'>
                        <Button text='Back' onClick={() => setCurrentStep(1)} />
                    </div>
                    <div className='next-button'>
                        <Button text='Add students' onClick={() => console.log('Students added')} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddStudentsToCohort;
