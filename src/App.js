import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import Community from "./Views/Community";
import "antd/dist/reset.css";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route element={<Community />} path="/community" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
