import useUser from '../../hooks/useUser'

export default function UserDetails({ header = false }) {
    const { currentUser } = useUser()

    if (!currentUser || !currentUser?.firstName) {
        return <div className="post-user-name"></div>
    }

    const userCohort = currentUser?.cohortId ? `, Cohort ${currentUser.cohortId}` : ''

    const userFullName = `${currentUser?.firstName} ${currentUser?.lastName}`
    
    const stringToTitleCase = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

    if (header) {        
        return (
            <div className="post-user-name">
                <p>{userFullName}</p>
                <small>
                    {stringToTitleCase(currentUser.role)}{userCohort}
                </small>
            </div>
        )
    }

    const userFirstNameAndInital = `${currentUser?.firstName} ${currentUser?.lastName[0]}`

    return (
        <div className="post-user-name">
            <p>{userFirstNameAndInital}</p>
        </div>
    )
}
