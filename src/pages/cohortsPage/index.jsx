import { useLocation, Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getUsers } from '../../service/apiClient';
import { getCohorts, createCohort } from '../../service/apiClient';
import useUser from '../../hooks/useUser';
import Header from '../../components/header';
import Navigation from '../../components/navigation';
import Button from '../../components/button'
import AddCohortMenu from '../../components/createCohortMenu';
import Card from '../../components/card';
import CohortIcon from '../../assets/icons/cohortIcon';
import './style.css';

const Cohorts = () => {
    const { currentUser } = useUser()
    const menuRef = useRef(null);
    const [cohorts, setCohorts] = useState([])
    const [addCohortMenu, setAddCohortMenu] = useState(false)
    
    useEffect(() => {
        getCohorts().then(setCohorts)
        window.scrollTo(0,0)
    }, [])

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setAddCohortMenu(false);
        }
    };
    
    useEffect(() => {
        if (addCohortMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [addCohortMenu]);

    return (
        <>
            <div className='cohorts-page-container' >
                <Header className='cohorts-page-header' />
                <Navigation className='cohorts-page-left-bar' />
                <main className='cohorts-container'>
                    <div className='cohorts-list-top'>
                        <h2>Cohorts</h2>
                        <Button className='add-cohort-button' text="Add cohort" onClick={() => setAddCohortMenu(true)} />                        
                    </div>
                    {addCohortMenu && (
                        <div className='add-cohort-menu-container'>
                            <div ref={menuRef}>
                                <AddCohortMenu closeMenu={() => setAddCohortMenu(false)} />
                            </div>
                        </div>
                    )}
                    <div className='all-cohorts'>
                        <Card className='all-cohorts-card' name='Cohorts' >
                            {cohorts.length === 0 && (
                                <p>There are no cohorts to display</p>
                            )}
                            {cohorts.length > 0 && (
                                <ul className='all-cohorts-list'>
                                    {cohorts.map((cohort) => (
                                        <li key={cohort.id} className='cohort-card'>
                                            <CohortIcon/>
                                            <p>{cohort.id }</p>
                                            <p>Start Date:{cohort.startDate }</p>
                                            <p>End Date:{cohort.endDate }</p>
                                        </li>
                                    ))}
                                </ul>                                
                            )}
                        </Card>
                    </div>
                </main>
            </div>
        </>
    )
}

export default Cohorts