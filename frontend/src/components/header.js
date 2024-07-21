import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaTimes } from "react-icons/fa";
import { useRef, useState } from "react";
import { useAuth } from "../context/auth";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { GiShoppingCart } from "react-icons/gi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_SEARCHED_PRODUCTS } from "../redux/actionTypes";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [nav, setNav] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchFieldRef = useRef();
  const navigate = useNavigate();
  const products = useSelector((state) => {
    return state.firstReducer.results;
  });
  const dispatch = useDispatch();
  const cartCount = useSelector((state) => {
    return state.cartCountReducer.count;
  });
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
  const [dropClick, setDropClick] = useState(false);
  return (
    <>
      <nav className="sticky top-0 h-16 left-0 flex justify-between items-center bg-[#131921]  ">
        <h1 className="text-white font-bold text-4xl ml-5 hidden md:block">
          E-App
        </h1>
        <div className="w-[40%]  flex-row hidden md:flex">
          <input
            type="search"
            value={searchValue}
            ref={searchFieldRef}
            className="w-[90%] h-[40px] p-[10px] rounded-lg font-serif text-center focus:text-left"
            placeholder="Search Product Here"
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <button
            onClick={async (e) => {
              if (searchValue.trim().length == 0 || !searchValue.trim()) {
                setSearchValue("");
                searchFieldRef.current.focus();
                return;
              } else {
                try {
                  const result = await axios.get(
                    `${process.env.REACT_APP_URL}/product/searched-products/${searchValue}`
                  );

                  dispatch({
                    type: UPDATE_SEARCHED_PRODUCTS,
                    keyword: searchValue,
                    results: [...result.data.products],
                  });
                  navigate(`/searched-products/${searchValue}`);
                } catch (e) {
                  toast.error(e.response.data.message);
                }
              }
            }}
            className="ml-[8px] bg-green-600 pl-[8px] pr-[8px] pt-[2px] pb[2px] rounded-lg text-2xl text-white text-center"
          >
            Go
          </button>
        </div>
        <ul className="hidden text-white md:flex gap-6 mr-5 text-lg">
          <Link className="hover:text-gray-400 hover:underline" to="/">
            <li>Home</li>
          </Link>
          <Link
            className="hover:text-gray-400 hover:underline"
            to={`/dashboard/${auth?.user?.role == 0 ? "admin" : "user"}`}
          >
            <li>Dashboard</li>
          </Link>
          <Link className="hover:text-gray-400 relative" to="/cart">
            <li>
              <GiShoppingCart size={30} color="white"></GiShoppingCart>
            </li>
            <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full bg-white flex justify-center items-center text-[12px] text-black">
              <p>{cartCount > 99 ? "99+" : cartCount}</p>
            </div>
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
            <div
              className="flex hover:cursor-pointer "
              onClick={() => {
                setDropClick(!dropClick);
              }}
            >
              {auth.user.name}
              {dropClick ? (
                <MdArrowDropUp className="mt-[6px]"></MdArrowDropUp>
              ) : (
                <MdArrowDropDown className="mt-[6px]"></MdArrowDropDown>
              )}
              {dropClick ? (
                <ul className="flex flex-col justify-center items-center absolute w-[150px] h-[150px] top-[63px] bg-gray-500 right-[0px]">
                  <li className="text-center w-[100%] mb-[5px] rounded-r-lg border-solid hover:border-2 hover:border-l-4 hover:bg-black">
                    <Link
                      className="hover:text-gray-400"
                      to={`${
                        auth.user.role === 0
                          ? "/dashboard/admin"
                          : "/dashboard/user"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li className="text-center w-[100%]  rounded-r-lg border-solid hover:border-2 hover:border-l-4 hover:bg-black">
                    <Link onClick={handleLogoutClick} to="/login">
                      Logout
                    </Link>
                  </li>
                </ul>
              ) : (
                <></>
              )}
            </div>
          )}
        </ul>
        <div className="md:hidden ml-4 z-10 flex flex-row justify-between w-[100%]">
          <div
            className="md:hidden ml-4 z-10 flex items-center "
            onClick={handleClick}
          >
            {nav ? (
              <FaTimes size={25} color="white" />
            ) : (
              <RxHamburgerMenu size={25} color="white" />
            )}
          </div>
          <div className="flex-row  flex md:hidden">
            <input
              type="search"
              value={searchValue}
              ref={searchFieldRef}
              className="w-[90%] h-[40px] p-[10px] rounded-lg font-serif text-center focus:text-left"
              placeholder="Search Product Here"
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            <button
              onClick={async (e) => {
                if (searchValue.trim().length == 0 || !searchValue.trim()) {
                  setSearchValue("");
                  searchFieldRef.current.focus();
                  return;
                } else {
                  try {
                    const result = await axios.get(
                      `${process.env.REACT_APP_URL}/product/searched-products/${searchValue}`
                    );

                    dispatch({
                      type: UPDATE_SEARCHED_PRODUCTS,
                      keyword: searchValue,
                      results: [...result.data.products],
                    });
                    navigate(`/searched-products/${searchValue}`);
                  } catch (e) {
                    toast.error(e.response.data.message);
                  }
                }
              }}
              className="ml-[8px] bg-green-600 pl-[8px] pr-[8px] pt-[2px] pb[2px] rounded-lg text-2xl text-white text-center"
            >
              Go
            </button>
          </div>
          <div className="flex items-center mr-[10px] relative ">
            <Link className="hover:text-gray-400" to="/cart">
              <GiShoppingCart size={30} color="white"></GiShoppingCart>
              <div className="absolute top-[5px] right-0 transform translate-x-1/2 -translate-y-1/2 w-[20px] h-[20px] rounded-full bg-white flex justify-center items-center text-[12px]">
                <p>{cartCount > 99 ? "99+" : cartCount}</p>
              </div>
            </Link>
          </div>
        </div>
        <ul
          className={`${
            nav
              ? "text-white opacity-100 transform translate-x-0 "
              : "text-gray opacity-0 transform -translate-y-full hidden"
          } transition-transform absolute top-16 left-0 w-full h- flex flex-col justify-around items-center text-xl bg-zinc-800/80 md:hidden`}
          onClick={() => {
            setNav(false);
          }}
        >
          <Link className="hover:text-gray-400" to="/">
            <li>Home</li>
          </Link>

          <Link
            className="hover:text-gray-400"
            to={`/dashboard/${auth?.user?.role == 0 ? "admin" : "user"}`}
          >
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
