import Card from "../../components/card";
import ProfilePageInfoPane from "../../components/ProfilePageInfoPane";
import ProfileCircle from "../../components/profileCircle";
import "./profile.css";
import { patch } from "../../service/apiClient";
import { getUser } from "../../service/apiClient";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useUser from "../../hooks/useUser";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    githubUsername: "",
    role: "",
    cohortId: "",
    email: "",
    bio: ""
  });
  const [renderedUser, setRenderedUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    githubUsername: "",
    role: "",
    cohortId: "",
    email: "",
    bio: ""
  })

  const [editMode, setEditMode] = useState(false)

  const { id } = useParams();
  const { currentUser } = useUser()
  
  const stringToTitleCase = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(id);
      const { user } = response.data;
      setRenderedUser(user)
      setFormData(user);
      if(currentUser?.id === Number(id) || currentUser?.role === 'TEACHER') {
        setEditMode(true)
      }
    };
    fetchUser();
  }, [id, currentUser]);

  const handleSubmit = async (e) => {

    const response = await patch(`users/${id}`, formData)

    console.log(response)
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  };

  let initials = [renderedUser.firstName[0], renderedUser.lastName[0]]
  let name = renderedUser.firstName + ' ' + renderedUser.lastName

  const labelMap = {
    cohortId: "Cohort ID",
    role: "Role",
    email: "Email",
    firstName: "First Name",
    lastName: "Last Name",
    bio: "Bio",
    githubUsername: "GitHub Username",
  };

  return (
    <main>
      <h2>Profile</h2>
      <Card>
        <div className="user-detail-card">
        <ProfileCircle initials={initials}/>
        <section>
          <p className="profile-user-name"><strong>{name}</strong></p>
          <small>{stringToTitleCase(renderedUser.role)}</small>
        </section>
        </div>
        <ProfilePageInfoPane handleChange={handleChange} handleSubmit={handleSubmit} editMode={editMode} formData={formData}/>
      </Card>
    </main>
  );
};

export default Profile;
