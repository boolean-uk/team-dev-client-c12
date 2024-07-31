import { useLocation } from "react-router-dom"
import UserLists from "../../components/userLists"
import { useState } from "react"

const Students = () => {
    const location = useLocation()
    const { results: studentsState} = location.state || { results: []}
    const [students, setStudents] = useState(studentsState)
    return (
        <UserLists results={ students }/>
    )
}

export default Students