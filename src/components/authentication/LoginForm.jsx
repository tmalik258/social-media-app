import { ErrorMessage, Field, Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { useUserActions } from "../../hooks/user.actions";

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
		userActions.login(data)
			.catch((err) => {
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
				<div className="container mx-auto w-full sm:w-96 flex flex-col gap-2 text-left bg-white rounded-md p-10">
					{error && (
						<div className="p-3 bg-red-300 text-xs mb-3 rounded">
							{error}
						</div>
					)}
					<div className="field">
						{/* <label className="label" htmlFor="username">
									Username
								</label> */}
						<div className="control">
							<Field
								name="username"
								type="text"
								className="w-full bg-violet-50 px-3 py-2 rounded mb-1 outline-none"
								placeholder="Username"
							/>
							<ErrorMessage
								name="username"
								render={renderError}
							/>
						</div>
					</div>
					<div className="field">
						{/* <label className="label" htmlFor="password">
									Password
								</label> */}
						<div className="control">
							<Field
								name="password"
								type="password"
								className="w-full bg-violet-50 px-3 py-2 rounded mb-1 outline-none"
								placeholder="Password"
							/>
							<ErrorMessage
								name="password"
								render={renderError}
							/>
						</div>
					</div>
					<button
						type="submit"
						className="bg-neutral-950 hover:bg-neutral-800 transition-all duration-300 text-white w-max ms-auto rounded-md p-2 px-8"
					>
						Sign In
					</button>
				</div>
			</Form>
		</Formik>
	);
}

export default LoginForm;
