import React from 'react'

const StudentsCard = ({ cohort }) => {
  return (
    <div className="card-container">
      <div className="card">
        <h2>{cohort.id}</h2>
        <p>Start Date: {cohort.startDate}</p>
        <p>End Date: {cohort.endDate}</p>
      </div>
    </div>
  )
}

export default StudentsCard
