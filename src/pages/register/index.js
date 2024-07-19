import { useState } from "react";
import Button from "../../components/button";
import TextInput from "../../components/form/textInput";
import useAuth from "../../hooks/useAuth";
import CredentialsCard from "../../components/credentials";
import "./register.css";

const Register = () => {
    const { onRegister } = useAuth();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [serverError, setServerError] = useState("");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const onChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setEmailError("");
        setPasswordError("");
        setServerError("");

        let isValid = true;

        if (formData.email.trim() === "") {
            setEmailError("Email is required.");
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            setEmailError("Email address must be in a valid format.");
            isValid = false;
        }

        if (formData.password.trim() === "") {
            setPasswordError("Password is required.");
            isValid = false;
        } else if (!validatePassword(formData.password)) {
            setPasswordError("Password must contain at least one uppercase letter, one number, one special character and be at least 8 characters long.");
            isValid = false;
        }

        if (isValid) {
            try {
                const response = await onRegister(formData.email, formData.password);
                if (response.status !== 201) {
                    setServerError(response.message || "An error occurred. Please try again later.");
                }
            } catch (error) {
                setServerError("An error occurred. Please try again later.");
            }
        }
    };

    return (
        <div className="bg-blue register credentialpage">
            <CredentialsCard
                title="Register"
                socialLinksTitle="Or sign up with"
                altButtonTitle="Already a user?"
                altButtonLink="/login"
                altButtonText="Log in"
            >
                <div className="register-form">
                    <form onSubmit={handleSubmit}>
                        <TextInput
                            value={formData.email}
                            onChange={onChange}
                            type="email"
                            name="email"
                            label="Email *"
                        />
                        <div className="error">{emailError}</div>
                        <TextInput
                            value={formData.password}
                            onChange={onChange}
                            name="password"
                            label="Password *"
                            type="password"
                        />
                        <div className="error">{passwordError}</div>
                        <Button
                            text="Sign up"
                            type="submit"
                            classes="green width-full"
                        />
                        <div className="error">{serverError}</div>
                    </form>
                </div>
            </CredentialsCard>
        </div>
    );
};

export default Register;
