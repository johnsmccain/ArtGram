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
const Layout = ({ gallary }: any) => {
	return (
		<Masonry className="fles animate-slide-fwd" breakpointCols={breakPoint}>
			{gallary?.map((art: any, index: number) => (
				<Art key={index} art={art} />
			))}
		</Masonry>
	);
};

export default Layout;
