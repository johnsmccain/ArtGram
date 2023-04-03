import React, { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import Layout from "../containers/Layout";
import { arts as allArt, User } from "../data";
const ArtDetail = ({ user }: any) => {
	const [arts, setArts] = useState<typeof allArt>();
	const [artDetail, setArtDetail] = useState<typeof allArt[0]>();
	const { artId } = useParams();
	// console.log(artId);
	useEffect(() => {
		const filteredArt = allArt.find(art => art.id === Number(artId));
		setArtDetail(filteredArt);
		const similarArts = allArt.filter(
			art => art.category === filteredArt?.category
		);
		setArts(similarArts);
	}, [artId]);
	useEffect(() => { }, []);

	return (
		<div>
			{artDetail && (
				<div
					className="flex xl:flex-row flex-col m-auto bg-white"
					style={{ maxWidth: "1500px", borderRadius: "32px" }}>
					<div className="flex justify-center items-center md:items-start flex-initial">
						<img
							src={artDetail.image}
							alt="Art"
							className="rounded-t-3xl rounded-b-lg"
						/>
					</div>
					<div className="w-full p-5 flex-1 xl:min-w-620">
						<div className="flex items-center justify-between">
							<div className="flex gap-2 items-center">
								<a
									href=""
									className="bg-secondaryColor p-2 text-xl rounded-full flex justify-center items-center text-dark opacity-75 hover:opacity-100">
									<MdDownloadForOffline />
								</a>
							</div>
							<a href={artDetail.image} target="_blank" rel="noreferrer">
								{artDetail.desc.slice(6)}
							</a>
						</div>
						<div>
							<h1 className="text-4xl font-bold break-words">
								{artDetail.name}
							</h1>
							<p className="mt-3">{artDetail.desc}</p>
						</div>
						<Link
							to={`/user/${User.id}`}
							className="flex gap-2 mt-5 items-center bg-white rounded-lg">
							<img
								src={User.image}
								alt="user"
								className="w-10 h-10 rounded-full"
							/>
							<p className="font-bold">{User.name}</p>
						</Link>
						<h2 className="mt-5 text-2xl">Comments</h2>
						<div className="">
							{artDetail.likes.map((art, id) => (
								<div
									className="flex gap-2 mt-5 items-center bg-white rounded-lg"
									key={id}>
									<img
										src={User.image}
										alt=""
										className="w-10 h-10 rounded-full cursor-pointer"
									/>

									<div className="flex flex-col">
										<p className="font-bold">{art.id}</p>
									</div>
								</div>
							))}
						</div>
						<div className="flex flex-wrap mt-6 gap-3">
							<Link to={`/user/${User.id}`}>
								<img
									src={User.image}
									alt="user"
									className="w-10 h-10 rounded-full cursor-pointer"
								/>
							</Link>
							<input
								type="text"
								className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
							/>
							<button
								className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
								type="button">
								Done
							</button>
						</div>
					</div>
				</div>
			)}
			{arts && <h2 className="">More like this</h2>}
			{arts ? <Layout gallery={arts} /> : "Loading More"}
		</div>
	);
};

export default ArtDetail;
