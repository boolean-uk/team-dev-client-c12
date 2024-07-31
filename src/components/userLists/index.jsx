import "./style.css";
import ProfileCircle from "../profileCircle/index.jsx";
import Card from "../card/index.jsx";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import SimpleThreeDotsMenu from "../simpleThreeDotsMenu/index.jsx";
import useUser from "../../hooks/useUser.jsx";
import ThreeDotsMenu from "../threeDotsMenu/index.jsx"
import { useEffect, useRef } from "react";
import Button from "../button/index.jsx";

const UserLists = ({ results, name }) => {
  const { currentUser } = useUser()
  const menuRef = useRef(null);
  const navigate = useNavigate()

    const getInitials = (firstName, lastName) => {
    const firstInitial = firstName ? firstName[0].toUpperCase() : "";
    const lastInitial = lastName ? lastName[0].toUpperCase() : "";
    return [firstInitial, lastInitial];
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.link-to-profile')) {
      setSelectedProfileId(null);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const onClickMenu = (id, event) => {
    event.stopPropagation();
    setSelectedProfileId(prevId => (prevId === id ? null : id));
  };

  const renderTeacherContent = (user) => (
    <>
      <div className='teacher-links'>
        <NavLink to='/'><span>Profile</span></NavLink>
        <NavLink to='/'><span>Add Note</span></NavLink>
        <NavLink to='/'><span>Move to Cohort</span></NavLink>
      </div>
      <div className='search-three-dots-menu'>
        <ThreeDotsMenu onClick={() => onClickMenu(user.id)} id={user.id} hasCascadingMenu={true} />
      </div>
    </>
  );

  const renderStudentContent = (user) => (
    <>
    {name !== 'cohorts' || name !== 'students' && (
      <div className='found-user-profile-link'>
      <NavLink to='/'><p>Profile</p></NavLink>
    </div>
    )}
    <div className='search-three-dots-menu'>
      <SimpleThreeDotsMenu onClick={() => onClickMenu(user.id)} id={user.id} hasCascadingMenu={true}/>
    </div>
    </>
  );

  const onClick = () => {
    navigate('/students', { state: { results: results } })
  }

  const renderButton = () => {
    if (
      location.pathname !== "/students" ||
      results.length > 10
    ) {
      <div className="button-container">
        {console.log('true')}
        <Button 
          text={"All students"}
          classes="green width-full"
          onClick={onClick}
        />
      </div>
    }
  }
  console.log(results)

  console.log(location)
  return (
    <Card name={name}>
      {results?.length === 0 && <p>No results found.</p>}
      {results?.length > 0 && (
        <ul className="search-results-list">
          {results.map((user) => (
            <li key={user.id} className="found-user-card">
              <ProfileCircle
                initials={getInitials(user.firstName, user.lastName)}
                hasCascadingMenu={false}
              />

              <div className='found-user-details'>
                <span>{`${user.firstName} ${user.lastName}`}</span>
                <p>{`Software Developer, Cohort ${user.cohortId}`}</p>
              </div>
                {name === 'searchResults' && currentUser.role === 'TEACHER'
                  ? renderTeacherContent(user)
                  : renderStudentContent(user)}
            </li>
          ))}
          {renderButton}
        </ul>
      )}
    </Card>
  );
};

export default UserLists;
