import Card from "../../components/card";
import UserDetails from "../../components/UserDetails";
import ProfileCircle from "../../components/profileCircle";
import TextInput from "../../components/form/textInput";
import Form from "../../components/form";
import "./profile.css";
import { getUser } from "../../service/apiClient";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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

  const { id } = useParams();
  const stringToTitleCase = string => string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();


  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUser(id);
      const { user } = response.data;
      setFormData(user);
    };
    fetchUser();
  }, []);


  const handleSubmit = (e) => {};

  const handleChange = (e) => {};

  let initials = [formData.firstName[0], formData.lastName[0]]
  let name = formData.firstName + ' ' + formData.lastName

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
          <small>{stringToTitleCase(formData.role)}</small>
        </section>
        </div>
        <Form className="user-details-form" onSubmit={handleSubmit}>
          {formData &&
            Object.keys(formData).map((input, index) => {
             if (
                input === "id" ||
                (input === "cohortId" && formData.role === "TEACHER")
              ) {
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
