import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  //getProduct function to get the products
  const getProducts = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-products`
      );
      setProducts(result.data.products);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="flex flex-col w-[90%] m-[10px] ml-[20px]">
      <h1 className="text-4xl font-serif font-semibold mb-[20px]">
        All Products
      </h1>
      <div className="grid grid-cols-3 gap-6">
        {products.map((p) => {
          return (
            <Link to={`/dashboard/admin/product/${p._id}`}>
              <div className="bg-white w-[100%] p-[10px] flex flex-col rounded-lg border-slate-500 border-[1px]">
                <div>
                  <img
                    className="rounded-lg mb-[10px]"
                    src={`${process.env.REACT_APP_URL}/product/get-photo/${p._id}`}
                  />
                </div>
                <hr></hr>
                <div>
                  <p className="text-xl text-black font-serif">{p.name}</p>

                  <p className="text-[15px] text-black font-serif">
                    {p.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
