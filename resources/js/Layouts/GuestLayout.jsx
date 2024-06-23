import { getMediaUrl } from "@/utils";

export default function GuestLayout({ children }) {
    return (
        <div className="page page-center pt-8">
            <div className="container container-normal py-4">
                <div className="row align-items-center g-4">
                    <div className="col-lg">
                        <div className="container-tight">
                            <div className="text-center mb-4">
                                <a
                                    href="."
                                    className="navbar-brand navbar-brand-autodark"
                                >
                                    <img
                                        src={getMediaUrl("images/logo.svg")}
                                        height={36}
                                        alt={getMediaUrl("images/logo.svg")}
                                    />
                                </a>
                            </div>
                            {children}
                        </div>
                    </div>
                    <div className="col-lg d-none d-lg-block">
                        <img
                            src={getMediaUrl(
                                "images/undraw_secure_login_pdn4.svg"
                            )}
                            height={300}
                            className="d-block mx-auto"
                            alt={getMediaUrl(
                                "images/undraw_secure_login_pdn4.svg"
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
