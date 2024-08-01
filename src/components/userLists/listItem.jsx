import ProfileCircle from "../profileCircle";

const ListItem = ({ user, getInitials, currentUser, renderTeacherContent, renderStudentContent }) => {
  return (
    <li key={user.id} className="found-user-card">
      <ProfileCircle
        initials={getInitials(user.firstName, user.lastName)}
        hasCascadingMenu={false}
      />

      <div className="found-user-details">
        <span>{`${user.firstName} ${user.lastName}`}</span>
        <p>{`Software Developer, Cohort ${user.cohortId}`}</p>
      </div>
      {name === "searchResults" && currentUser.role === "TEACHER"
        ? renderTeacherContent(user)
        : renderStudentContent(user)}
    </li>
  );
};

export default ListItem
