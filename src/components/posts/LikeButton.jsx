import { useState } from "react";
import "./LikeButton.css";
import PropTypes from "prop-types";

const LikeButton = ({liked, handleLikeClick}) => {
	const [heart, setHeart] = useState(liked);

	const toggleLike = () => {
		heart ? handleLikeClick('like') : handleLikeClick("remove_like");
		setHeart(!heart);
	};

	return (
		<div
			className={`like-button ${heart ? "liked" : ""}`}
			onClick={toggleLike}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				className="heart"
			>
				<defs>
					<linearGradient
						id="gradient"
						x1="0%"
						y1="0%"
						x2="100%"
						y2="100%"
					>
						<stop offset="0%" stopColor="#ff6b6b" />
						<stop offset="100%" stopColor="#ff9472" />
					</linearGradient>
				</defs>
				<path
					d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
					className={`heart-path ${liked ? "filled" : "outlined"}`}
				/>
			</svg>
			<div className={`pulse ${liked ? "pulse-active" : ""}`}></div>
		</div>
	);
};

LikeButton.propTypes = {
	liked: PropTypes.bool.isRequired,
	handleLikeClick: PropTypes.func.isRequired
}

export default LikeButton;
