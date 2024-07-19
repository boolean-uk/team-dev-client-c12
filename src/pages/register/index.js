import { useState } from "react";
import Button from "../../components/button";
import TextInput from "../../components/form/textInput";
import useAuth from "../../hooks/useAuth";
import CredentialsCard from "../../components/credentials";
import "./register.css";
import ErrorMessage from "../../components/form/errorMessage";

const Register = () => {
	const { onRegister } = useAuth();
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState('')
 
	const onChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		setErrors('')
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
					<form>
						<TextInput
							value={formData.email}
							onChange={onChange}
                            type="email"
							name="email"
							label={"Email *"}
						/>
						<TextInput
							value={formData.password}
							onChange={onChange}
							name="password"
							label={"Password *"}
							type={"password"}
						/>
						<ErrorMessage message= {errors}/>
					</form>
					
					<Button
						text="Sign up"
						onClick={() => onRegister(formData.email, formData.password, setErrors)}
						classes="green width-full"
					/>
				</div>
			</CredentialsCard>
		</div>
	);
};

export default Register;
