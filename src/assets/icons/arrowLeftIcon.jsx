const ArrowLeftIcon = ({onClick = null}) => {
    return (
        <svg
            width="2.1rem"
            height="2.3rem"
            viewBox="0 0 20 20"
            fill="#64648c"
            xmlns="http://www.w3.org/2000/svg"
            onClick={onClick}
        >
            <path d="M1.328 10 8.203 3.125l0.829 0.828L3.57 9.414H18.672v1.172H3.57l5.463 5.463L8.203 16.875Z" />
        </svg>
    )
}

export default ArrowLeftIcon