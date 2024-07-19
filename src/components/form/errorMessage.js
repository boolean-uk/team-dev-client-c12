const ErrorMessage = ({message}) => {
    return (
      <div className="usermessage">
        {message && <p>{message}</p>}
      </div>
    )
  
}

export default ErrorMessage

