import Navbar from "./Navbar";

export default function Layout({children}) {
	return (
		<div>
			<Navbar />
			<div className="bg-gradient-to-r from-violet-100 to-white">{children}</div>
		</div>
	);
}
