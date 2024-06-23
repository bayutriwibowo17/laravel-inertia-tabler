import { Link, router } from "@inertiajs/react";
import Input from "./Form/Input";
import Button from "./Button";
import {
    IconArrowsDownUp,
    IconRefresh,
    IconRefreshDot,
    IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";
import { getAllQueryParams, getQueryParam } from "@/utils";

export default function Table({
    dataSource,
    columns,
    loading,
    searchable,
    handleSearch,
    handlePerPage,
    handleSorterColumns,
}) {
    const [search, setSearch] = useState(getQueryParam("search"));
    const [perPage, setPerPage] = useState(getQueryParam("per_page"));
    const [activeSorterColumn, setActiveSorterColumn] = useState(null);

    const handleAllSorterColumnClick = (column) => {
        let sortDirection = getQueryParam("sortDirection") || "asc";
        setActiveSorterColumn(column);
        handleSorterColumns(column, sortDirection === "asc" ? "desc" : "asc");
    };
    return (
        <>
            <div className="table-responsive">
                {searchable && (
                    <div className="d-flex mb-3">
                        <div className="text-secondary">
                            Show
                            <div className="mx-2 d-inline-block">
                                <select
                                    id="per_page"
                                    name="per_page"
                                    className="form-select"
                                    value={perPage}
                                    onChange={(e) =>
                                        handlePerPage(e.target.value)
                                    }
                                >
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                            </div>
                            entries
                        </div>
                        <div className="ms-auto text-secondary">
                            <div className="ms-2 d-inline-block">
                                <div className="row g-2">
                                    <div className="col">
                                        <Input
                                            type="search"
                                            placeholder="Search..."
                                            value={search || ""}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter") {
                                                    handleSearch(search);
                                                }
                                            }}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                        />
                                    </div>
                                    <div className="col-auto">
                                        <Button
                                            className="btn-icon me-1"
                                            onClick={() => handleSearch(search)}
                                        >
                                            <IconSearch className="icon" />
                                        </Button>
                                        <Button
                                            className="btn-icon btn-danger"
                                            onClick={() => handleSearch("")}
                                        >
                                            <IconRefresh className="icon" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                <table className="table table-vcenter table-bordered table-striped">
                    <thead>
                        <tr>
                            {columns.map((column) => {
                                return (
                                    <th key={column.dataIndex}>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>{column.title}</div>
                                            <Button
                                                onClick={() =>
                                                    handleAllSorterColumnClick(
                                                        column.dataIndex
                                                    )
                                                }
                                                className={`btn-icon btn-sm ${
                                                    activeSorterColumn ==
                                                    column.dataIndex
                                                        ? "bg-primary"
                                                        : ""
                                                } ${
                                                    !column.sorter
                                                        ? "btn-ghost"
                                                        : ""
                                                }`}
                                            >
                                                <IconArrowsDownUp className="icon" />
                                            </Button>
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {/* if empty data */}
                        {dataSource.data.length === 0 && (
                            <>
                                <tr className="text-center">
                                    <td colSpan="100%">No data available...</td>
                                </tr>
                            </>
                        )}

                        {/* if loading data */}
                        {loading ? (
                            <>
                                <tr className="text-center">
                                    <td colSpan="100%">
                                        Loading, please wait...
                                    </td>
                                </tr>
                            </>
                        ) : (
                            <>
                                {dataSource.data.map((data, index) => {
                                    return (
                                        <tr key={`data-table-row-${index}`}>
                                            {columns.map((column) => {
                                                if (column.render)
                                                    return (
                                                        <td
                                                            key={
                                                                column.dataIndex
                                                            }
                                                        >
                                                            {column.render(
                                                                data[
                                                                    column
                                                                        .dataIndex
                                                                ],
                                                                index,
                                                                data
                                                            )}
                                                        </td>
                                                    );

                                                return (
                                                    <td key={column.dataIndex}>
                                                        {typeof data[
                                                            column.dataIndex
                                                        ] === "object" ||
                                                        Array.isArray(
                                                            data[
                                                                column.dataIndex
                                                            ]
                                                        )
                                                            ? JSON.stringify(
                                                                  data[
                                                                      column
                                                                          .dataIndex
                                                                  ]
                                                              )
                                                            : data[
                                                                  column
                                                                      .dataIndex
                                                              ]}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="mt-4 d-flex align-items-center">
                <p className="m-0 text-secondary">
                    Showing <span>{dataSource.from}</span> to{" "}
                    <span>{dataSource.to}</span> of{" "}
                    <span>{dataSource.total}</span> entries
                </p>

                <ul className="pagination m-0 ms-auto">
                    {dataSource.links.map((link, i) => {
                        return (
                            <li
                                key={i}
                                className={`page-item ${
                                    link.active ? "active" : ""
                                }`}
                            >
                                <Link
                                    href={link.url}
                                    className="page-link"
                                    preserveScroll
                                    preserveState
                                >
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                    ></div>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </>
    );
}
