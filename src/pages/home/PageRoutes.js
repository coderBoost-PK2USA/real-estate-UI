import {Navigate, Route, Routes} from "react-router";
import NewAccount from "../../components/NewAccount/NewAccount";
import Properties from "../../containers/Properties/Properties";

function PageRoutes() {

    return (<Routes>
        <Route path="/" element={<Navigate to={"/home"}/>}></Route>
        <Route path="/home" element={<Properties/>}></Route>
        <Route path="/new-account" element={<NewAccount/>}></Route>
    </Routes>)
}

export default PageRoutes
