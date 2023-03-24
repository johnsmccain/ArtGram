import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Home, Login, Register, HomePage, LoginPage, SignupPage } from "./pages";
import { AuthProvider, useAuth } from "./contexts";
import { PrivateRoute } from "./components";

function App() {
	const navigate = useNavigate();
	const { user } = useAuth();

	useEffect(() => {
		if (user) {
			navigate("/*");
		}
	}, [user, navigate]);



	return (
		<AuthProvider>
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Register />} />
				<Route path="/home" element={<HomePage />} />
				<Route path="/l" element={<LoginPage />} />
				<Route path="/s" element={<SignupPage />} />
			</Routes>
		</AuthProvider>
	);
}

export default App;
