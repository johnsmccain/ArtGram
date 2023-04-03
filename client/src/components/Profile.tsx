import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import { arts as artG } from "../data";
import { User } from "../types";

interface profileProps {
	user: User;
}

const activeBtnStyles =
	"bg-red-500 text-white font-bold p-2 rounded-full outline-none w-20";
const notActiveBtnStyles =
	"bg-primary mr-4  text-black font-bold p-2 rounded-full w-20 outline-none";



const Profile: React.FC<profileProps> = ({ user }) => {
	const [text, setText] = useState("Created");
	const [activeBtn, setActiveBtn] = useState("created");
	const [arts, setArts] = useState(artG);
	useEffect(() => {
		if (text === "Created") {
			setArts(artG);
			// console.log(text);
		} else {
			setArts([]);
			// console.log(text);
		}
	}, [text]);

	return (
		<div className="relative pb-2 h-full justify-center items-center">
			<div className="flex flex-col pb-5">
				<div className="relative flex flex-col mb-7">
					<div className="flex flex-col justify-center items-center">
						<img
							src={user?.profileImage}
							alt="user"
							className="w-full h-370 2xl:h-510 shadow-lg object-cover"
						/>
						<img
							src={user?.profileImage}
							alt="user"
							className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
						/>
					</div>
					<h1 className="font-bold text-3xl text-center mt-3">{user?.name}</h1>
					<div className="absolute">{ }</div>
				</div>
				<div className="text-center mb-7">
					<button
						type="button"
						onClick={() => {
							setText("Created");
							setActiveBtn("created");
						}}
						className={`${activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
							} `}>
						Created
					</button>
					<button
						onClick={() => {
							setText("Liked");
							setActiveBtn("liked");
						}}
						type="button"
						className={`${activeBtn === "liked" ? activeBtnStyles : notActiveBtnStyles
							} `}>
						Liked
					</button>
				</div>
				<div className="px-2">
					<Layout gallery={arts && arts} />
				</div>
				{arts?.length === 0 && (
					<div className="flex w-full justify-center items-center text-1xl mt-2 font-bold">
						No Art Found!
					</div>
				)}
			</div>
		</div>
	);
};

export default Profile;
