import {useEffect, useState} from "react";
import axios from "axios";
import {USER_URL} from "../../constants/endpoints";

function UserDetails(props) {

    const userId = props.userId;
    const token = localStorage.getItem("token")
    const [userDetails, setUserDetails] = useState({});

    const fetchUserById = () => {
        axios.get(`${USER_URL}/${userId}`, {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => setUserDetails(response.data))
            .catch(error => console.log("Error while fetching user details, error = " + error.message))
    }

    useEffect(() => {
        fetchUserById();
    }, [userId, token])

    const mailtoHref = `mailto:${userDetails.email}?subject=Query/Update Regarding Property Buying&body=Hello Mr/Ms. ${userDetails.name}, I am ______`;

    return (
        <>
            <h3>Contact Info:</h3>
            <h6>Name: {userDetails.name}</h6>
            <h6>Contact Number: {userDetails.phoneNumber}</h6>
            <h5>Email: {userDetails.email}</h5>
            <label><a href={mailtoHref} className="btn btn-info">
                Send email
            </a></label>
        </>
    )
}

export default UserDetails