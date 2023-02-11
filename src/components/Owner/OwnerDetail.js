import Owner from "./Owner";
import {useNavigate, useParams} from "react-router";
import axios from "axios";
import {OWNER_URL} from "../../constants/endpoints";
import {requestInterceptor} from "../../Apis/owners-api-interceptors";
import {useEffect, useState} from "react";
import OwnerProperty from "./ReviewOwner/OwnerProperty";
import './OwnerDetails.css'
import {Link} from "react-router-dom";

const OwnerDetail = (props) => {


    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const [owner, setOwner] = useState([]);

    const [propertyDetails, setPropertyDetails] = useState([]);

    //  TODO: HAVE TO CHANGE THIS STATIC VALUE
    const id = 1001;
    console.log(id);


    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: OWNER_URL + "/" + id
        });

        axiosInstance.interceptors.request.use(config => requestInterceptor(config, token));

        axiosInstance.interceptors.response.use(response => {
            console.log(response.data.propertyDetails.properties)
            setOwner(response.data.ownerDetails);
            setPropertyDetails(response.data.propertyDetails.properties)
        }, error => {
            console.error("Error: ", error);
            navigate("/");
        });

        axiosInstance
            .get()
            .catch(error => {
                console.error("Error fetching owner data: ", error);
            });
    }, []);


    const propertyList = propertyDetails?.map(p => {

        return <>

            <Link to="#">
                <div>
                    <OwnerProperty

                        name={p.name}
                        detail={p.detail}
                        cat={p.category}
                        status={p.status}
                        price={p.price}
                        address={p.address}

                    />
                </div>
            </Link>
        </>


    });

    return (<>OWNER DETAIL
            <div>
                <Owner
                    name={owner.name}
                    properties={propertyDetails}
                />

            </div>
            <div className='properties-list'>
                {propertyList}

            </div>


        </>);
}

export default OwnerDetail;