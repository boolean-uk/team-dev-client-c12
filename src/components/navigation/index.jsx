import { NavLink, useLocation } from 'react-router-dom'
import CohortIcon from '../../assets/icons/cohortIcon'
import HomeIcon from '../../assets/icons/homeIcon'
import ProfileIcon from '../../assets/icons/profileIcon'
import ExercisesIcon from '../../assets/icons/exercisesIcon'
import LogsIcon from '../../assets/icons/logsIcon'
import NotesIcon from '../../assets/icons/notesIcon'
import useAuth from '../../hooks/useAuth'
import useUser from '../../hooks/useUser'
import Cohorts from '../../pages/cohortsPage'
import './style.css'

const Navigation = ({ disabledNav = false }) => {
    const { token } = useAuth()
    const { currentUser } = useUser()    
    const location = useLocation()

    if (!token || !currentUser) {
        return null
    }

    const navIcons = () => {
        const commonIcons = [
            {
                to: "/",
                icon: <HomeIcon colour="#000046" />,
                text: "Home"
            },
            {
                to: "/",
                icon: <ProfileIcon />,
                text: "Profile"
            },
            {
                to: "/cohorts",
                icon: <CohortIcon />,
                text: "Cohort"
            },
            {
                to: '/',
                icon: <ExercisesIcon />,
                text: 'Exercises'
            }
        ]

        const teacherIcons = [
            ...commonIcons,
            {
                to: "/",
                icon: <NotesIcon />,
                text: "Notes"
            },
            {
                to: "/",
                icon: <LogsIcon />,
                text: "Logs"
            }
        ]
        const iconsToShow = currentUser.role === 'TEACHER' ? teacherIcons : commonIcons

        return iconsToShow.map((icon, index) => (
            <li key={index}>
                <NavLink to={disabledNav ? location.pathname : icon.to} end={disabledNav}>
                    {icon.icon}
                    <p>{icon.text}</p>
                </NavLink>
            </li>
        ))
    }

    return (
        <nav>
            <ul>
                {navIcons()}
            </ul>
        </nav>
    )
}

export default Navigation