import Layout from "../components/Layout";
import CreatePost from "../components/posts/CreatePost";
import Post from "../components/posts/Post";
import { getUser } from "../hooks/user.actions";
import { fetcher } from "../helpers/axios";
import useSWR from "swr";

function Home() {
	const posts = useSWR("/posts/", fetcher, {
		refreshInterval: 1000,
	});
	const user = getUser();

	if (!user) {
		return <div>Loading!</div>;
	}

	return (
		<Layout>
			<div className="container mx-auto flex justify-between min-h-[50em]">
				<div className="flex flex-col gap-3 grow-[2] bg-white shadow-lg rounded-lg p-3">
					<CreatePost />
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
						{
							posts.data?.results.map((post, index) => <Post key={index} post={post} refresh={posts.mutate} />)
						}
						
						{/* <Post />
						<Post />
						<Post />
						<Post />
						<Post /> */}
					</div>
				</div>
				<div className="flex flex-col grow-1 min-w-96"></div>
			</div>
		</Layout>
	);
}

export default Home;
