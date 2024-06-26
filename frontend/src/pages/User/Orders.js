import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth.js";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    const result = await axios.get(
      `${process.env.REACT_APP_URL}/orders/get-orders`,
      {
        headers: {
          Authorization: auth?.token,
        },
      }
    );
    setOrders(result.data.orders);
  };
  useEffect(() => {
    getOrders();
  }, []);
  console.log("orders", orders);
  return (
    <div className="w-[100%] h-[100%] p-[10px] bg-white">
      {orders.map((o, i) => {
        return (
          <>
            <table className=" w-[100%]  ">
              <thead>
                <tr className="font-serif font-semibold">
                  <td>Sno</td>
                  <td>Status</td>
                  <td>Buyer</td>
                  <td>Order At</td>
                  <td>Payment</td>
                  <td>Quantity</td>
                </tr>
              </thead>
              <tbody>
                <tr key={o._id} className="font-serif mt-[10px]">
                  <td>{i + 1}</td>
                  <td>{o?.status}</td>
                  <td>{o?.buyer?.name}</td>
                  <td>{moment(o?.createdAt).fromNow()}</td>
                  <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                  <td>{o?.product?.length}</td>
                </tr>
              </tbody>
            </table>
            {o?.product.map((item, index) => {
              return (
                <div
                  key={`${item._id}-${index}`}
                  className="  w-[90%] h-[200px] m-[20px] mb-[4px] mt-[4px] flex border-[1px] rounded-lg mb-[25px] p-[10px]"
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
                  </div>
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
};

export default Orders;
