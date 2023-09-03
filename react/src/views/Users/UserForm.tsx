import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createUserApi, getUserApi, updateUserApi } from "../../api/apis";
import { registerPayload } from "../../type";
import { PATH } from "../../constants";
import { useStateContext } from "../../contexts/ContextProvider";

const UserForm = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { setNotification } = useStateContext();
    const [user, setUser] = useState<registerPayload>({
        id: "",
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (user.id) {
            updateUserApi(user)
                .then(() => {
                    setNotification("User was successfully updated");
                    nav(PATH.USERS);
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response?.data?.errors);
                    }
                });
        } else {
            createUserApi(user)
                .then(() => {
                    nav(PATH.USERS);
                    setNotification("User was successfully created");
                })
                .catch((err) => {
                    const response = err.response;
                    if (response && response.status === 422) {
                        setErrors(response?.data?.errors);
                    }
                });
        }
    };

    useEffect(() => {
        if (id) {
            setLoading(true);
            getUserApi(id)
                .then((res) => {
                    setLoading(false);
                    setUser(res.data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }
    }, []);

    return (
        <div>
            <h1>{id ? "Edit User: " + user.name : "Add New User"}</h1>
            <div className="animated card fadeInDown">
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <form onSubmit={onSubmit}>
                        {errors && (
                            <div className="alert">
                                {Object.keys(errors).map((key) => (
                                    <p key={key}>{errors?.[key]?.[0]}</p>
                                ))}
                            </div>
                        )}

                        {id && (
                            <input
                                className="disabled"
                                value={user.id}
                                readOnly
                            />
                        )}
                        <input
                            value={user.name}
                            onChange={(e) =>
                                setUser({ ...user, name: e.target.value })
                            }
                            type="text"
                            placeholder="Full name"
                        />
                        <input
                            value={user.email}
                            onChange={(e) =>
                                setUser({ ...user, email: e.target.value })
                            }
                            type="email"
                            placeholder="Email"
                        />
                        <input
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            type="password"
                            placeholder="Password"
                        />
                        <input
                            onChange={(e) =>
                                setUser({
                                    ...user,
                                    password_confirmation: e.target.value,
                                })
                            }
                            type="password"
                            placeholder="Password Confirmation"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserForm;
