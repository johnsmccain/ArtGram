import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Sidebar } from "../components";
import logo from "../images/06.png";
import { User } from "../data";
const Home = () => {
	const [toggle, setToggle] = useState(false);
	return (
		<div className="h-screen bg-gray-50 flex md:flex-row flex-col duration-75 transition-height ease-out">
			<div className="h-screen hidden md:flex flex-initial">
				<Sidebar user={User} />
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
						<img src={User.image} alt="User" className="w-9" />
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
						<Sidebar user={User} closeToggle={setToggle} />
					</div>
				)}
			</div>
			<div className="pb-2">User Or Arts</div>
		</div>
	);
};

export default Home;
