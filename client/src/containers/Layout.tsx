import React from "react";
import Masonry from "react-masonry-css";
import { Art } from "../components";

const breakPoint = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
};
const Layout = ({ gallery }: any) => {
	return (
		<Masonry className="flex animate-slide-fwd" breakpointCols={breakPoint}>
			{gallery?.map((art: any) => (
				<Art key={art?._id} art={art} className="w-max" />
			))}
		</Masonry>
	);
};

export default Layout;
