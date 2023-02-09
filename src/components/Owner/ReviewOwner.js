import axios from "axios";
import {OWNER_URL} from "../../constants/endpoints";
import {useContext, useEffect, useState} from "react";
import Owner from "./Owner";
import List from "@mui/material/List";
import {useNavigate} from "react-router";
import {CurrentUserContext} from "../../Context/CurrentUserContext";
import {requestReviewOwners, responseReviewOwners} from "../../Apis/owners-api-interceptors";

const ReviewOwner = () => {

    const [owners, setOwners] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);


    const fetchAllOwners = () => {
        const axiosInstance = axios.create({
            baseURL: OWNER_URL,
        });

        axiosInstance.interceptors.request.use((config) => requestReviewOwners(config, token));

        axiosInstance.interceptors.response.use((response) => response, (error) => responseReviewOwners(error, setCurrentUser, navigate));

        axiosInstance.get().then((response) => {
            setOwners(response.data);
            console.log(response.data);
        }, (error) => {
            console.log(error);
        });

    };


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