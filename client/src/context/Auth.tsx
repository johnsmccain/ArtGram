import React, { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../config";

interface TField {
	name?: string;
	email: string;
	password: string;
}
interface IUser extends TField {
	photoUrl: string;
	token: string;
}

const UserAuthContext = createContext<any>(null);

export const UserAuthContextProvider = ({ children }: any) => {
	const [user, setUser] = useState<IUser | null>(null);

	function logIn({ email, password }: TField) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function signUp({ email, password }: TField) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function logOut() {
		localStorage.removeItem("user");
		return signOut(auth);
	}
	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}

	function getUser() {
		return (
			localStorage.getItem("user") &&
			JSON.parse(localStorage.getItem("user") || "")
		);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser: any) => {
			localStorage.setItem("user", JSON.stringify(currentuser));
			setUser(currentuser);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<UserAuthContext.Provider
			value={{ user, logIn, signUp, logOut, googleSignIn, getUser }}>
			{children}
		</UserAuthContext.Provider>
	);
};

export function useUserAuth() {
	return useContext(UserAuthContext);
}
