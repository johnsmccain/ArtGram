import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { ArtDetail, CreateArt, Navbar, Search } from "../components";
import { User as user } from "../data";
import Feed from "./Feed";

const Gallery = () => {
	const [searchTerm, setSearchTerm] = useState("");

	console.log(searchTerm);
	return (
		<div className="px-2 md:px-5">
			<div className="bg-gray-50">
				<Navbar
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					user={user && user}
				/>
			</div>
			<div className="h-full">
				<Routes>
					<Route path="/" element={<Feed />} />
					<Route path="/category/:categoryId" element={<Feed />} />
					<Route
						path="/art-detail/:artId"
						element={<ArtDetail user={user && user} />}
					/>
					<Route path="/create-art" element={<CreateArt />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</div>
		</div>
	);
};

export default Gallery;
