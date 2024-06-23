import { Link } from "@inertiajs/react";
import { IconAlertTriangle } from "@tabler/icons-react";

export const ModalDefault = ({ title, show, close, children }) => {
    return (
        <div
            className={`modal modal-blur fade ${show ? "show" : ""}`}
            tabIndex={-1}
            style={{ display: show ? "block" : "none" }}
            aria-modal="true"
            role="dialog"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button
                            type="button"
                            className="btn-close"
                            aria-label="Close"
                            onClick={close}
                        />
                    </div>
                    <div className="modal-body">{children}</div>
                </div>
            </div>
        </div>
    );
};

export const ModalDelete = ({ url, show, close, s }) => {
    return (
        <div
            className={`modal modal-blur fade show ${show ? "show" : ""}`}
            tabIndex={-1}
            style={{ display: show ? "block" : "none" }}
            aria-modal="true"
            role="dialog"
        >
            <div
                className="modal-dialog modal-sm modal-dialog-centered"
                role="document"
            >
                <div className="modal-content">
                    <button
                        type="button"
                        className="btn-close"
                        aria-label="Close"
                        onClick={close}
                    />
                    <div className="modal-status bg-danger" />
                    <div className="modal-body text-center py-4">
                        <IconAlertTriangle className="icon mb-2 text-danger icon-lg" />
                        <h3>Are you sure?</h3>
                        <div className="text-secondary">
                            Do you really want to remove{" "}
                            <strong>{s.name}</strong>? What you've done cannot
                            be undone.
                        </div>
                    </div>
                    <div className="modal-footer">
                        <div className="w-100">
                            <div className="row">
                                <div className="col">
                                    <Link
                                        href="#"
                                        className="btn w-100"
                                        onClick={close}
                                        preserveScroll
                                        preserveState
                                    >
                                        Cancel
                                    </Link>
                                </div>
                                <div className="col">
                                    <Link
                                        as="button"
                                        method="delete"
                                        className="btn btn-danger w-100"
                                        href={url}
                                        preserveScroll
                                        preserveState
                                        onClick={close}
                                    >
                                        Delete item
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
