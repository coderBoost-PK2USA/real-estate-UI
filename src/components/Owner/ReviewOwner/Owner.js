import * as React from 'react';


import './OwnerReview.css'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {requestInterceptor} from "../../../Apis/owners-api-interceptors";
import axios from "axios";
import {BASE_URL_PROPERTY, OWNER_URL, USER_URL} from "../../../constants/endpoints";

export default function Owner(props) {

    const [isActive, setIsActive] = useState(false);

    const token = localStorage.getItem("token");
    const [hasProperty,  setHasProperty] = useState(false);
    const [email,  setEmail] = useState(false);


    useEffect(() => {
        setIsActive(props.status === 'ACTIVE');
        getUserDetails();

    }, []);

    const handleIsActiveBtn = () => {
        setIsActive((!isActive))
        handleIsActiveDBStatus();

    }

    const getUserDetails = () =>{

        const axiosInstance = axios.create({
            baseURL: USER_URL+"/"+props.userId
        });
        axiosInstance.interceptors.request.use(config => requestInterceptor(config, token));
        axiosInstance
            .get()
            .then(response => {
                setEmail(response.data.email);
            })
            .catch(error => {
                console.log(error);
            })
    }

    const handleIsActiveDBStatus = () => {
        const axiosInstance = axios.create({
            baseURL: OWNER_URL
        });
        axiosInstance.interceptors.request.use(config => requestInterceptor(config, token));
        axiosInstance
            .put(''+OWNER_URL, {
                id: props.id,
                status: !isActive? "ACTIVE" : "INACTIVE"
            })
            .catch(error => {
                console.error("Error updating database status: ", error);
            });
    }



    const handleClick = () => {
        window.location.href = 'mailto:'+email;
    };

    return (<>
            <div className='table_row' key={props.id}>
                <div className='table_small'>
                    <div className='table_cell'>Header One</div>
                    <div className='table_cell'>{props.sr}</div>
                </div>
                <div className='table_small'>
                    <div className='table_cell'>Header Two</div>
                    <div className='table_cell'>{props.name}</div>
                </div>
                <div className='table_small'>
                    <div className='table_cell'>Header Three</div>
                    <div className='table_cell'>{props.st} , {props.statee} - {props.zipcode}</div>
                </div>
                <div className='table_small'>
                    <div className='table_cell'>Header Four</div>
                    <div className='table_cell'>
                        <input type="button" value={isActive ? "Enabled" : "Disabled"} onClick={handleIsActiveBtn}/>
                    </div>
                </div>

                <div className='table_small'>
                    <div className='table_cell' style={{"background-color": "white"}}>Header Four</div>
                    {hasProperty ? (
                        <Link
                            to={{
                                pathname: '/review-detail/' + props.sr,
                                state: JSON.stringify({id: props.id})
                            }}
                        >
                            <div className='table_cell' style={{"color": "lightcoral"}}>View / Change Status</div>
                        </Link>
                    ) : (
                        <Link to="#">
                            <div className='table_cell' style={{"color": "lightcoral"}}>No Any Property</div>
                        </Link>
                    )}
                </div>
                <Link to="#">
                    <div className='table_small' onClick={handleClick}>
                        <div className='table_cell' style={{"color": "lightcoral"}}>Contact</div>
                    </div>
                </Link>
            </div>
        </>

    );
}