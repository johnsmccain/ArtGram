import React, { useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import { AiTwotoneDelete } from "react-icons/ai";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { arts, User } from "../data";

const likeBtnStyles =
	"bg-red-500 opacity-70 hover:opacity-100 text-white font-bold py-1 px-5 text-base rounded-3xl hover:shadow-md outline-none";
const Art = ({ art }: any) => {
	const [artHover, setArtHover] = useState(false);
	const [likeArt, setLikeArt] = useState(false);
	const navigate = useNavigate();
	let liked = art?.likes.filter((item: any) => item?.id === User.id);
	liked = liked.length > 0 ? liked : [];
	// console.log(liked);
	return (
		<div className="m-2">
			<div
				onMouseEnter={() => setArtHover(true)}
				onMouseLeave={() => setArtHover(false)}
				onClick={() => navigate(`/art-detail/${art.id}`)}
				className="relative cursor-zoom-in hover:shadow-md w-auto rounded-lg transition-all overflow-hidden ease-in-out duration-500">
				{art?.image && (
					<img src={art.image} alt="art" className="rounded-lg w-full" />
				)}
				{artHover && (
					<div
						className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-1 pt-2 pb-2 z-50"
					// style={{ height: "100%" }}
					>
						<div className="flex items-center justify-between">
							<div className="flex gap-2">
								<a
									href={`${art.image}`}
									download
									className="p-2 bg-white rounded-full w-9 h-9 flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none">
									<MdDownloadForOffline />
								</a>
							</div>
							{liked.length !== 0 ? (
								<button className={likeBtnStyles}>
									{art.likes.length} Likes
								</button>
							) : (
								<button className={likeBtnStyles}>
									{art.likes.length} {likeArt ? "Liking" : "Like"}
								</button>
							)}
						</div>
						<div className="flex justify-between items-center gap-2 w-full">
							{
								<a
									href={art.image}
									target="_blank"
									className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
									rel="noreferrer">
									<BsFillArrowUpRightCircleFill />
									{art.desc.slice(8)}
								</a>
							}
							{art.user === User.name && (
								<button
									type="button"
									className="bg-white w-8
								h-8 flex items-center justify-center rounded-full opacity-70 hover:opacity-100 hover:shadow-lg outline-none text-black">
									<AiTwotoneDelete />
								</button>
							)}
						</div>
					</div>
				)}
			</div>
			<Link
				to={`/user-profile/${User.id}`}
				className="flex items-center gap-2 mt-2">
				<img
					src={User.image}
					alt="user"
					className="w-8 h-8 rounded-full object-cover"
				/>
				<p className="font-semibold capitalize">{User.name}</p>
			</Link>
		</div>
	);
};

export default Art;
