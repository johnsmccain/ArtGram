import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineGoogle } from "react-icons/ai";
import Vid from "../assets/share.mp4";
import {
	getAuth,
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../config";
import { useUserAuth } from "../context/Auth";

const inputWrapper = `my-4  bg-slate-300 flex rounded-md items-center `;
const inputLabel = `ml-3`;
const inputControll = `p-2 border-none outline-none bg-transparent`;

const Login = () => {
	const navigate = useNavigate();
	const [socialAuth, setSocialAuth] = useState(true);
	const [name, setName] = useState<any>("");
	const [email, setEmail] = useState<any>("");
	const [password, setPassword] = useState<any>("");
	const [image, setImage] = useState<any>("");

	const { logIn, signUp, googleSignIn } = useUserAuth();

	const handleGoogleSignIn = async (e: any) => {
		e.preventDefault();
		try {
			const data = googleSignIn();
			console.log(data);
			localStorage.setItem("user", JSON.stringify(data));
			navigate("/");
		} catch (error) {
			console.log(error);
		}
		// try {

		// } catch (error) {

		// }
	};

	const singIn = async (e: any) => {
		e.preventDefault();
		try {
			const data = await logIn(email, password);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
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
					{!socialAuth && (
						<form
							onSubmit={singIn}
							className="bg-slate-100 rounded-lg p-5 text-black flex justify-center align-middle flex-col">
							<div className="w-full flex flex-col justify-center">
								<div className={inputWrapper}>
									<label htmlFor="email" className={inputLabel}>
										Email:
									</label>
									<input
										type="email"
										onChange={e => setEmail(e.target.value)}
										className={inputControll}
										required
										id="email"
									/>
								</div>
								<div className={inputWrapper}>
									<label htmlFor="password" className={inputLabel}>
										Password:
									</label>
									<input
										type="password"
										onChange={e => setPassword(e.target.value)}
										className={inputControll}
										required
										id="password"
									/>
								</div>
								<button
									type="submit"
									onClick={() => {}}
									className="bg-red-600 text-white font-semibold rounded-lg p-2 hover:bg-red-500 active:bg-red-400 mt-1">
									SignUp
								</button>
							</div>
							<button className="mt-2" onClick={() => setSocialAuth(true)}>
								Login with Google
							</button>
						</form>
					)}
					{socialAuth && (
						<div
							className="bg-slate-100 rounded-lg p-5 text-black flex justify-center align-middle flex-col"
							onClick={handleGoogleSignIn}>
							<div className="flex items-center justify-between hover:bg-red-500 hover:text-white animate-bounce hover:animate-none rounded-lg p-2">
								<AiOutlineGoogle
									className="font-bold text-2xl mr-2
								"
								/>
								<button className=""> SingIn with Email</button>
							</div>
							<button className="mt-2" onClick={() => setSocialAuth(false)}>
								Login with Email
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
