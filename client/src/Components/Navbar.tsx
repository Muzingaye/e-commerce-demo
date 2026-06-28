import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-band">
          Muzi-ShopHub
        </Link>

        <div className="navbar-links">
          <Link to="/" className="btn navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="btn navbar-link">
            Cart
          </Link>
        </div>

        <div className="navbar-auth">
          {!user ? (
            <div className="navbar-auth-links">
              <Link to="/auth" className="btn btn-secondary">
                Login
              </Link>
              <Link to="/auth" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="navbar-user">
              <span className="navbar-greeting">{user.email}</span>
              <button className="btn btn-second" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
