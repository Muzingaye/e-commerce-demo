import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AuthProvider from "./Components/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          {/* <Route path="/checkout" element={<Checkout />} /> */}
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
