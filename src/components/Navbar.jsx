import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";

function Navbar() {
	return (
		<div className="flex items-center justify-between px-5 inset-3 fixed max-h-14 rounded-md bg-white shadow-xl">
			<Link to={"/"} className="text-2xl font-semibold">Connectify</Link>
			<ProfileDropdown />
		</div>
	);
}

export default Navbar;
