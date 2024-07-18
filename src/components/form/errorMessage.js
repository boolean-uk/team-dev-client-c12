const ErrorMessage = ({message}) => {
  return (
    <div>
      {message && <p>{message}</p>}
    </div>
  )
}

export default ErrorMessage