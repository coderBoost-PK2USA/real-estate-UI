import Statistics from "./Statistics";
import axios from "axios";
import {ADMIN_URL, OWNER_URL} from "../../constants/endpoints";
import {requestInterceptor} from "../../Apis/owners-api-interceptors";
import {useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import './Admin.css'

const AdminDashboard = () => {

    const token = localStorage.getItem("token")
    const navigate = useNavigate();
    const [statistics, setStatistics] = useState([]);


    const fetchStatistics = () => {
        const axiosInstance = axios.create({
            baseURL: ADMIN_URL + "/dashboard"
        });

        axiosInstance.interceptors.request.use(config => requestInterceptor(config, token));

        axiosInstance.interceptors.response.use(response => {
            console.log(response.data);
            setStatistics(response.data);
        }, error => {
            console.error("Error: ", error);
            navigate("/");
        });

        axiosInstance
            .get()
            .catch(error => {
                console.error("Error fetching owner data: ", error);
            });
    }

    useEffect(fetchStatistics, [])

    return (
    <>
        <h1>Onboard Statistics</h1>
        <div className="Stats">


            <div className="AdminContent">
                <Link to={`#`}><Statistics name="Properties" count={statistics.properties}/></Link>
            </div>
            <div className="Content">
                <Link to={`#`}><Statistics name="Customers" count={statistics.customers}/> </Link>
            </div>
            <div className="Content">
                <Link to={`#`}> <Statistics name="Owners" count={statistics.owners}/></Link>
            </div>
            <div className="Content">
                <Link to={`#`}><Statistics name="Property Offers" count={statistics.offers}/> </Link>
            </div>

        </div>
    </>
    );
}
export default AdminDashboard;