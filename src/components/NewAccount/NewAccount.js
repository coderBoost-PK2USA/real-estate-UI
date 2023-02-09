import './NewAccount.css'
import {useNavigate} from "react-router";
import {useRef, useState} from "react";
import {CUSTOMER_URL, OWNER_URL, USER_URL} from "../../constants/endpoints";
import axios from "axios";

function NewAccount() {
    const navigate = useNavigate();
    const newAccountForm = useRef();
    const [ownerState, setOwnerState] = useState(false)

    const createNewUser = () => {
        const form = newAccountForm.current;
        const roleId = ownerState ? 3 : 2;

        const userData = {
            name: form['name'].value,
            email: form['email'].value,
            password: form['password'].value,
            phoneNumber: form['phoneNumber'].value,
            roleId: roleId
        };

        axios.post(USER_URL, userData)
            .then(response => {
                ownerState ? createOwnerUserMapping(response.data.userId) : createCustomerUserMapping(response.data.userId)
            })
            .catch(error => {
                console.error('Error while creating new account, error=', error.message);
            })
    }

    const createOwnerUserMapping = (userId) => {
        const form = newAccountForm.current;
        const ownerData = {
            name: form['name'].value,
            userId: userId,
            street: form['street'].value,
            zipCode: form['zipCode'].value,
            state: form['state'].value
        }

        axios.post(OWNER_URL, ownerData)
            .then(() => navigate('/login'))
            .catch(error => console.error('Error while creating user mapping with owner, error=', error.message))
    }

    const createCustomerUserMapping = (userId) => {
        const form = newAccountForm.current;
        const customerData = {
            name: form['name'].value,
            userId: userId
        }
        axios.post(CUSTOMER_URL, customerData)
            .then(() => navigate('/login'))
            .catch(error => console.error('Error while creating user mapping with customer, error=', error.message))
    }

    const handleChange = () => {
        setOwnerState(!ownerState)
    }

    return (
        <div className="NewAccount">
            <form ref={newAccountForm}>
                <h3>Create New Account</h3>


                <label>Name:</label>
                <input type="text"
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

                <label>I am landlord or industry professional </label>
                <input
                    type="checkbox"
                    label={'isOwner'}
                    name={'isOwner'}
                    checked={ownerState}
                    onChange={handleChange}
                />


                {ownerState ? <div>
                    <label>Street:</label>
                    <input type="text"
                           label={'street'}
                           name={'street'}
                    />

                    <label>Zip Code:</label>
                    <input type="number"
                           label={'zipCode'}
                           name={'zipCode'}
                    />

                    <label>State:</label>
                    <input type="text"
                           label={'state'}
                           name={'state'}
                    />

                </div> : null}
            </form>
            <button onClick={createNewUser}>Submit</button>
        </div>
    );

}

export default NewAccount

