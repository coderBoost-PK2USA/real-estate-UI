import {useRef, useState} from "react";
import axios from "axios";
import {CUSTOMER_URL, OFFER_URL} from "../../constants/endpoints";
import {getAuthHeader} from "../AuthServices/Auth";
import {useNavigate} from "react-router";
import jsPDF from "jspdf";

const HistoryOffers = (props) => {
    const [selectedStatus, setSelectedStatus] = useState(props.offerStatus);
    const navigate = useNavigate();
    const offersListRef = useRef();


    const token = localStorage.getItem('token')

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            format: 'a1',
            unit: 'px',
        });

        // Adding the fonts.
        doc.setFont('Inter-Regular', 'normal');

        doc.html(offersListRef.current, {
            async callback(doc) {
                await doc.save('document');
            },
        });
    };


    const changeOfferStatus = (e) => {
        if (props.offerStatus === 'ACCEPTED') {
            alert('Offer is finalized, You can not Cancel this Offer.');
        } else {
            setSelectedStatus(e.target.value);
            postChangeOfferStatus(e.target.value);

        }
    };

    const postChangeOfferStatus = (status) => {


        axios.put(OFFER_URL+"/"+props.id, status, {headers: getAuthHeader(token)})
            .then(response => {
              console.log("Offer Status Changed")
            })
            .catch(error => console.log(error.message))
    }

    return (
        <div className="img-div" style={{width: 'auto'}} ref={offersListRef}>
            <img
                style={{width: '30%'}}
                src="https://yardzen.com/wp-content/uploads/2022/07/Modern-Farmhouse_Kate-Derby.jpg"
            ></img>
            <h2>PROPERTY: {props.propertyName} Property</h2>
            <h6>Details: {props.propertyDetails}</h6>
            <h6>Price: {props.offeredPrice}$</h6>
            <h5>STATUS: {props.offerStatus === 'ACCEPTED' ? 'ACCEPTED' : selectedStatus}</h5>
            {props.offerStatus !== 'ACCEPTED' && (
                <><label>Change Availability</label>
                    <select value={selectedStatus} onChange={changeOfferStatus}>
                        <option value="AVAILABLE">AVAILABLE</option>
                        <option value="CANCELED">CANCEL</option>
                    </select>


                </>
            )}
            {props.offerStatus === 'ACCEPTED' && (
                <button onClick={handleGeneratePdf }>Download PDF</button>

            )}
            <p id={props.ownerId}>OWNER: {props.ownerName}</p>
        </div>
    );
};

export default HistoryOffers;
