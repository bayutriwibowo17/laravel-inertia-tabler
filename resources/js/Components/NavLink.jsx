import { Link } from "@inertiajs/react";

export default function NavLink({
    href = "",
    active = false,
    icon = "",
    value = "",
    children,
}) {
    return (
        <>
            <li className={`nav-item ${active ? "active" : ""}`}>
                <Link className="nav-link" href={href}>
                    <span className="nav-link-icon d-md-none d-lg-inline-block">
                        {icon}
                    </span>
                    <span className="nav-link-title">
                        {value ? value : children}
                    </span>
                </Link>
            </li>
        </>
    );
}
