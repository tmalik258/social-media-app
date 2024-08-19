import { randomAvatar } from "../utils";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function ProfileDropdown() {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const navigate = useNavigate();

	const handleDropdownToggle = () => {
		setDropdownOpen((prev) => !prev);
	};

	const handleLogout = () => {
		localStorage.removeItem("auth");
		navigate('/login/');
	}

	return (
		<div className="relative inline-block text-left">
			<div>
				<div
					className="flex items-center justify-center rounded-full overflow-hidden p-1 bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-violet-300 hover:bg-gray-50 cursor-pointer"
					onClick={handleDropdownToggle}
				>
					<img
						src={randomAvatar()}
						alt="profile"
						width={40}
						height={40}
						className="rounded-full"
					/>
				</div>
			</div>

			<div className={`absolute right-0 z-10 mt-2 w-60 p-2 origin-top-right rounded-md bg-white shadow-lg transition outline-none transform ${dropdownOpen ? 'opacity-100 ' : 'opacity-0'} duration-100 ease-in-out`}>
				<div className="py-1">
					<div>
						<Link
							href="#"
							className="block px-4 py-2 rounded-t-md rounded-sm text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
						>
							Account settings
						</Link>
					</div>
					<div>
						<Link
							href="#"
							className="block px-4 py-2 rounded-sm text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
						>
							Support
						</Link>
					</div>
					<div>
						<Link
							href="#"
							className="block px-4 py-2 rounded-sm text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
						>
							License
						</Link>
					</div>
					<div>
						<button
							type="submit"
							className="block w-full px-4 py-2 rounded-b-lg rounded-sm text-left text-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900"
							onClick={handleLogout}
						>
							Sign out
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
