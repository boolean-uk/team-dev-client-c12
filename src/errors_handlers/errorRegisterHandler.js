// To handle errors of register page

export function handleRegistrationError(error) {
  const errorMessage = error.message || "An unknown registration error occurred"

  console.log('Registration error: ', errorMessage)
}