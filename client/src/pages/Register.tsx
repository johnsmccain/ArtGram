import React from "react";
import Vid from "../assets/share.mp4";
import { SignupForm } from "../components";

const inputWrapper = `my-4  bg-slate-300 flex  rounded-md items-center `;
const inputLabel = `ml-3`;
const inputControll = `p-2 border-none outline-none bg-transparent`;
const Register = () => {
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
					{/* <form className="bg-slate-100 rounded-lg p-5 text-black flex justify-center align-middle">
						<div className="w-full flex flex-col justify-center">
							<div className={inputWrapper}>
								<label htmlFor="name" className={inputLabel}>
									Name:
								</label>
								<input type="text" className={inputControll} id="name" />
							</div>
							<div className={inputWrapper}>
								<label htmlFor="email" className={inputLabel}>
									Email:
								</label>
								<input type="email" className={inputControll} id="email" />
							</div>
							<div className={inputWrapper}>
								<label htmlFor="name" className={inputLabel}>
									Password:
								</label>
								<input
									type="password"
									className={inputControll}
									id="password"
								/>
							</div>
							<button
								type="submit"
								className="bg-red-600 text-white font-semibold rounded-lg p-2 hover:bg-red-500 active:bg-red-400 mt-1">
								SignUp
							</button>
						</div>
					</form> */}
					<SignupForm />
				</div>
			</div>
		</div>
	);
};

export default Register;
