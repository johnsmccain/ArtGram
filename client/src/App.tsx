import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login } from "./pages";

function App() {
	const navigate = useNavigate();
	const [user, setUser] = useState(false);

	useEffect(() => {
		if (!user) navigate("/login");
	}, []);

	return (
		<Routes>
			<Route path="/*" element={<Home />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
