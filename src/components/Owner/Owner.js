import "./ReviewOwner/OwnerReview.css"
import {useState} from "react";

function Owner(props) {

    const [isActive, setIsActive] = useState(false);

    const handleIsActiveBtn = () => {
        setIsActive(!isActive);
    }


    return (<div className="img-div">
        <img src="https://miro.medium.com/proxy/0*pAdZLfSqNrMZAAPA.jpg"/>
        <h1>{props.name}</h1>
        <input type="button" value={isActive ? "Enabled" : "Disabled"} onClick={handleIsActiveBtn}/>
    </div>);
}

export default Owner;