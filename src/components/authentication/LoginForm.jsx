import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useUserActions } from "../../hooks/user.actions";
import { Link } from "react-router-dom";

function LoginForm() {
	const [error, setError] = useState(null);
	const userActions = useUserActions();

	const validationSchema = Yup.object({
		username: Yup.string().required("Username is required"),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password must be atleast 8 characters"),
	});

	const initialValues = {
		username: "",
		password: "",
	};

	const onSubmit = async (data) => {
		userActions.login(data).catch((err) => {
			if (err.message) setError(err.response.data?.detail);
		});
	};

	const renderError = (message) => (
		<p className="text-red-600 text-xs rounded">{message}</p>
	);

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={initialValues}
			onSubmit={async (values, { resetForm }) => {
				await onSubmit(values);
				resetForm;
			}}
		>
			<Form>
				<div className="container mx-auto w-full sm:w-[25em] flex flex-col gap-3 text-2xl shadow-lg bg-white rounded-md p-12">
					<h1 className="text-4xl mb-2 font-semibold">Login</h1>
					{error && (
						<div className="p-3 bg-red-300 text-xs mb-3 rounded">
							{error}
						</div>
					)}
					<div>
						{/* <label className="label" htmlFor="username">
									Username
								</label> */}
						<Field
							name="username"
							type="text"
							className="w-full bg-violet-50 px-4 py-3 rounded-lg mb-1 outline-none"
							placeholder="Username"
						/>
						<ErrorMessage name="username" render={renderError} />
					</div>
					<div>
						{/* <label className="label" htmlFor="password">
									Password
								</label> */}
						<Field
							name="password"
							type="password"
							className="w-full bg-violet-50 px-4 py-3 rounded-lg mb-1 outline-none"
							placeholder="Password"
						/>
						<ErrorMessage name="password" render={renderError} />
					</div>
					<button
						type="submit"
						className="bg-neutral-950 hover:bg-neutral-800 transition-all duration-300 text-white w-max ms-auto rounded-md p-2 px-8"
					>
						Sign In
					</button>
					<div>
						Haven&apos;t Registered yet?{" "}
						<Link
							to={"/register/"}
							className="text-violet-800 hover:text-violet-900 underline"
						>
							Sign Up
						</Link>
					</div>
				</div>
			</Form>
		</Formik>
	);
}

export default LoginForm;
