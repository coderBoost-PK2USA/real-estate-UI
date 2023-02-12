import './Login.css'
import {useContext, useRef} from "react";
import {AUTH_URL} from "../../constants/endpoints";
import axios from "axios";
import {useNavigate} from "react-router";
import {CurrentUserContext} from "../../Context/CurrentUserContext";

function Login() {

    const navigate = useNavigate();
    const loginRef = useRef();

    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);

    const login = async () => {
        const form = loginRef.current;
        const data = {
            email: form['email'].value,
            password: form['password'].value
        }

        try {
            const response = await axios.post(AUTH_URL, data);

            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            setCurrentUser(response.data);

            alert('Login Successful!');
            navigate("/Home");

        } catch (error) {
            alert("Invalid Credentials!");
        }
    }

    return (
        <div className="login">
            <form ref={loginRef}>
                <h3>Login</h3>


                <label>Email:</label>
                <input type="email"
                       label={'email'}
                       name={'email'}
                />

                <label>Password:</label>
                <input type="password"
                       label={'password'}
                       name={'password'}
                />

            </form>
            <button onClick={login}>Login</button>

        </div>
    );

}

export default Login

