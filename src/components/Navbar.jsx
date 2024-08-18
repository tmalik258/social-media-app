import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
	return (
		<div className="flex items-center justify-between p-3 px-5 bg-black text-white">
			<Link to={"/"} className="logo">Connectify</Link>
			<Link to={"/"}><ProfileDropdown /></Link>
		</div>
	);
}

export default Navbar;
