import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CART_COUNT } from "../redux/actionTypes";
import Layout from "../components/Layout";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => {
    return state.cartCountReducer.cartItems;
  });
  const dispatch = useDispatch();
  useEffect(() => {
    var a = [];
    if (localStorage.getItem("cartItems") && cartItems.length == 0) {
      a = [...JSON.parse(localStorage.getItem("cartItems"))];
    }
    for (let i = 0; i < a.length; i++) {
      cartItems.push(a[i]);
    }
    dispatch({
      type: UPDATE_CART_COUNT,
      count: cartItems.length,
      cartItems: cartItems,
    });
  }, []);

  // function to caluclate the total price of the products
  const caluclateTotal = () => {
    if (cartItems) {
      var sum = 0;
      for (let i = 0; i < cartItems.length; i++) {
        sum = sum + cartItems[i].price;
      }
    }
    return sum.toLocaleString("en-us", {
      style: "currency",
      currency: "INR",
    });
  };

  // function to remove item from the cart list
  const handleRemoveItemfromCart = (id) => {
    const a = cartItems.filter((item) => {
      return item._id != id;
    });
    localStorage.setItem("cartItems", JSON.stringify(a));
    dispatch({
      type: UPDATE_CART_COUNT,
      count: a.length,
      cartItems: a,
    });
  };

  // function to get payment token
  const getPaymentToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_URL}/product/braintree/token`
      );

      setClientToken(data?.clientToken);
    } catch (e) {
      toast.error("Something bad happend while getPaymentToken FE");
    }
  };
  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  //function to handle make payment button click
  const handleMakePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_URL}/product/braintree/payment`,
        {
          nonce,
          cart: cartItems,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      setLoading(false);
      localStorage.removeItem("cartItems");
      dispatch({ type: UPDATE_CART_COUNT, count: 0, cartItems: [] });
      navigate("/dashboard/user/orders");
      toast.success("Payment completed successfully ");
    } catch (e) {
      toast.error("Something Bad happend while making payments at FE ");
      setLoading(false);
    }
  };

  return (
    <Layout
      title="Cart - E-App "
      description="Cart which contains your products"
      keywords="mongodb react js node express"
    >
      <div className="w-full h-full  font-serif">
        <h2 className="w-[100%] md:w-[65%]   text-center font-semibold text-4xl font-serif p-[10px] ">
          CART ITEMS
        </h2>
        <h3 className="w-[100%] md:w-[65%]   text-center font-semibold text-2xl font-serif  ">
          Hello {auth?.user?.name}
        </h3>
        <h5 className="w-[100%] md:w-[65%]   text-center font-base text-xl font-serif ">
          {cartItems.length >= 1
            ? `You have ${cartItems.length} items in cart ${
                auth?.token && auth?.user ? "" : "Please Login to Checkout"
              }`
            : ""}
        </h5>
        <div className="w-full h-[100%] grid md:grid-cols-[65%,33%] ">
          {cartItems?.length == 0 && (
            <div className="w-[100%] h-[100%] flex justify-center items-center text-3xl text-center">
              No Products in the Cart
            </div>
          )}
          {cartItems?.length !== 0 && (
            <div className=" w-[100%] ">
              {cartItems.map((item, index) => {
                return (
                  <div
                    key={`${item._id}-${index}`}
                    className=" w-[90%] h-[200px] m-[20px] mb-[4px] mt-[4px] flex border-[1px] rounded-lg mb-[25px] p-[10px]"
                  >
                    <div className="w-[40%] h-[100%]  border-r-[1px] flex items-center justify-center ">
                      <img
                        className="object-cover w-[90%] h-[90%] rounded-lg"
                        src={`${process.env.REACT_APP_URL}/product/get-photo/${item._id}`}
                      />
                    </div>
                    <div className="w-[60%] h-[100%] text-[15px] font-semibold p-[10px] font-serif ">
                      <p className="mb-[5px]">{item.name}</p>
                      <p className="mb-[5px]">{item.description}</p>
                      <p className="mb-[5px]">
                        Price :
                        <span className="font-mono font-normal">
                          {item.price}
                        </span>
                      </p>
                      <button
                        onClick={() => handleRemoveItemfromCart(item._id)}
                        className="w-[150px] px-[20px] bg-red-600 text-white rounded-lg text-[15px] py-[8px]"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="w-[100%] p-[10px] ">
            <h3 className="text-3xl font-semibold font-serif text-center m-[10px]">
              Cart Summary
            </h3>
            <p className="text-center text-[15px] m-[10px]">
              Total | Checkout | Payment
            </p>
            <hr />
            <h4 className="text-3xl font-semibold font-serif text-center mt-[30px] mb-[30px]">
              Total -{" "}
              <span className="font-mono font-normal">{caluclateTotal()}</span>
            </h4>
            {auth?.token && auth?.user?.address ? (
              <div className="w-[100%] p-[10px] flex flex-col items-center">
                <h5 className="text-2xl font-semibold font-serif text-center  ">
                  Current Address :
                </h5>
                <h6 className="text-xl font-base font-serif text-center ">
                  {auth?.user?.address}
                </h6>
                <button
                  onClick={() => {
                    navigate("/dashboard/user/profile");
                  }}
                  className="text-xl w-[200px] bg-slate-50 hover:bg-yellow-500 py-[5px] px-[10px] rounded-lg text-yellow-600 hover:text-white border-[1px] border-yellow-600 mt-[20px]"
                >
                  Update Address
                </button>
              </div>
            ) : auth?.token && auth?.user ? (
              <div className="w-[100%] p-[10px] flex flex-col items-center">
                <button
                  onClick={() => {
                    navigate("/dashboard/user/profile");
                  }}
                  className="text-xl w-[200px] bg-slate-50 hover:bg-yellow-500 py-[5px] px-[10px] rounded-lg text-yellow-600 hover:text-white border-[1px] border-yellow-600 mt-[20px]"
                >
                  Update Address
                </button>
              </div>
            ) : (
              <div className="w-[100%] p-[10px] flex flex-col items-center">
                <button
                  onClick={() => {
                    navigate("/login", {
                      state: { path: location.pathname },
                    });
                  }}
                  className="text-xl w-[250px] bg-slate-50 hover:bg-yellow-500 py-[5px] px-[10px] rounded-lg text-yellow-600 hover:text-white border-[1px] border-yellow-600 mt-[20px]"
                >
                  Please Login To Checkout
                </button>
              </div>
            )}
            <div className="w-[100%] flex flex-col items-center">
              {(!clientToken && auth?.token && auth?.user) ||
              (cartItems.length == 0 && auth?.token && auth?.user) ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    onClick={handleMakePayment}
                    disabled={
                      loading ||
                      (!instance && instance !== "") ||
                      !auth?.user?.address
                    }
                    className="text-xl w-[200px]  bg-blue-600 py-[5px] px-[10px] rounded-lg text-white  mt-[20px]  disabled:cursor-not-allowed disabled:bg-yellow-500 hover:cursor-pointer"
                  >
                    {loading ? "Processing ..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
