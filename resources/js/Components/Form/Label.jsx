export default function Label({ value, className = "", children, ...props }) {
    return (
        <label {...props} className={`form-label ${className}`}>
            {value ? value : children}
        </label>
    );
}
