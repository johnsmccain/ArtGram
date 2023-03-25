import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login, Register } from "./pages";
import { useUserAuth } from "./context/Auth";

function App() {
	const navigate = useNavigate();

	const { getUser } = useUserAuth();

	useEffect(() => {
		if (!getUser()) navigate("/login");
		// console.log(getUser());
	}, [getUser()]);

	return (
		<Routes>
			<Route path="/*" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Register />} />
		</Routes>
	);
}

export default App;
