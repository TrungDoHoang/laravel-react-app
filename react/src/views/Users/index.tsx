import { useEffect, useState } from "react";
import { UserI } from "../../type";
import { deleteUserApi, getUsersApi } from "../../api/apis";
import { Link } from "react-router-dom";
import { PATH } from "../../constants";

const Users = () => {
    const [users, setUsers] = useState<UserI[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const getUsers = () => {
        setLoading(true);
        getUsersApi()
            .then((res) => {
                setLoading(false);
                setUsers(res.data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const deleteHandler = (u: UserI) => {
        if (!confirm("Are you sure you want to delete this user?")) {
            return;
        }

        deleteUserApi(u).then(() => {
            getUsers();
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>User</h1>
                <Link className="btn-add" to={PATH.ADD_USER}>
                    Add New User
                </Link>
            </div>

            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Create At</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {loading ? (
                        <tbody>
                            <tr>
                                <td className="text-center " colSpan={5}>
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    ) : (
                        <tbody>
                            {users.map((user) => (
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={PATH.EDIT_USER.replace(
                                                ":id",
                                                user.id.toString(),
                                            )}
                                        >
                                            Edit
                                        </Link>{" "}
                                        <button
                                            onClick={() => deleteHandler(user)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default Users;
