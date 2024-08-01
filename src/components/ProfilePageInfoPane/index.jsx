import TextInput from "../../components/form/textInput";
import Form from "../../components/form";
import Button from "../button";
import "./style.css";

const ProfilePageInfoPane = ({ editMode, handleChange, handleSubmit, formData }) => {
  const labelMap = {
    cohortId: "Cohort ID",
    role: "Role",
    email: "Email",
    firstName: "First Name",
    lastName: "Last Name",
    bio: "Bio",
    githubUsername: "GitHub Username",
  };

  if (editMode) {
    return (<Form className="user-details-form" onSubmit={handleSubmit}>
      {Object.keys(formData).map((input, index) => {
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
              key={index + 'profileUpdateForm'}
              name={input}
              label={labelMap[input]}
              value={formData[input]}
            />
          );
        })}

        <Button classes="submit-button" text="Update" type="submit"/>
    </Form>)
  }


 return (<ul className="uneditable-user-data">
      {Object.keys(formData).map((input, index) => {
         if (
            input === "id" ||
            (input === "cohortId" && formData.role === "TEACHER")
          ) {
            return;
          }
          return (
           <li key={index + formData.firstName}>
            <p className="info-label">{labelMap[input]}</p>
            <p className="info-detail">{formData[input]}</p>
           </li>
          );
        })}
 </ul>)
};

export default ProfilePageInfoPane;
