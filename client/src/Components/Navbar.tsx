import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md py-4 sticky top-0 z-[100]">
      <div className="max-w-[1200px] mx-auto px-8 flex justify-between items-center flex-wrap gap-4">
        <Link
          to="/"
          className="text-2xl font-bold text-gray-800 no-underline hover:text-blue-500"
        >
          Muzi-ShopHub
        </Link>

        <div className="flex gap-6 items-center">
          <Link
            to="/"
            className="ftext-[#333] no-underline font-medium transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/checkout"
            className="text-[#333] no-underline font-medium transition-colors duration-200"
          >
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
