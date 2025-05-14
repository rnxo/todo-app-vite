import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

createRoot(document.getElementById("root")).render(
	<ErrorBoundary>
		<StrictMode>
			<h2>Todo Application</h2>
			<App />
		</StrictMode>
	</ErrorBoundary>,
);
