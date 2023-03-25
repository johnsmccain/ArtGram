import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { UserAuthContextProvider } from "./context/Auth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<UserAuthContextProvider>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</UserAuthContextProvider>
	</React.StrictMode>
);
