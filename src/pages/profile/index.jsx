import Card from "../../components/card";
import UserDetails from "../../components/UserDetails";
import UserProfileIcon from "../../components/UserProfileIcon";
import TextInput from "../../components/form/textInput";
import Form from "../../components/form";
import "./profile.css";
import useUser from "../../hooks/useUser";
import { useState, useEffect } from "react";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    githubUsername: "",
    role: "",
    cohortId: "",
    email: "",
    bio: "",
  });

  const { currentUser } = useUser();

  useEffect(() => {
    setFormData(currentUser);
  }, [currentUser]);

  const handleSubmit = (e) => {};

  const handleChange = (e) => {};

  const labelMap = {
    cohortId: 'Cohort ID',
    role: 'Role',
    email: 'Email',
    firstName: 'First Name',
    lastName: 'Last Name',
    bio: 'Bio',
    githubUsername: 'GitHub Username',
  }

  return (
    <main>
      <h2>Profile</h2>
      <Card>
        <div className="user-detail-card">
          <UserProfileIcon />
          <UserDetails header={true} />
        </div>
        <Form className="user-details-form" onSubmit={handleSubmit}>
          {formData &&
            Object.keys(formData).map((input, index) => {
              if (input === "id") {
                return;
              }
              return (
                <TextInput
                  onChange={handleChange}
                  className="profile-input"
                  key={index}
                  name={input}
                  label={labelMap[input]}
                  value={formData[input]}
                />
              );
            })}
  
        </Form>
      </Card>
    </main>
  );
};

export default Profile;
