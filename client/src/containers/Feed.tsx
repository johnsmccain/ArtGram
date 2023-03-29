import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { arts as artG } from "../data";
import Layout from "./Layout";

import { allArts } from "../api/artApi";
import { Art } from "../types";


const Feed = () => {

	const { category } = useParams();
	const [arts, setArts] = useState<Art>();
	useEffect(() => {
		const fetchArts = async () => {
			try {
				const arts = await (await allArts()).arts;
				if (category) {
					const filteredCategory = arts.filter(
						(art) => art.category === category
					);
					setArts(filteredCategory);
				} else {
					setArts(arts);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchArts();
	}, [category]);


	// console.log(categoryId);
	// useEffect(() => {
	// 	if (categoryId) {
	// 		const filteredCategory = artG.filter(art => art.category === categoryId);
	// 		setArts(filteredCategory);
	// 	} else {
	// 		setArts(artG);
	// 	}
	// }, [categoryId]);

	return <div>{arts && <Layout gallery={arts} />}</div>;
};

export default Feed;
