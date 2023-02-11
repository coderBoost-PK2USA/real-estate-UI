import axios from "axios";
import {OWNER_URL} from "../../../constants/endpoints";
import {useContext, useEffect, useState} from "react";
import Owner from "./Owner";
import {useNavigate} from "react-router";
import {CurrentUserContext} from "../../../Context/CurrentUserContext";
import {requestInterceptor, responseReviewOwners} from "../../../Apis/owners-api-interceptors";

const ReviewOwnerList = () => {

    const [owners, setOwners] = useState([]);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [currentUser, setCurrentUser] = useContext(CurrentUserContext);


    const fetchAllOwners = () => {
        const axiosInstance = axios.create({
            baseURL: OWNER_URL,
        });

        axiosInstance.interceptors.request.use((config) => requestInterceptor(config, token));

        axiosInstance.interceptors.response.use((response) => response, (error) => responseReviewOwners(error, setCurrentUser, navigate));

        axiosInstance.get().then((response) => {
            setOwners(response.data);
            console.log(response.data);
        }, (error) => {
            console.log(error);
        });

    };


    useEffect(fetchAllOwners, []);


    let sr=0;
    const ownerListUI = owners.map(o => {
        return <>
            <>
                <Owner
                    id={o.id}
                    sr={++sr}
                    userId={o.userId}
                    name={o.name}
                    status={o.status}
                    st={o.street}
                    statee={o.state}
                    zipcode={o.zipCode}
                    hasProperties={o.hasProperties}


                />
            </>
        </>
    });


    return <div class="review-owner">
        <h1>Review Owners</h1>
            <div className="table" id="results">
                <div className='theader'>
                    <div className='table_header'>Sr.</div>
                    <div className='table_header'>Name</div>
                    <div className='table_header'>Address</div>
                    <div className='table_header'>Status</div>
                    <div className='table_header'>Actions</div>
                    <div className='table_header'>Contact</div>
                </div>

                {ownerListUI}
            </div>
    </div>;
}


export default ReviewOwnerList;