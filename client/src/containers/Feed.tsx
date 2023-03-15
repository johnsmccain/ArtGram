import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { arts as artG } from "../data";
import Layout from "./Layout";

const Feed = () => {
	const { categoryId } = useParams();
	const [arts, setArts] = useState<typeof artG>();
	console.log(categoryId);
	useEffect(() => {
		if (categoryId) {
			const filteredCategory = artG.filter(art => art.category === categoryId);
			setArts(filteredCategory);
		} else {
			setArts(artG);
		}
	}, [categoryId]);

	return <div>{arts && <Layout gallery={arts} />}</div>;
};

export default Feed;
