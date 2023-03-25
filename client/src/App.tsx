import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login, Register } from "./pages";

function App() {
	const navigate = useNavigate();
	// const [user, setUser] = useState(false);

	const user = JSON.parse(localStorage.getItem("user") || "");

	useEffect(() => {
		if (!user) navigate("/login");
	}, []);

	return (
		<Routes>
			<Route path="/*" element={<Home />} />
			<Route path="/login" element={<Login />} />
			<Route path="/signup" element={<Register />} />
		</Routes>
	);
}

export default App;
