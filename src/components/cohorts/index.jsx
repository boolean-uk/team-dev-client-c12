import { useEffect, useState } from "react"
import { getCohorts } from "../../service/apiClient"
import Card from "../card"
import { CohortProfileCircle } from "../profileCircle"

const Cohorts = () => {
    const [cohorts, setCohorts] = useState([])
    useEffect(() => {
        getCohorts().then(setCohorts)
    }, [])

    return (
        <Card name="cohorts">
            {cohorts.length === 0 && (
                <p>No cohorts found.</p>
            )}
            {cohorts.length > 0 && (
                <ul className="search-results-list">
                    {cohorts.map((cohort) => (
                        <li key={cohort.id} className="found-user-card">
                            <CohortProfileCircle background='#64DC78'/>
                            <div className="found-user-details">
                                <span>{`${cohort.name}`}</span>
                                <p>{`Cohort ${cohort.id}`}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </Card>
    )
}

export default Cohorts