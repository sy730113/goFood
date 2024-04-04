import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "../pages/signup";
import Signin from "../pages/signin";
import Home from "../pages/Home";
import { CartProvider } from "./components/contextReducer";

function App() {
  return (
    <CartProvider> <Router>
    <>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/home" element={<Home />} />
    
      </Routes>
    </>
  </Router>
  </CartProvider>
   
  );
}

export default App;
