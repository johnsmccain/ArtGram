import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components';
import { Home, Login, Register, HomePage, LoginPage, SignupPage } from './pages';

function App() {
	return (
		<Routes>
			<Route path="/*" element={
				<PrivateRoute>
					<Home />
				</PrivateRoute>
			} />
			<Route path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />
			<Route path="/home" element={
				<PrivateRoute>
					<HomePage />
				</PrivateRoute>} />
			<Route path="/login-page" element={<LoginPage />} />
			<Route path="/signup-page" element={<SignupPage />} />
		</Routes>
	);
}

export default App;
