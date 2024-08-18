import { Navigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { getUser } from "../hooks/user.actions";

function ProtectedRoute({ children }) {
	const user = getUser();

	return user ? <>{children}</> : <Navigate to="/login/" />;
}

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ProtectedRoute;
