import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import { useUserActions } from "../../hooks/user.actions";
import { Link } from "react-router-dom";

function RegisterForm() {
	const [error, setError] = useState(null);
	const userActions = useUserActions();

	const validationSchema = Yup.object({
		first_name: Yup.string().required("First Name is required"),
		last_name: Yup.string().required("Last Name is required"),
		username: Yup.string().required("Username is required"),
		email: Yup.string().email().required("Email is required"),
		bio: Yup.string().optional(),
		password: Yup.string()
			.required("Password is required")
			.min(8, "Password must be at least 8 characters."),
		confirm_password: Yup.string()
			.required("Confirm Password is required")
			.oneOf([Yup.ref("password")], "Password must match"),
	});

	const initialValues = {
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		bio: "",
		password: "",
		confirm_password: "",
	};

	const onSubmit = async (data) => {
		userActions.register(data).catch((err) => {
			if (err.message) setError(err.response.data?.detail);
		});
	};

	const renderError = (message) => (
		<p className="text-red-600 text-xs rounded">{message}</p>
	);

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={async (values, { resetForm }) => {
				await onSubmit(values);
				resetForm;
			}}
		>
			{({ errors, touched }) => (
				<Form>
					<div className="container mx-auto w-full min-w-[23em] sm:w-[35em] flex flex-col gap-2 shadow-lg text-2xl bg-white rounded-md p-12">
						<h1 className="text-4xl mb-3 font-semibold">Register for Free</h1>
						{error && (
							<div className="p-3 bg-red-300 text-xs mb-3 rounded">
								{error}
							</div>
						)}
						<div className="flex max-sm:flex-col gap-3">
							<div className="flex-1">
								{/* <label className="label" htmlFor="first_name">
										First Name
									</label> */}
									<Field
										name="first_name"
										type="text"
										className={`w-full bg-violet-50 px-4 py-3 rounded-lg mb-1 outline-none ${
											errors.first_name &&
											touched.first_name
												? "border-red-500 border"
												: ""
										}`}
										placeholder="First Name"
									/>
									<ErrorMessage
										name="first_name"
										render={renderError}
									/>
							</div>
							<div className="flex-1">
								{/* <label className="label" htmlFor="last_name">
										Last Name
									</label> */}
									<Field
										name="last_name"
										type="text"
										className={`w-full bg-violet-50 px-4 py-3 rounded-lg mb-1 outline-none ${
											errors.last_name &&
											touched.last_name
												? "border-red-500 border"
												: ""
										}`}
										placeholder="Last Name"
									/>
									<ErrorMessage
										name="last_name"
										render={renderError}
									/>
							</div>
						</div>
						<div>
							{/* <label className="label" htmlFor="username">
									Username
								</label> */}
								<Field
									name="username"
									type="text"
									className={`w-full bg-violet-50 px-4 py-3 rounded-lg mb-1 outline-none ${
										errors.username && touched.username
											? "border-red-500 border"
											: ""
									}`}
									placeholder="Username"
								/>
								<ErrorMessage
									name="username"
									render={renderError}
								/>
						</div>
						<div>
							{/* <label className="label" htmlFor="email">
									Email address
								</label> */}
								<Field
									name="email"
									type="email"
									className={`w-full bg-violet-50 px-4 py-3 rounded-lg mb-1 outline-none ${
										errors.email && touched.email
											? "border-red-500 border"
											: ""
									}`}
									placeholder="Email address"
								/>
								<ErrorMessage
									name="email"
									render={renderError}
								/>
						</div>
						<div>
							{/* <label className="label" htmlFor="bio">
									Bio
								</label> */}
								<Field
									name="bio"
									as="textarea"
									rows={3}
									className={`w-full bg-violet-50 px-4 py-3 rounded-lg mb-1 outline-none resize-none ${
										errors.bio && touched.bio
											? "border-red-500 border"
											: ""
									}`}
									placeholder="A simple bio ... (Optional)"
								/>
								<ErrorMessage name="bio" render={renderError} />
						</div>
						<div>
							{/* <label className="label" htmlFor="password">
									Password
								</label> */}
								<Field
									name="password"
									type="password"
									className={`w-full bg-violet-50 px-4 py-3 rounded-lg mb-1 outline-none ${
										errors.password && touched.password
											? "border-red-500 border"
											: ""
									}`}
									placeholder="Password"
								/>
								<ErrorMessage
									name="password"
									render={renderError}
								/>
						</div>
						<div>
							{/* <label className="label" htmlFor="confirm_password">
									Confirm Password
								</label> */}
								<Field
									name="confirm_password"
									type="password"
									className={`w-full bg-violet-50 px-4 py-3 rounded-lg mb-1 outline-none ${
										errors.confirm_password &&
										touched.confirm_password
											? "border-red-500 border"
											: ""
									}`}
									placeholder="Confirm Password"
								/>
								<ErrorMessage
									name="confirm_password"
									render={renderError}
								/>
						</div>
						<button
							type="submit"
							className="bg-neutral-950 hover:bg-neutral-800 transition-all duration-300 text-white w-max ms-auto rounded-md p-2 px-8"
						>
							Sign Up
						</button>
						<div>Already have an account? <Link to={'/login/'} className="text-violet-800 hover:text-violet-900 underline">Sign In</Link></div>
					</div>
				</Form>
			)}
		</Formik>
	);
}

export default RegisterForm;
