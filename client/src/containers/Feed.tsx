import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { arts as artG } from "../data";
import Layout from "./Layout";

import { allArts } from "../api/artApi";


const Feed = () => {


	const { categoryId } = useParams();
	console.log(categoryId)
	const [arts, setArts] = useState([]);
	useEffect(() => {
		const fetchArts = async () => {
			try {
				const arts = await (await allArts()).arts;
				if (categoryId) {
					const filteredCategory = arts.filter(
						(art) => art.category === categoryId
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
	}, [categoryId]);


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
