import { useState } from "react";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

export default function CreatePost() {
	const [show, setShow] = useState(false);
	const user = getUser();

	const handleShow = () => setShow(true);
	const handleClose = () => setShow(false);

	const validationSchema = Yup.object({
		body: Yup.string().required(),
	});

	const initialValues = {
		body: "",
	};

	const onSubmit = async (values) => {
		const data = {
			author: user,
			body: values.body,
		}

		axiosService
			.post("/posts/", data)
			.then(() => {
				handleClose();
			})
			.catch(err => {
				console.log(err);
			});
	};

	const renderError = (message) => (
		<p className="text-red-600 text-xs rounded">{message}</p>
	);

	return (
		<>
			<div className="container">
				<div className="field">
					<div className="control">
						<input
							name="body"
							type="text"
							className="w-full bg-violet-50 px-3 py-2 rounded mb-1 outline-none"
							placeholder="What are you thoughts today...?"
							onClick={handleShow}
						/>
					</div>
				</div>
			</div>
			{show && (
				<div className="model">
					<h2>Create Post</h2>
					<Formik
						validationSchema={validationSchema}
						initialValues={initialValues}
						onSubmit={async (values, { resetForm }) => {
							await onSubmit(values);
							resetForm;
						}}
					>
						{({ isValid, dirty }) => (
							<Form>
								<div className="container">
									<div className="field">
										<div className="control">
											<Field
												name="body"
												as="textarea"
												rows={3}
												className="w-full bg-violet-50 px-3 py-2 rounded mb-1 outline-none"
												placeholder="What are your thoughts today...?"
											/>
											<ErrorMessage
												name="body"
												render={renderError}
											/>
										</div>
										<button
											type="submit"
											className={`bg-neutral-950 hover:bg-neutral-800 transition-all duration-300 text-white w-max ms-auto rounded-md p-2 px-8 ${
												!(isValid && dirty)
													? "opacity-50 cursor-not-allowed"
													: ""
											}`}
											disabled={!(isValid && dirty)}
										>
											Post
										</button>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			)}
		</>
	);
}
