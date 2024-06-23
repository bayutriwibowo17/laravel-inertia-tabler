import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Input from "@/Components/Form/Input";
import Invalid from "@/Components/Form/Invalid";
import Label from "@/Components/Form/Label";
import AppLayout from "@/Layouts/AppLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { useEffect } from "react";

export default function ProfileIndex() {
    const { auth } = usePage().props;
    const { data, setData, patch, errors, clearError, processing, reset } =
        useForm({
            name: auth.user.name,
            email: auth.user.email,
            password: "",
            new_password: "",
            new_password_confirmation: "",
        });

    const [changePassword, setChangePassword] = useState(false);

    useEffect(() => {
        return () => {
            reset("password", "new_password", "new_password_confirmation");
            setChangePassword(false);
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"), {
            onFinish: () => {
                reset();
                setChangePassword(false);
            },
        });
    };
    return (
        <AppLayout>
            <Head title="Profile" />
            <Card title="Profile">
                <form onSubmit={submit}>
                    {/* name */}
                    <div className="mb-3">
                        <Label htmlFor="name" value="Full Name" />
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
                    {/* email */}
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

                    {/* change password */}
                    <label className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            onChange={(e) =>
                                setChangePassword(e.target.checked)
                            }
                        />
                        <span className="form-check-label">
                            Change password
                        </span>
                    </label>

                    {changePassword && (
                        <div className="row">
                            {/* new password */}
                            <div className="col mb-3">
                                <Label
                                    htmlFor="new_password"
                                    value="New password"
                                />
                                <Input
                                    id="new_password"
                                    type="password"
                                    name="new_password"
                                    placeholder="New password"
                                    value={data.new_password}
                                    onChange={(e) =>
                                        setData("new_password", e.target.value)
                                    }
                                    error={errors.new_password}
                                />
                                <Invalid message={errors.new_password} />
                            </div>
                            {/* new password confirmation */}
                            <div className="col mb-3">
                                <Label
                                    htmlFor="new_password_confirmation"
                                    value="New password confirmation"
                                />
                                <Input
                                    id="new_password_confirmation"
                                    type="password"
                                    name="new_password_confirmation"
                                    placeholder="New password confirmation"
                                    value={data.new_password_confirmation}
                                    onChange={(e) =>
                                        setData(
                                            "new_password_confirmation",
                                            e.target.value
                                        )
                                    }
                                    error={errors.new_password_confirmation}
                                />
                                <Invalid
                                    message={errors.new_password_confirmation}
                                />
                            </div>
                        </div>
                    )}

                    {/* password */}
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
                        <Invalid message={errors.password}>
                            * masukkan password untuk melakukan perubahan
                        </Invalid>
                    </div>
                    {/* submit */}
                    <div>
                        <Button
                            className="btn-primary w-100"
                            disabled={processing}
                        >
                            Save
                        </Button>
                    </div>
                </form>
            </Card>
        </AppLayout>
    );
}
