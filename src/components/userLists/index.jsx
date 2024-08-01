import "./style.css";
import Card from "../card/index.jsx";
import { NavLink, useNavigate } from "react-router-dom";
import SimpleThreeDotsMenu from "../simpleThreeDotsMenu/index.jsx";
import useUser from "../../hooks/useUser.jsx";
import ThreeDotsMenu from "../threeDotsMenu/index.jsx";
import { useEffect, useRef } from "react";
import Button from "../button/index.jsx";
import ListItem from "./listItem.jsx";

const UserLists = ({ results, name }) => {
  const { currentUser } = useUser();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return [firstInitial, lastInitial];
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      !event.target.closest(".link-to-profile")
    ) {
      setSelectedProfileId(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const onClickMenu = (id, event) => {
    event.stopPropagation();
    setSelectedProfileId((prevId) => (prevId === id ? null : id));
  };

  const renderTeacherContent = (user) => (
    <>
      
      <div className="teacher-links">
        <NavLink to="/">
          <span>Profile</span>
        </NavLink>
        <NavLink to="/">
          <span>Add Note</span>
        </NavLink>
        <NavLink to="/">
          <span>Move to Cohort</span>
        </NavLink>
      </div>
      <div className="search-three-dots-menu">
        <ThreeDotsMenu
          onClick={() => onClickMenu(user.id)}
          id={user.id}
          hasCascadingMenu={true}
        />
      </div>
    </>
  );

  const renderStudentContent = (user) => (
    <>
      {name !== "cohorts" ||
        (name !== "students" && (
          <div className="found-user-profile-link">
            <NavLink to="/">
              <p>Profile</p>
            </NavLink>
          </div>
        ))}
      <div className="search-three-dots-menu">
        <SimpleThreeDotsMenu
          onClick={() => onClickMenu(user.id)}
          id={user.id}
          hasCascadingMenu={true}
        />
      </div>
    </>
  );

  const onClick = () => {
    const students = results;
    navigate("/students", { state: { results: students } });
  };

  return (
    <Card name={name}>
      {results?.length === 0 && <p>No results found.</p>}
      {results?.length > 0 && (
        <ul className="search-results-list">
          {location.pathname !== "/students"
            ? results.filter((user, index) => index < 10).map((user) => (
                <ListItem 
                  user={user}
                  getInitials={getInitials}
                  currentUser={currentUser}renderStudentContent={renderStudentContent}  renderTeacherContent={renderTeacherContent}
                  name={name}
                />
              ))
            : results.map((user) => (
              <ListItem 
                user={user}
                getInitials={getInitials}
                currentUser={currentUser}
                renderStudentContent={renderStudentContent} renderTeacherContent={renderTeacherContent}
                name={name}
              />
          ))}
          {results.length > 10 && location.pathname !== "/students" && (
            <div className="button-container">
              <Button
                text={"All students"}
                classes="green width-full"
                onClick={onClick}
              />
            </div>
          )}
        </ul>
      )}
    </Card>
  );
};

export default UserLists;
