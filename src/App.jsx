import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./routes/home";
import ExperementalPage from "./routes/experementalPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/exp" element={<ExperementalPage />} />
      </Routes>
    </BrowserRouter>
  );
}
