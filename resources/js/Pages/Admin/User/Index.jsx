import Button from "@/Components/Button";
import Card from "@/Components/Card";
import Table from "@/Components/Table";
import AppLayout from "@/Layouts/AppLayout";
import { getAllQueryParams } from "@/utils";
import { Head, router } from "@inertiajs/react";
import { IconEditCircle, IconTrash } from "@tabler/icons-react";
import CreateUser from "./Create";
import EditUser from "./Edit";
import DeleteUser from "./Delete";
import { useState } from "react";

export default function IndexUser({ users }) {
    const queryParams = getAllQueryParams();
    const [loading, setLoading] = useState(false);

    const handleSearch = (search) => {
        setLoading(true);
        router.get(
            route("admin.user.index"),
            {
                ...queryParams,
                search: search,
            },
            { onFinish: () => setLoading(false) }
        );
    };

    const handlePerPage = (per_page) => {
        setLoading(true);
        router.get(
            route("admin.user.index"),
            {
                ...queryParams,
                per_page: per_page,
            },
            { onFinish: () => setLoading(false) }
        );
    };

    return (
        <AppLayout>
            <Head title="User management" />
            <Card title="Users">
                <CreateUser />
                <Table
                    dataSource={users}
                    searchable
                    loading={loading}
                    handleSearch={handleSearch}
                    handlePerPage={handlePerPage}
                    handleSorterColumns={(column, direction) => {
                        router.get(route("admin.user.index"), {
                            ...queryParams,
                            sortField: column,
                            sortDirection: direction ? direction : "asc",
                        });
                    }}
                    columns={[
                        {
                            title: "No",
                            dataIndex: "no",
                            render: (value, index, data) => users.from + index,
                        },
                        {
                            title: "Name",
                            dataIndex: "name",
                            sorter: true,
                        },
                        {
                            title: "Email",
                            dataIndex: "email",
                            sorter: true,
                        },
                        {
                            title: "Action",
                            dataIndex: "action",
                            render: (_, __, record) => (
                                <div className="btn-list flex-nowrap">
                                    <EditUser s={record} />
                                    <DeleteUser s={record} />
                                </div>
                            ),
                        },
                    ]}
                />
            </Card>
        </AppLayout>
    );
}
