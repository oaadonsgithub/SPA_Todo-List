import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const navigate = useNavigate();
    const [username, setname] = useState();
    const [pass, setpass] = useState();
    const [data, setdata] = useState();
    const [email, setemail] = useState();
    const [nameError, setnameerror] = useState("");
    const [passError, setpasserror] = useState("");
    const [mailError, setemailerror] = useState("");

    const nameHandler = (e) => {
        var nameval = e.target.value;
        const regex = /^[a-zA-Z]+$/;
        if (nameval == "") {
            setnameerror("*Required");
        } else if (!regex.test(nameval)) {
            setnameerror(
                "First name should not contain number and special characters."
            );
        } else if (nameval.length > 10) {
            setnameerror("First name should be no more than 10 characters.");
        } else if (nameval[0] !== nameval[0].toUpperCase()) {
            setnameerror("First letter should be capitalized.");
        } else {
            setname(nameval);
            setnameerror("");
        }
    };

    const passHandler = (e) => {
        var passval = e.target.value;
        if (passval == "") {
            setpasserror("*Required");
        } else if (passval.length > 16) {
            setpasserror("password should be no more than 16 characters.");
        } else if (passval.search(/[a-z]/i) > 0) {
            setpasserror("Password must contain at least 1 character");
        } else if (passval.search(/[0-9]/) < 0) {
            setpasserror("Password must contain at least 1 digit");
        } else if (passval.search(/[A-Z]/) < 0) {
            setpasserror(
                "Password must contain at least 1 Uppercase character"
            );
        } else if (passval.search(/[!@#\$%\^&\*]/) < 0) {
            setpasserror("Password must contain at least 1 special character");
        } else {
            passval = window.btoa(passval);
            setpass(passval);
            setpasserror("");
        }
    };
    const emailHandler = (e) => {
        const emailval = e.target.value;
        const reg1 = /^[0-9]*$/;
        const reg =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z]+(?:\.[a-z]{2,3})*$/;
        if (emailval == "") {
            setemailerror("*Required");
        } else if (reg1.test(emailval)) {
            setemailerror("numbers not allowed");
        } else if (!reg.test(emailval)) {
            setemailerror("invalid email");
        } else {
            setemail(emailval);
            setemailerror("");
        }
    };

    useEffect(() => {
        fetch("http://localhost:8003/")
            .then((data) => data.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }, []);

    const Save = (e) => {
        e.preventDefault();
        fetch("http://localhost:8003/signup", {
            method: "POST",
            headers: {
                Authorization: "Sahil Kulkarni",
                "content-type": "application/json",
            },
            body: JSON.stringify({
                name: username,
                email: email,
                password: pass,
            }),
        })
            .then((res) => res.json())
            .then((data) => navigate("/"));
    };

    return (
        <>
            <div>
                {data}
                <div class="container-fluid mt-4">
                    <div class="row">
                        <div class="col-lg-4 me-5"></div>
                        <div
                            class="col-lg mt-2 ms-3"
                            style={{ backgroundColor: "#f3f3f3" }}
                        >
                            <div class="d-flex justify-content-between">
                                <h2 class="pt-3 text-secondary">Sign up now</h2>
                                <div>
                                    <i
                                        class="fa fa-pencil pt-3"
                                        style={{
                                            opacity: "0.3",
                                            fontSize: "40px",
                                        }}
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            </div>

                            <p class="text-secondary">
                                Fill in the form below to get instant access
                            </p>
                            <div>
                                <form action="#" id="form">
                                    <div class="field success">
                                        <div class="input-group">
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="First name.."
                                                id="username"
                                                onChange={nameHandler}
                                            ></input>
                                        </div>
                                        <small style={{ color: "red" }}>
                                            {nameError}
                                        </small>
                                    </div>
                                    <div class="field">
                                        <div class="input-group mt-2">
                                            <input
                                                type="text"
                                                class="form-control"
                                                placeholder="Last name.."
                                                id="lastname"
                                            ></input>
                                        </div>
                                        <small></small>
                                    </div>
                                    <div class="field">
                                        <div class="input-group mt-2">
                                            <input
                                                type="email"
                                                class="form-control"
                                                id="email"
                                                placeholder="Email.."
                                                onChange={emailHandler}
                                            ></input>
                                        </div>
                                        <small style={{ color: "red" }}>
                                            {mailError}
                                        </small>
                                    </div>

                                    <div class="field">
                                        <div class="input-group mt-2">
                                            <input
                                                type="password"
                                                class="form-control"
                                                placeholder="Password.."
                                                id="password"
                                                onChange={passHandler}
                                            ></input>
                                        </div>
                                        <small style={{ color: "red" }}>
                                            {passError}
                                        </small>
                                    </div>

                                    <div class="d-grid mt-2">
                                        <button
                                            class="btn btn-primary"
                                            type="button"
                                            id="btnSign2"
                                            onClick={Save}
                                        >
                                            Sign up!
                                        </button>
                                    </div>
                                    <div class="d-flex justify-content-center mt-2 mb-3 ">
                                        <span
                                            class="me-1 "
                                            style={{ textAlign: "center" }}
                                        >
                                            Have an account?
                                        </span>
                                        <a href="/" class="">
                                            Log In.
                                        </a>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div class="col-lg-4 me-2"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignIn;
