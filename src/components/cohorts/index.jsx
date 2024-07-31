import { useEffect, useState } from "react"
import { getCohorts } from "../../service/apiClient"
import Card from "../card"
import ProfileCircle, { CascadingMenu } from "../profileCircle"

const Cohorts = () => {
    const [cohorts, setCohorts] = useState([])
    useEffect(() => {
        getCohorts().then(setCohorts)
    }, [])
    console.log(cohorts)

    return (
        <Card name="cohorts">
            {cohorts.length === 0 && (
                <p>No cohorts found.</p>
            )}
            {cohorts.length > 0 && (
                <ul className="search-results-list">
                    {cohorts.map((cohort) => (
                        <li key={cohort.id}>
                            
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