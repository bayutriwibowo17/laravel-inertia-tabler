export default function Button({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={`btn ${disabled && "disabled"} ${className}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
