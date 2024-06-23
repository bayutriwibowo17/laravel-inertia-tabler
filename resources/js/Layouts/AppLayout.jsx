import NavLink from "@/Components/NavLink";
import { getMediaUrl } from "@/utils";
import { Link, usePage } from "@inertiajs/react";
import { IconHome, IconUser } from "@tabler/icons-react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AppLayout({ children }) {
    const { flash, auth } = usePage().props;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <>
            <div className="page">
                {/* Navbar */}
                <header className="navbar navbar-expand-md d-print-none">
                    <div className="container-xl">
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbar-menu"
                            aria-controls="navbar-menu"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon" />
                        </button>
                        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
                            <a href=".">
                                <img
                                    src={getMediaUrl("images/logo.svg")}
                                    width={110}
                                    height={32}
                                    alt="Tabler"
                                    className="navbar-brand-image"
                                />
                            </a>
                        </h1>
                        <div className="navbar-nav flex-row order-md-last">
                            <div className="nav-item dropdown">
                                <a
                                    href="#"
                                    className="nav-link d-flex lh-1 text-reset p-0"
                                    data-bs-toggle="dropdown"
                                    aria-label="Open user menu"
                                >
                                    <img
                                        className="avatar avatar-sm"
                                        src={getMediaUrl(
                                            "images/default-user.jpg"
                                        )}
                                        alt={getMediaUrl(
                                            "images/default-user.jpg"
                                        )}
                                    />
                                    <div className="d-none d-xl-block ps-2">
                                        <div>{auth.user.name}</div>
                                        <div className="mt-1 small text-secondary">
                                            UI Designer
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                                    <Link
                                        href={route("profile.index")}
                                        className="dropdown-item"
                                    >
                                        Settings
                                    </Link>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="dropdown-item"
                                    >
                                        Log Out
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <header className="navbar-expand-md">
                    <div className="collapse navbar-collapse" id="navbar-menu">
                        <div className="navbar">
                            <div className="container-xl">
                                <div className="row flex-fill align-items-center">
                                    <div className="col">
                                        <ul className="navbar-nav">
                                            {/* home */}
                                            <NavLink
                                                href={route(
                                                    "admin.dashboard.index"
                                                )}
                                                active={route().current(
                                                    "admin.dashboard.index"
                                                )}
                                                icon={
                                                    <IconHome className="icon" />
                                                }
                                            >
                                                Home
                                            </NavLink>
                                            {/* user */}
                                            <NavLink
                                                href={route("admin.user.index")}
                                                active={route().current(
                                                    "admin.user.index"
                                                )}
                                                icon={
                                                    <IconUser className="icon" />
                                                }
                                            >
                                                User
                                            </NavLink>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
                <div className="page-wrapper">
                    {/* Page header */}
                    {/* <div className="page-header d-print-none">
                        <div className="container-xl">
                            <div className="row g-2 align-items-center">
                                <div className="col">
                                    <h2 className="page-title">Empty page</h2>
                                </div>
                            </div>
                        </div>
                    </div> */}
                    {/* Page body */}
                    <div className="page-body">
                        <div className="container-xl">{children}</div>
                    </div>
                    <footer className="footer footer-transparent d-print-none">
                        <div className="container-xl">
                            <div className="row text-center align-items-center flex-row-reverse">
                                <div className="col-lg-auto ms-lg-auto"></div>
                                <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                                    <ul className="list-inline list-inline-dots mb-0">
                                        <li className="list-inline-item">
                                            Copyright ©{" "}
                                            {new Date().getFullYear()}
                                            <Link
                                                href="/"
                                                className="link-secondary"
                                            >
                                                {" "}
                                                Laravel
                                            </Link>
                                            . All rights reserved.
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    );
}
