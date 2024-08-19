import axios from "axios";
import { useNavigate } from "react-router-dom";

function useUserActions() {
	const navigate = useNavigate();
	const baseURL = "http://localhost:8000/api";

	return { login, register, logout };

	// Login the user
	async function login (data) {
		return axios.post(`${baseURL}/auth/login/`, data).then((res) => {
			// Registering the account and tokens in the store
			setUserData(res.data);
			navigate("/");
		});
	};

	// Logout the user
	function logout () {
		localStorage.removeItem("auth");
		navigate("/login");
	};

	// Register the user
	async function register (data) {
		return axios.post(`${baseURL}/auth/register/`, data).then((res) => {
			// Registering the account and tokens in the store
			setUserData(res.data);
			navigate("/");
		});
	};
}

	// Get the user
	const getUser = () => {
		const auth = JSON.parse(localStorage.getItem("auth"));
		return auth?.user;
	}

	// Get the access token
	const getAccessToken = () => {
		const auth = JSON.parse(localStorage.getItem("auth"));
		return auth.access;
	}

	// Get the refresh token
	const getRefreshToken = () => {
		const auth = JSON.parse(localStorage.getItem("auth"));
		return auth.refresh;
	}

	// Set the access, token and user property
	const setUserData = (data) => {
		localStorage.setItem("auth", JSON.stringify({
			access: data.access,
			refresh: data.refresh,
			user: data.user,
		}))
	}

export {useUserActions, getUser, getAccessToken, getRefreshToken};
