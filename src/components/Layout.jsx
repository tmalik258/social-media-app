import Navbar from "./Navbar";
import PropTypes from "prop-types";

export default function Layout({children}) {
	return (
		<>
			<Navbar />
			<div className="bg-gradient-to-r from-violet-100 to-white pt-20 px-4">{children}</div>
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node
}