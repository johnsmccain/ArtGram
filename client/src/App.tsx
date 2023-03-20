import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
// import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, LoginPage, RegisterPage } from "./pages";

function App() {
	const navigate = useNavigate();
	const [user, setUser] = useState(false);

	useEffect(() => {
		// if (!user) navigate("/login");
	}, []);

	return (
		<Routes>
			<Route path="/*" element={<Home />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/register" element={<RegisterPage />} />
		</Routes>
	);
}

export default App;
