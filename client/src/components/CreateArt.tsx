import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { User as user, categories } from "../data";

const CreateArt = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);
	const [fields, setFields] = useState<boolean>();
	const [category, setCategory] = useState();
	const [imageAsset, setImageAsset] = useState();
	const [wrongImageType, setWrongImageType] = useState(false);

	const navigate = useNavigate();

	const uploadImage = (e: any) => {
		const selectedFile = e.target.files[0];
		console.log(selectedFile);
		// uploading asset to sanity
		if (
			selectedFile.type === "image/png" ||
			selectedFile.type === "image/svg" ||
			selectedFile.type === "image/jpeg" ||
			selectedFile.type === "image/gif" ||
			selectedFile.type === "image/tiff"
		) {
			setWrongImageType(false);
			setLoading(true);
		} else {
			setLoading(false);
			setWrongImageType(true);
		}
	};

	const savePin = () => {
		if (title && description && imageAsset && category) {
			// client.create(doc).then(() => {
			// 	navigate("/");
			// });
		} else {
			setFields(true);

			setTimeout(() => {
				setFields(false);
			}, 2000);
		}
	};
	return (
		<div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
			{fields && (
				<p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">
					Please add all fields.
				</p>
			)}
			<div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5  w-full">
				<div className="bg-secondaryColor p-3 flex flex-0.7 w-full rounded-lg">
					<div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">

						<div className="flex items-center justify-center w-full">
							<label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50">
								<div className="flex flex-col items-center justify-center pt-5 pb-6">
									<svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
									<p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
									<p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
								</div>
								<input id="dropzone-file"
									onChange={uploadImage}
									type="file" className="hidden" />
							</label>
						</div>


						{/* {loading && <Spinner />} */}
						{wrongImageType && <p>It&apos;s wrong file type.</p>}
						{!imageAsset ? (
							// eslint-disable-next-line jsx-a11y/label-has-associated-control
							<label>
								<div className="flex flex-col items-center justify-center h-full">
									<div className="flex flex-col justify-center items-center">
										<p className="font-bold text-2xl">
											<AiOutlineCloudUpload />
										</p>
										<p className="text-lg">Click to upload</p>
									</div>

									<p className="mt-32 text-gray-400">
										Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or
										TIFF less than 20MB
									</p>
								</div>
								<input
									type="file"
									name="upload-image"
									onChange={uploadImage}
									className="w-0 h-0"
								/>
							</label>
						) : (
							<div className="relative h-full">
								<img
									src={imageAsset}
									alt="uploaded-pic"
									className="h-full w-full"
								/>
								<button
									type="button"
									className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
								// onClick={() => setImageAsset()}
								>
									<MdDelete />
								</button>
							</div>
						)}
					</div>
				</div>

				<div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
					<input
						type="text"
						value={title}
						onChange={e => setTitle(e.target.value)}
						placeholder="Add your title"
						className="rounded-lg outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
					/>
					{user && (
						<div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg ">
							<img
								src={user.image}
								className="w-10 h-10 rounded-full"
								alt="user-profile"
							/>
							<p className="font-bold">{user.name}</p>
						</div>
					)}
					<textarea

						value={description}
						onChange={e => setDescription(e.target.value)}
						placeholder="Short description"
						rows={5}
						className="block p-2.5 w-full text-md text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none"
					/>


					<div className="flex flex-col">
						<div>
							<p className="mb-2 font-semibold text:lg sm:text-xl">
								Choose Art Category
							</p>
							<select
								onChange={(e: any) => {
									setCategory(e.target.value);
								}}
								className=" outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
								<option value="others" className="sm:text-bg bg-white">
									Select Category
								</option>
								{categories.map((item: any) => (
									<option
										className="text-base border-0 outline-none capitalize bg-white text-black "
										value={item.name}>
										{item.name}
									</option>
								))}
							</select>
						</div>
						<div className="flex justify-end items-end mt-5">
							<button
								type="button"
								onClick={savePin}
								className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none">
								Save Art
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreateArt;
