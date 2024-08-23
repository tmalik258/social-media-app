import { useState } from "react";
import axiosService from "../../helpers/axios";
import { getUser } from "../../hooks/user.actions";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { RxCross2 } from "react-icons/rx";
import { randomAvatar } from "../../utils";
import Toaster from "../Toaster";

export default function CreatePost() {
	const [show, setShow] = useState(false);
	const [showToast, setShowToast] = useState(false);
	const [toastMessage, setToastMessage] = useState("");
	const [toastType, setToastType] = useState("");

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
			author: user.id,
			body: values.body,
		};

		axiosService
			.post("/posts/", data)
			.then(() => {
				handleClose();
				setToastMessage("Post created successfully");
				setToastType("green");
				setShowToast(true);
				setTimeout(() => {
					setShowToast(false);
				}, 4000);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<>
			<div className="flex gap-3 items-center">
				<div className="flex items-center justify-center rounded-full overflow-hidden p-1 bg-white text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-violet-300 hover:bg-gray-50">
					<img
						src={randomAvatar()}
						alt="pfp"
						width={40}
						height={40}
						className="rounded-full"
					/>
				</div>
				<div className="grow-[1]">
					<input
						name="body"
						type="text"
						className="w-full bg-violet-50 px-3 py-2 rounded outline-none shadow-md"
						placeholder="What are you thoughts today...?"
						readOnly
						onClick={handleShow}
					/>
				</div>
			</div>
			{show && (
				<Formik
					validationSchema={validationSchema}
					initialValues={initialValues}
					onSubmit={async (values, { resetForm }) => {
						await onSubmit(values);
						resetForm;
					}}
				>
					{({ isValid, dirty }) => (
						<Form className="fixed z-10 bg-gray-500/30 w-screen h-screen top-0 left-0 flex justify-center items-center">
							<div className="relative container mx-auto w-full sm:w-[25em] transition-all duration-1000 flex flex-col gap-3 text-2xl shadow-lg bg-white rounded-md p-12">
								<div
									className="absolute top-5 right-5 cursor-pointer"
									onClick={handleClose}
								>
									<RxCross2 />
								</div>
								<h2>Create Post</h2>
								<div className="field">
									<Field
										name="body"
										as="textarea"
										rows={5}
										autoFocus={true}
										className="w-full bg-violet-50 px-3 py-2 rounded mb-1 outline-none resize-none"
										placeholder="What are your thoughts today...?"
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
						</Form>
					)}
				</Formik>
			)}

			{showToast && (
				<Toaster
					handleClose={() => setShowToast(false)}
					message={toastMessage}
					type={toastType}
				/>
			)}
		</>
	);
}
