import {Navigate, Route, Routes} from "react-router";
import NewAccount from "../../components/NewAccount/NewAccount";
import Properties from "../../containers/Properties/Properties";
import Login from "../../components/Login/Login";
import ReviewOwner from "../../components/Owner/ReviewOwner";
import PropertyOffers from "../../containers/PropertyOffers/PropertyOffers";

function PageRoutes() {

    return (<Routes>
        <Route path="/" element={<Navigate to={"/home"}/>}></Route>
        <Route path="/home" element={<Properties/>}></Route>
        <Route path="/new-account" element={<NewAccount/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/review-owners" element={<ReviewOwner/>}></Route>
        <Route path="/property-offers" element={<PropertyOffers/>}></Route>
    </Routes>)
}

export default PageRoutes