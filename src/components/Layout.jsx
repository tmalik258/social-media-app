import Navbar from "./Navbar";
import PropTypes from "prop-types";

export default function Layout({children}) {
	return (
		<div>
			<Navbar />
			<div className="bg-gradient-to-r from-violet-100 to-white">{children}</div>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node
}