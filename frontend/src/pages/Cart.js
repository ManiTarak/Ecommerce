import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_CART_COUNT } from "../redux/actionTypes";
import Layout from "../components/Layout";

const Cart = () => {
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
    console.log(cartItems);
  }, []);

  // function to caluclate the total price of the products
  const caluclateTotal = () => {
    if (cartItems) {
      var sum = 0;
      for (let i = 0; i < cartItems.length; i++) {
        sum = sum + cartItems[i].price;
      }
    }
    return sum;
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
  return (
    <Layout>
      <div className="w-full h-full  font-serif">
        <h2 className="w-[100%] md:w-[65%]   text-center font-semibold text-4xl font-serif p-[10px] ">
          CART ITEMS
        </h2>
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
              Total - {caluclateTotal()}
            </h4>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
