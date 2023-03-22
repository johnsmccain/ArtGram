import React from "react";
import { useNavigate } from "react-router-dom";
import Vid from "../assets/share.mp4";
const Login = () => {
	const navigate = useNavigate();
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
					LOGIN
				</div>
			</div>
			<button onClick={() => navigate("/signup")}>SignUp here!</button>
		</div>
	);
};

export default Login;
