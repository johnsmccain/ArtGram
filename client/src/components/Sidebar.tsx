import React from "react";
import logo from "../images/06.png";
import { RiHomeFill } from "react-icons/ri";
import { Link, NavLink } from "react-router-dom";
import { categories } from "../data";
import { IoIosArrowForward } from "react-icons/io";

const isNotActiveStyle =
	"flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
	"flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";
const Sidebar = ({ closeToggle, user }: any) => {
	const handleClose = () => {
		closeToggle && closeToggle(false);
	};
	return (
		<div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
			<div className="flex flex-col">
				<Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190">
					<img src={logo} alt="logo" className="w-full" />
				</Link>

				<div className="flex flex-col gap-5">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? isActiveStyle : isNotActiveStyle
						}>
						<RiHomeFill />
						Home
					</NavLink>
					<h3 className="mt-2 px-5 text-base">Discover more</h3>
					{categories.slice(0, categories.length - 1).map((cat, key) => (
						<NavLink
							key={key}
							to={`/category/${cat.name}`}
							className={({ isActive }) =>
								isActive ? isActiveStyle : isNotActiveStyle
							}>
							{cat.name}
						</NavLink>
					))}
				</div>
			</div>
			{user && (
				<Link
					to={`/user-profile/${user.id}`}
					className="flex my-5 mb-3 gap-2 items-center bg-white rounded-lg shadow-lg mx-3">
					<img src={user.image} alt="user" className="w-10 h-10 rounded-full" />
					<p>{user.name}</p>
					<IoIosArrowForward />
				</Link>
			)}
		</div>
	);
};

export default Sidebar;
