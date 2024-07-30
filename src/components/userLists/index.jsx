import "./style.css";
import "../../pages/allSearchResults/style.css";
import ProfileCircle from "../profileCircle/index.jsx";
import Card from "../card/index.jsx";
import EllipsisIcon from "../../assets/icons/ellipsisIcon.jsx";
import { useState } from "react";

const UserLists = ({ results }) => {

    const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return [firstInitial, lastInitial];
  };

  const onClickStudent = (id) => {
    setSelectedProfileId(id);
    setIsStudentModalVisible(true);
  };

  return (
    <Card className="search-results-card" name="results">
      {results?.length === 0 && <p>No results found.</p>}
      {results?.length > 0 && (
        <ul className="search-results-list">
          {results.map((user) => (
            <li key={user.id} className="found-user-card">
              <ProfileCircle
                initials={getInitials(user.firstName, user.lastName)}
                hasCascadingMenu={false}
              />

              <div className="found-user-details">
                <span>{`${user.firstName} ${user.lastName}`}</span>
                <p>Software Developer</p>
              </div>

              <div>
                <p>Profile</p>
              </div>

              <figure
                className="link-to-profile"
                onClick={() => onClickStudent(cohort.id)}
              >
                <EllipsisIcon />
              </figure>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};

export default UserLists;
