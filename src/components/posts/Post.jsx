import { useEffect, useRef, useState } from "react";
import axiosService from "../../helpers/axios";
import { randomAvatar } from "../../utils";
import { RiSendPlaneLine } from "react-icons/ri";
import { MdOutlineModeComment } from "react-icons/md";
import LikeButton from "./LikeButton";
import PropTypes from "prop-types";
import { getUser } from "../../hooks/user.actions";
// import { format } from "timeago.js";

export default function Post(props) {
	const { post, refresh } = props;
	const [showDropDown, setShowDropDown] = useState(false);
	const excludedElementRef = useRef(null);
	const user = getUser();

	const handleDropDown = () => {
		setShowDropDown((prev) => !prev);
	};

	const handleLikeClick = (action) => {
		axiosService
			.post(`/posts/${post.id}/${action}/`)
			.then(() => {
				refresh();
			})
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				excludedElementRef.current &&
				!excludedElementRef.current.contains(event.target)
			) {
				setShowDropDown(false);
			}
		}

		// Add event listener
		document.addEventListener("mousedown", handleClickOutside);

		// Cleanup the event listener on component unmount
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<div className="flex flex-col w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
			<div className="flex justify-between items-center">
				<img
					className="w-10 h-10 rounded-full shadow-xl"
					src={randomAvatar()}
					alt="Profile"
				/>
				{user.username === post.author.username && (
					<div className="relative" ref={excludedElementRef}>
						<button
							className="inline-block text-gray-500 bg-gray-100 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
							type="button"
							onClick={handleDropDown}
						>
							<span className="sr-only">Open dropdown</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="currentColor"
								viewBox="0 0 16 3"
							>
								<path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
							</svg>
						</button>
						{/* Dropdown menu */}
						{showDropDown && (
							<div className="z-10 absolute top-0 right-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg ring-1 ring-gray-200 shadow-xl w-44 ">
								<ul className="p-2">
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
										>
											Edit
										</a>
									</li>
									<li>
										<a
											href="#"
											className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
										>
											Delete
										</a>
									</li>
								</ul>
							</div>
						)}
					</div>
				)}
			</div>
			<div className="flex flex-col grow-[1] justify-center my-3 leading-normal text-gray-700">
				{post.body}
			</div>
			<div className="flex gap-3 items-center text-gray-800 select-none">
				<div className="flex items-center gap-1">
					<LikeButton
						liked={post.liked}
						handleLikeClick={handleLikeClick}
					/>
					{post.likes_count}
				</div>
				<div className="flex items-center gap-1">
					<div className="cursor-pointer relative top-[0.1em]">
						<MdOutlineModeComment size={21} />
					</div>
					110K
				</div>
				<div className="flex items-center gap-1">
					<div className="cursor-pointer">
						<RiSendPlaneLine size={24} />
					</div>
					2.4K
				</div>
			</div>
			<div className="text-gray-500 ms-1">
				<small>@username | 9 minutes ago</small>
			</div>
			{/* <div><small>{format(post.created)}</small></div> */}
		</div>
	);
}

Post.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.string.isRequired,
		body: PropTypes.string.isRequired,
		likes_count: PropTypes.number.isRequired,
		liked: PropTypes.bool.isRequired,
		author: PropTypes.shape({
			username: PropTypes.string.isRequired,
		}),
	}),
	refresh: PropTypes.func.isRequired,
};
