import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/Auth";
import { User } from "../data";
const Navbar = ({ searchTerm, setSearchTerm }: any) => {
	const navigate = useNavigate();
	const { getUser } = useUserAuth();
	// console.log(getUser());
	return (
		<div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
			<div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
				<IoMdSearch fontSize={21} className="ml-1" />
				<input
					type="text"
					placeholder="Search"
					onFocus={() => navigate("/search")}
					value={searchTerm}
					onChange={e => setSearchTerm(e?.target?.value)}
					className="p-2 w-full bg-white outline-none"
				/>
			</div>
			<div className="flex gap-3">
				<Link to={`/user-profile/:${User.id}`}>
					<img
						src={getUser()?.photoURL || User.image}
						alt="User"
						className="w-14 h-12 rounded-lg"
					/>
				</Link>
				<Link
					to="/create-art"
					className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
					<IoMdAdd />
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
