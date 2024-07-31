import Card from "../../components/card";
import UserDetails from "../../components/UserDetails";
import UserProfileIcon from "../../components/UserProfileIcon";
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
          <UserProfileIcon />
          <UserDetails header={true} />
        </div>
        <Form className="user-details-form" onSubmit={handleSubmit}>
          {formData &&
            Object.keys(formData).map((input, index) => {
              console.log(formData.role);
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
