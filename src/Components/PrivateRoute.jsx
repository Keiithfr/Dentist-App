import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token || token === "undefined" || token === "null") {
        return <Navigate to="/login" />
    }

    return children;
};

export default PrivateRoute;