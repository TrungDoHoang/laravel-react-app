import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserApi } from "../../api/apis";
import { registerPayload } from "../../type";

const UserForm = () => {
    const { id } = useParams();
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
                            id=""
                        />
                        <input
                            onChange={(e) =>
                                setUser({ ...user, password: e.target.value })
                            }
                            type="password"
                            placeholder="Password"
                            id=""
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
                        <button className="btn btn-block">Save</button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default UserForm;
