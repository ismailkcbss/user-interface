import { useHistory } from "react-router-dom";
import alertify from "alertifyjs";
import axios from "axios";
import { useState } from "react";



function Login() {

    const initialForm = {
        Email: "",
        Password: "",
    }

    const [form, setForm] = useState({ ...initialForm });

    const history = useHistory();

    const handleChange = (value, key) => {
        setForm({
            ...form,
            [key]: value,
        })
    }

    const handleClick = async (event) => {
        event.preventDefault();
        if (form.Email.trim() === "" || form.Password.trim() === "") {
            alertify.error("Bilgilerinizi Doldurunuz Lütfen");
            return;
        }
        history.push('/Dashboard');

    }



    return (
        <div className="LoginDiv">
            <form className="FormAccount">
                <div className="FormHeader">
                    <p><span>|</span> MANAGE COURSES</p>
                    <div className="FormHeaderTitle">
                        <p>SIGN IN</p>
                        <span>Enter your credentials to access your account</span>
                    </div>
                </div>

                <div className="FormBody">
                    <div className="FormBodyEmail">
                        <span>Email</span>
                        <input
                            id="email"
                            required
                            autoFocus
                            autoComplete="email"
                            type="email"
                            placeholder="Enter your email"
                            value={form.Email}
                            onChange={(e) => handleChange(e.target.value, "Email")}
                        />
                    </div>
                    <div className="FormBodyPassword">
                        <span>Password</span>
                        <input
                            required
                            type="password"
                            placeholder="Enter your password"
                            value={form.Password}
                            onChange={(e) => handleChange(e.target.value, "Password")}
                        />
                    </div>
                    <input type="submit" value="SIGN IN" onClick={handleClick} />
                </div>

                <div className="FormFooter">
                    <span>Forgot your password?</span>
                    <button>Reset Password</button>
                </div>

            </form>
        </div>
    );
}

export default Login;