import './NewAccount.css'
import {useNavigate} from "react-router";
import {useRef} from "react";
import {USER_URL} from "../../constants/endpoints";
import axios from "axios";

function NewAccount() {

    const navigate = useNavigate();
    const newAccountForm = useRef();

    const createNewAccount = () => {
        const form = newAccountForm.current;
        const data = {
            name: form['name'].value,
            email: form['email'].value,
            password: form['password'].value,
            phoneNumber: form['phoneNumber'].value,
            roleId: 3 // temp static role-id for owner
        };

        axios.post(USER_URL, data)
            .then(() => {
                console.log("success")
                navigate('/');
            })
            .catch(error => {
                console.error('Error while creating new account, error=', error.message);
            })
    }

    return (
        <div className="NewAccount">
            <form ref={newAccountForm}>
                <h3>Create New Account</h3>

                <label>Name:</label>
                <input type="name"
                       label={'name'}
                       name={'name'}
                />

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

                <label>Contact Number:</label>
                <input type="text"
                       label={'phoneNumber'}
                       name={'phoneNumber'}
                />

            </form>
            <button onClick={createNewAccount}>Submit</button>
        </div>
    );

}

export default NewAccount

