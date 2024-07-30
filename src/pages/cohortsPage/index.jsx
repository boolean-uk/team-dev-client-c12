import { useLocation, Link, NavLink } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getUsers } from '../../service/apiClient';
import { getCohorts, createCohort } from '../../service/apiClient';
import useUser from '../../hooks/useUser';
import Header from '../../components/header';
import Navigation from '../../components/navigation';
import Button from '../../components/button';
import useModal from '../../hooks/useModal'
import Card from '../../components/card';
import './style.css';

const Cohorts = () => {
    const { currentUser } = useUser()
    const [cohorts, setCohorts] = useState()

    useEffect(() => {
        getCohorts()
        window.scrollTo(0,0)
    }, [])

    const showModal = () => {
        setModal('Create a post', <CreatePostModal />)
        openModal()
  }



    return (
        <>
            <div className='cohorts-page-container' >
                <Header className='cohorts-page-header' />
                <Navigation className='cohorts-page-left-bar' />
                <main className='cohorts-container'>
                    <div className='cohorts-list-top'>
                        <h2>Cohorts</h2>
                        
                    </div>
                </main>
            </div>

        </>
    )
}

export default Cohorts