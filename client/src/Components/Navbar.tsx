import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-band">
          Muzi-ShopHub
        </Link>

        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/checkout" className="navbar-link">
            Cart
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <Link
              to="/auth"
              className="py-3 px-6 border-0 rounded text-base font-medium cursor-pointer transition duration-200 no-underline inline-block text-center hover:-translate-y-[1px] transition-transform active:translate-y-0 hover:-translate-y-[1px] transition-transform"
            >
              Login
            </Link>
            <Link
              to="/auth"
              className="py-3 px-6 border-0 rounded text-base font-medium cursor-pointer transition duration-200 no-underline inline-block text-center hover:-translate-y-[1px] transition-transform active:translate-y-0 hover:-translate-y-[1px] transition-transform"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
