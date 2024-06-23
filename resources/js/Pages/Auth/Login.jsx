import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Input from "@/Components/Form/Input";
import Invalid from "@/Components/Form/Invalid";
import Label from "@/Components/Form/Label";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function Login() {
    const { data, setData, post, processing, errors, clearErrors, reset } =
        useForm({
            email: "",
            password: "",
        });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route("login"));
    };
    return (
        <GuestLayout>
            <Head title="Login" />
            <Card title="Login">
                <form onSubmit={submit}>
                    <div className="mb-3">
                        <Label htmlFor="email" value="Email" />
                        <Input
                            type="text"
                            name="email"
                            placeholder="Email address"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            error={errors.email}
                        />
                        <Invalid message={errors.email} />
                    </div>
                    <div className="mb-3">
                        <Label htmlFor="password" value="Password" />
                        <Input
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
                    <div className="form-footer mt-0">
                        <Button
                            className="btn-primary w-100"
                            disabled={processing}
                        >
                            Sign in
                        </Button>
                    </div>
                </form>
            </Card>
        </GuestLayout>
    );
}
