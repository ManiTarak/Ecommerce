import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";

function Header() {
  const [nav, setNav] = useState(false);
  const handleClick = () => {
    setNav(!nav);
  };

  const [auth, setAuth] = useAuth();
  const handleLogoutClick = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("authInfo");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <nav className="sticky top-0 h-16 left-0 flex justify-between items-center bg-[#131921]  ">
        <h1 className="text-white font-bold text-4xl ml-5">Website</h1>

        <ul className="hidden text-white md:flex gap-6 mr-5 text-lg">
          <Link className="hover:text-gray-400 hover:underline" to="/">
            <li>Home</li>
          </Link>

          <Link className="hover:text-gray-400 hover:underline" to="/contact">
            <li>Contact</li>
          </Link>
          <Link className="hover:text-gray-400 hover:underline" to="/profile">
            <li>Profile</li>
          </Link>
          <Link className="hover:text-gray-400 hover:underline" to="/dashboard">
            <li>Dashboard</li>
          </Link>

          {!auth.user ? (
            <>
              <Link
                className="hover:text-gray-400 hover:underline"
                to="/register"
              >
                <li>Register</li>
              </Link>
              <Link className="hover:text-gray-400 hover:underline" to="/login">
                <li>Login</li>
              </Link>
            </>
          ) : (
            <Link
              className="hover:text-gray-400 hover:underline"
              onClick={handleLogoutClick}
              to="/login"
            >
              <li>Logout</li>
            </Link>
          )}
        </ul>
        <div className="md:hidden mr-4 z-10" onClick={handleClick}>
          {nav ? (
            <FaTimes size={25} color="white" />
          ) : (
            <RxHamburgerMenu size={25} color="white" />
          )}
        </div>
        <ul
          className={`${
            nav
              ? "text-white opacity-100 transform translate-x-0"
              : "text-gray opacity-0 transform -translate-y-full"
          } transition-transform absolute top-16 left-0 w-full h- flex flex-col justify-around items-center text-xl bg-zinc-800/80 md:hidden`}
          onClick={() => {
            setNav(false);
          }}
        >
          <Link className="hover:text-gray-400" to="/">
            <li>Home</li>
          </Link>

          <Link className="hover:text-gray-400" to="/contact">
            <li>Contact</li>
          </Link>
          <Link className="hover:text-gray-400" to="/profile">
            <li>Profile</li>
          </Link>
          <Link className="hover:text-gray-400" to="/dashboard">
            <li>Dashboard</li>
          </Link>
          {!auth.user ? (
            <>
              <Link className="hover:text-gray-400" to="/register">
                <li>Register</li>
              </Link>

              <Link className="hover:text-gray-400" to="/login">
                <li>Login</li>
              </Link>
            </>
          ) : (
            <Link
              className="hover:text-gray-400"
              onClick={handleLogoutClick}
              to="/login"
            >
              <li>Logout</li>
            </Link>
          )}
        </ul>
      </nav>
    </>
  );
}

export default Header;
