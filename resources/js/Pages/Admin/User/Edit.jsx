import Button from "@/Components/Button";
import Input from "@/Components/Form/Input";
import Invalid from "@/Components/Form/Invalid";
import Label from "@/Components/Form/Label";
import { ModalDefault } from "@/Components/Modal";
import { Link, useForm } from "@inertiajs/react";
import { IconEditCircle } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function EditUser({ s }) {
    const {
        data: editData,
        setData: setEditData,
        patch,
        processing,
        errors,
        clearErrors,
        reset,
    } = useForm({
        id: s.id,
        name: s.name,
        email: s.email,
        password: "",
        password_confirmation: "",
    });

    const [modal, setModal] = useState(false);

    const closeModal = () => {
        setModal(false);
        clearErrors();
        reset();
    };

    useEffect(() => {
        return () => {
            reset("password", "password_confirmation");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        patch(route("admin.user.update", s.id), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <Button
                className="btn-primary btn-icon rounded-circle"
                onClick={() => setModal(true)}
            >
                <IconEditCircle className="icon" />
            </Button>

            {/* modal */}
            <ModalDefault
                title={`Edit data `}
                show={modal}
                close={() => closeModal()}
            >
                <form onSubmit={submit}>
                    {/* input name */}
                    <div className="mb-3">
                        <Label htmlFor={`name_${s.id}`} value="Name" />
                        <Input
                            id={`name_${s.id}`}
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={editData.name}
                            onChange={(e) =>
                                setEditData("name", e.target.value)
                            }
                            error={errors.name}
                        />
                        <Invalid message={errors.name} />
                    </div>
                    {/* input email */}
                    <div className="mb-3">
                        <Label htmlFor={`email_${s.id}`} value="Email" />
                        <Input
                            id={`email_${s.id}`}
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={editData.email}
                            onChange={(e) =>
                                setEditData("email", e.target.value)
                            }
                            error={errors.email}
                        />
                        <Invalid message={errors.email} />
                    </div>
                    {/* input password */}
                    <div className="mb-3">
                        <Label htmlFor="password" value="Password" />
                        <Input
                            id={`password_${s.id}`}
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={editData.password}
                            onChange={(e) =>
                                setEditData("password", e.target.value)
                            }
                            error={errors.password}
                        />
                        <Invalid message={errors.password} />
                    </div>
                    {/* input password confirmation */}
                    <div className="mb-3">
                        <Label
                            htmlFor={`password_confirmation_${s.id}`}
                            value="Password confirmation"
                        />
                        <Input
                            id={`password_confirmation_${s.id}`}
                            type="password"
                            name="password_confirmation"
                            placeholder="Password confirmation"
                            value={editData.password_confirmation}
                            onChange={(e) =>
                                setEditData(
                                    "password_confirmation",
                                    e.target.value
                                )
                            }
                        />
                        <Invalid message={errors.password_confirmation} />
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                        <Link
                            as="button"
                            className="btn btn-ghost"
                            onClick={() => closeModal()}
                        >
                            Cancel
                        </Link>
                        <Button className="btn-primary" disabled={processing}>
                            Save
                        </Button>
                    </div>
                </form>
            </ModalDefault>
        </>
    );
}
