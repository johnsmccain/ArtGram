import React, { useEffect, useState } from "react";
import Layout from "../containers/Layout";
import { arts as artG } from "../data";
const Search = ({ searchTerm }: any) => {
	const [loading, setLoading] = useState(false);
	const [arts, setArts] = useState<typeof artG>();
	useEffect(() => {
		const filtered = artG.filter((art: any) => art.name === searchTerm);
		setArts(filtered);
		console.log(filtered);
	}, [searchTerm]);

	return (
		<div>
			{loading && "Loading..."}
			{!arts && <div className="">No Art Found!</div>}
			{arts && <Layout gallery={arts} />}
		</div>
	);
};

export default Search;
