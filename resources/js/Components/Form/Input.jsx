import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function FormInput(
    {
        error = false,
        type = "text",
        className = "",
        isFocused = false,
        ...props
    },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={`form-control ${error ? "is-invalid" : ""}${className}`}
            ref={input}
        />
    );
});
