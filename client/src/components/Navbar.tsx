import React from "react";
import { IoMdAdd, IoMdSearch } from "react-icons/io";
import { Link } from "react-router-dom";
import { User } from "../data";
const Navbar = () => {
	return (
		<div className="flex">
			<div className="flex">
				<IoMdSearch />
				<input type="text" />
			</div>
			<div className="flex">
				<Link to="/user-profile">
					<img src={User.image} alt="User" className="" />
				</Link>
				<Link to="/create-art">
					<IoMdAdd />
				</Link>
			</div>
		</div>
	);
};

export default Navbar;
