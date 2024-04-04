import { Link, useNavigate } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Cart from "../../pages/Cart";
import { useState } from "react";
import Modal from "../Modal";
import { useCart } from './contextReducer';
// import Cart from '../../pages/Cart';
export default function Header() {
  const navigate = useNavigate();
  let data=useCart();
  const [cartView, setCartView] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/signin");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-1 fst-italic"
            style={{ fontWeight: "800px" }}
            to="/"
          >
            GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 me-auto mb-2"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              {localStorage.getItem("authToken") ? (
                <li className="nav-item">
                  <Link className="nav-link fs-5 me-auto mb-2" to="/">
                    My Orders
                  </Link>
                </li>
              ) : null}
            </ul>
            {!localStorage.getItem("authToken") ? (
              <div
                className="d-flex"
                style={{ position: "absolute", right: "0px" }}
              >
                <Link className="btn bg-white text-primary mx-1" to="/signin">
                  Signin
                </Link>
                <Link className="btn bg-white text-primary mx-1" to="/signup">
                  SignUp
                </Link>
              </div>
            ) : (
              <div style={{ position: "absolute", right: "0px" }}>
                <div className="btn bg-white text-primary mx-2" onClick={()=>{setCartView(true)}}>
                  My Cart{" "}
                  <Badge pill bg="danger">
                {data.length}
                  </Badge>
                  
                </div>
                {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}
                <div
                  className="btn bg-white text-danger mx-2"
                  onClick={handleLogout}
                >
                  Signout
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
