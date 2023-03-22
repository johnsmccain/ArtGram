import React from "react";
import Vid from "../assets/share.mp4";
import { Header } from "../components";
import Register from "../components/Register";
import ResetPassword from "../components/ResetPassword";

const RegisterPage = () => {
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
						heading="Signup to create an account"
						paragraph='Already have an account?'
						linkName="Login"
						linkUrl='/login'

					/>
					<Register />
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
