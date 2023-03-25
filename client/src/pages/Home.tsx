import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Profile, Sidebar } from "../components";
import logo from "../images/06.png";
import { User } from "../data";
import Gallery from "../containers/Gallery";
import { useUserAuth } from "../context/Auth";
const Home = () => {
	const [toggle, setToggle] = useState(false);
	const { getUser } = useUserAuth();
	return (
		<div className="h-screen bg-gray-50 flex md:flex-row flex-col duration-75 transition-height ease-out">
			<div className="h-screen hidden md:flex flex-initial">
				<Sidebar user={getUser()} />
			</div>

			<div className="flex md:hidden flex-row  w-full">
				<div className="flex p-2 w-full flex-row justify-between items-center shadow-md">
					<HiMenu
						fontSize={40}
						onClick={() => setToggle(true)}
						className="cursor-pointer"
					/>
					<Link to="/">
						<img src={logo} alt="logo" className="w-28" />
					</Link>
					<Link to={`/user-profile${323}`}>
						<img
							src={getUser()?.photoURL || User.image}
							alt="User"
							className="w-9"
						/>
					</Link>
				</div>
				{toggle && (
					<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
						<div className="absolute  w-full flex justify-end items-center p-2">
							<AiFillCloseCircle
								fontSize={30}
								onClick={() => setToggle(false)}
							/>
						</div>
						<Sidebar user={getUser()} closeToggle={setToggle} />
					</div>
				)}
			</div>
			<div className="pb-2 flex-1 h-screen overflow-y-scroll">
				<Routes>
					<Route path="/user-profile/:userId" element={<Profile />} />
					<Route path="/*" element={<Gallery />} />
				</Routes>
			</div>
		</div>
	);
};

export default Home;
