import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { allArts } from "../api/artApi";
import { ArtDetail, CreateArt, Navbar, Search } from "../components";
import { Art, Arts, User } from "../types";
// import { User as user } from "../data";
import Feed from "./Feed";

interface GalleryProps {
	user: User;
}

const Gallery: React.FC<GalleryProps> = ({ user }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [arts, setArts] = useState<any>([]);

	useEffect(() => {
		const fetchArts = async () => {
			try {
				const arts = (await allArts()).arts;

			} catch (error) {
				console.log(error);
			}
		};
		setArts(fetchArts());
	}, [user]);
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
					<Route path="/category/:category" element={<Feed />} />
					<Route
						path="/art/:artId"
						element={<ArtDetail user={user && user} art={arts} />}
					/>
					<Route path="/post" element={<CreateArt />} />
					<Route path="/search" element={<Search searchTerm={searchTerm} />} />
				</Routes>
			</div>
		</div>
	);
};

export default Gallery;
