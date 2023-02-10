import "./NewProperty.css"
import {useNavigate} from "react-router";
import {useRef, useState} from "react";
import axios from "axios";
import {PROPERTY_URL} from "../../constants/endpoints";


function NewProperty() {

    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const newPropertyForm = useRef();

    const [images, setImages] = useState([]);

    const handleImageChange = (e) => {
        setImages(Array.from(e.target.files));
    };

    const addNewProperty = () => {
        console.log(images)
        const form = newPropertyForm.current;
        const ownerId = localStorage.getItem("ownerId")

        console.log(ownerId)

        const propertyData = {
            name: form['name'].value,
            detail: form['detail'].value,
            category: form['category'].value,
            status: "AVAILABLE",
            isActive: true,
            price: form['price'].value,
            ownerId: ownerId,
            address: form['address'].value,
            latitude: form['latitude'].value,
            longitude: form['longitude'].value,
            images: images
        }

        axios.post(PROPERTY_URL, propertyData, {headers: {"Authorization": `Bearer ${token}`}})
            .then(response => {
                console.log(response.data)
                navigate("/home")
            })
            .catch(error => {
                console.error('Error while creating new property, error=', error.message);
            })
    }

    return (
        <div className="NewProperty">
            <form ref={newPropertyForm}>
                <h3>Add New Property</h3>

                <label>Building Name:</label>
                <input type="text"
                       label={'name'}
                       name={'name'}
                />

                <label>Details:</label>
                <input type="test"
                       label={'detail'}
                       name={'detail'}
                />

                <label>Category:</label>
                <select name={'category'} label={'category'}>
                    <option value="HOUSE">HOUSE</option>
                    <option value="APARTMENT">APARTMENT</option>
                    <option value="RESIDENTIAL">RESIDENTIAL</option>
                    <option value="COMMERCIAL">COMMERCIAL</option>
                </select>

                <label>Price ($):</label>
                <input type="text"
                       label={'price'}
                       name={'price'}
                />

                <label>Complete Address:</label>
                <input type="text"
                       label={'address'}
                       name={'address'}
                />

                <label>Latitude:</label>
                <input type="text"
                       label={'latitude'}
                       name={'latitude'}
                />

                <label>Longitude:</label>
                <input type="text"
                       label={'longitude'}
                       name={'longitude'}
                />

                <label>Upload Property Images:</label>
                <input type="file" multiple onChange={handleImageChange}/>
            </form>
            <button onClick={addNewProperty}>Add Property</button>
        </div>
    )
        ;
}

export default NewProperty