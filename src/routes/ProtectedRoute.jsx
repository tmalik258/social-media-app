import { Redirect } from "react-router-dom";
import PropTypes from 'prop-types';
import { getUser } from "../hooks/user.actions";

function ProtectedRoute({ children }) {
	const user = getUser();

	return user ? <>{children}</> : <Redirect to="/login/" />;
}

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired,
}

export default ProtectedRoute;
