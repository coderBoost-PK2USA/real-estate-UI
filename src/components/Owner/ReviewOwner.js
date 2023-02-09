import axios from "axios";
import {OWNER_URL} from "../../constants/endpoints";
import {getAuthHeader, isTokenExpired, logoutAuthState} from "../AuthServices/Auth";
import {useContext, useEffect, useState} from "react";
import Owner from "./Owner";
import List from "@mui/material/List";
import {useNavigate} from "react-router";
import {CurrentUserContext} from "../../Context/CurrentUserContext";

const ReviewOwner = () => {

    const [owners, setOwners] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);


    const fetchAllOwners = () => {

        if (!isTokenExpired(token, setCurrentUser)) {
            axios.get(OWNER_URL, {headers: getAuthHeader(token)})
                .then(response => {
                    setOwners(response.data);
                    console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        } else {
            logoutAuthState(setCurrentUser);
            return navigate('/');
        }

    }

    useEffect(fetchAllOwners, []);


    const ownerListUI = owners.map(o => {
        return <>
            <div>
                <Owner
                    id={o.id}
                    name={o.name}
                    status={o.status}
                    st={o.street}
                    state={o.state}
                    zipcode={o.zipCode}
                    lat={o.latitude}
                    lon={o.longitude}

                >
                </Owner>
            </div>
        </>
    });


    return <div>
        Review Owner
        <List sx={{width: '100%', maxWidth: 360, color: 'background.paper'}}>
            {ownerListUI}
        </List>
    </div>;
}

export default ReviewOwner;