import Button from "@/Components/Button";
import { ModalDelete } from "@/Components/Modal";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";

export default function DeleteUser({ s }) {
    const [modal, setModal] = useState(false);

    const closeModal = () => {
        setModal(false);
    };
    return (
        <>
            <Button
                className="btn-danger btn-icon rounded-circle"
                onClick={() => setModal(true)}
            >
                <IconTrash className="icon" />
            </Button>

            <ModalDelete
                url={route("admin.user.destroy", s.id)}
                show={modal}
                close={() => closeModal()}
                s={s}
            />
        </>
    );
}
