import { createContext, useEffect, useState } from "react";
import { useNavigate, useLocation, Navigate } from "react-router-dom";
import Header from "../components/header";
import Modal from "../components/modal";
import Navigation from "../components/navigation";
import useAuth from "../hooks/useAuth";
import { createProfile, login, register } from "../service/apiClient";
import jwt_decode from "jwt-decode"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [token, setToken] = useState(null)

    useEffect(() => {
        const storedToken = localStorage.getItem('token')

        if (storedToken) {
            setToken(storedToken)
            navigate(location.state?.from?.pathname || "/")
        }
    }, [location.state?.from?.pathname, navigate])

	const handleLogin = async (email, password, setErrors) => {

		const passwordRequirments = 'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.'
		const emailErrorMessage = "Please enter a valid email"

		try {
			const validatedEmail = validationEmail(email)
			if(!validatedEmail) {
				throw new Error(emailErrorMessage)
			}

			const validatedPassword = validationPassword(password)
			if(!validatedPassword) {
				throw new Error(passwordRequirments)
			}
			
			const res = await login(email, password)
			if(!res.status) {
				throw new Error(res.error.message)
			}
        if (!res.data.token) {
            return navigate("/login")
        }

        localStorage.setItem('token', res.data.token)

		setToken(res.data.token)
		navigate(location.state?.from?.pathname || "/")
		} catch (error) {
			setErrors(error.message)
		}
	};

	const handleLogout = () => {
        localStorage.removeItem('token')
		setToken(null)
	};

	const handleRegister = async (email, password, setErrors) => {
		const passwordRequirments = 'Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.'
		const emailErrorMessage = "Please enter a valid email"

		try {
			const validatedEmail = validationEmail(email)
			if(!validatedEmail) {
				throw new Error(emailErrorMessage)
			}
			const validatedPassword = validationPassword(password)
			if(!validatedPassword) {
				throw new Error(passwordRequirments)
			}
			const res = await register(email, password, setErrors)
			if (!res.status) {
				throw new Error(res.error.message)
			}
			setToken(res.data.token)
			navigate("/verification")

		} catch (error) {
			setErrors(error.message)
		}
	}

	const handleCreateProfile = async (firstName, lastName, githubUrl, bio) => {
			const { userId } = jwt_decode(token)

			await createProfile(userId, firstName, lastName, githubUrl, bio)

			// localStorage.setItem('token', token)
			navigate('/')
	}

	const value = {
		token,
		onLogin: handleLogin,
		onLogout: handleLogout,
        onRegister: handleRegister,
        onCreateProfile: handleCreateProfile
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};

const ProtectedRoute = ({ children }) => {
	const { token } = useAuth()
	const location = useLocation()

	if (!token) {
		return <Navigate to={"/login"} replace state={{ from: location }} />
	}

	return (
		<div className="container">
			<Header />
			<Navigation />
            <Modal />
			{children}

		</div>
	)
}
function validationEmail(email) {
	
	const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
	
	return (!email || !pattern.test(email)) ? false : true
}

function validationPassword(password) {
	const minLength = 8
	const hasUppercase = /[A-Z]/.test(password)
	const hasNumber = /\d/.test(password)
	const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password)

	return (password.length < minLength || !hasUppercase || !hasNumber || !hasSpecialCharacter) ? false : true

}


export { AuthContext, AuthProvider, ProtectedRoute }
