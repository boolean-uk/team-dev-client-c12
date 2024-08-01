import { useLocation } from "react-router-dom"
import UserLists from "../../components/userLists"
import { useState } from "react"
import Header from "../../components/header"
import Navigation from "../../components/navigation"
import './style.css'

const Students = () => {
    const location = useLocation()
    const { results: studentsState} = location.state || { results: []}
    const [students, setStudents] = useState(studentsState)
    return (
        <div className="students-page-container">
            <Header className='students-header'/>
            <Navigation className="left-bar" />
            <main className="students-main">
                <div className="top">
                    <h2>Students</h2>
                </div>
                <div className="students">
                    <UserLists results={ students }/>
                </div>
            </main>
        </div>
        
    )
}

export default Students