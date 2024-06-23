import Button from "@/Components/Button";
import Input from "@/Components/Form/Input";
import Invalid from "@/Components/Form/Invalid";
import Label from "@/Components/Form/Label";
import { ModalDefault } from "@/Components/Modal";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function CreateUser() {
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            name: "",
            email: "",
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
        post(route("admin.user.store"), {
            onSuccess: () => closeModal(),
        });
    };

    return (
        <div className="mb-3">
            <Button className="btn-primary" onClick={() => setModal(true)}>
                Create
            </Button>
            {/* modal */}
            <ModalDefault title="Add" show={modal} close={() => closeModal()}>
                <form onSubmit={submit}>
                    {/* input name */}
                    <div className="mb-3">
                        <Label htmlFor="name" value="Name" />
                        <Input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            error={errors.name}
                        />
                        <Invalid message={errors.name} />
                    </div>
                    {/* input email */}
                    <div className="mb-3">
                        <Label htmlFor="email" value="Email" />
                        <Input
                            id="email"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                        />
                        <Invalid message={errors.email} />
                    </div>
                    {/* input password */}
                    <div className="mb-3">
                        <Label htmlFor="password" value="Password" />
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            error={errors.password}
                        />
                        <Invalid message={errors.password} />
                    </div>
                    {/* input password confirmation */}
                    <div className="mb-3">
                        <Label
                            htmlFor="password_confirmation"
                            value="Password confirmation"
                        />
                        <Input
                            id="password_confirmation"
                            type="password"
                            name="password_confirmation"
                            placeholder="Password confirmation"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData("password_confirmation", e.target.value)
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
        </div>
    );
}
