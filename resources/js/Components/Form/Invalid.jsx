export default function Invalid({
    message,
    className = "",
    children,
    ...props
}) {
    return message ? (
        <div {...props} className={`invalid-feedback ${className}`}>
            {message}
        </div>
    ) : (
        <div className="text-sm text-muted">{children}</div>
    );
}
