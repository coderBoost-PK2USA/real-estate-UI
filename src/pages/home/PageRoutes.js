import {Navigate, Route, Routes} from "react-router";
import NewAccount from "../../components/NewAccount/NewAccount";
import Properties from "../../containers/Properties/Properties";
import Login from "../../components/Login/Login";
import ReviewOwnerList from "../../components/Owner/ReviewOwner/ReviewOwnerList";
import PropertyOffers from "../../containers/PropertyOffers/PropertyOffers";
import OwnerDetail from "../../components/Owner/OwnerDetail";
import PropertyDetails from "../../components/PropertyDetails/PropertyDetails";
import NewProperty from "../../components/NewProperty/NewProperty";

function PageRoutes() {

    return (<Routes>
        <Route path="/" element={<Navigate to={"/home"}/>}></Route>
        <Route path="/home" element={<Properties/>}></Route>
        <Route path="/new-account" element={<NewAccount/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/review-owners" element={<ReviewOwnerList/>}></Route>
        <Route path="/review-detail/:id" element={<OwnerDetail/>}></Route>
        <Route path="/add-property" element={<NewProperty/>}></Route>
        <Route path="/manage-property/:id" element={<PropertyDetails/>}></Route>
        <Route path="/manage-property/:id/offers" element={<PropertyOffers/>}></Route>

    </Routes>)
}

export default PageRoutes