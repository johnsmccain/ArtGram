import React from "react";
import Vid from "../assets/share.mp4";
import { Header } from "../components";
import Login from "../components/Login";
import UploadArt from "../components/UploadArt";

const LoginPage = () => {
	return (
		<div className="flex h-screen items-center justify-start flex-col">
			<div className="relative w-full h-full">
				<video
					className="w-full h-full object-cover"
					autoPlay
					loop
					controls={false}
					typeof="video/mp4"
					muted
					src={Vid}
				/>
				<div className="absolute flex justify-center items-center flex-col bg-blackOverlay top-0 left-0 right-0 bottom-0">
					<Header
						heading="Login to your account"
						paragraph="Don't have an account?"
						linkName="Signup"
						linkUrl='/register'
					/>
					<Login />

				</div>

			</div>
			<UploadArt />
		</div>
	);
};

export default LoginPage;
