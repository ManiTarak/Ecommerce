import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  //getProduct function to get the products
  const getProducts = async () => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-products`
      );
      setLoading(false);
      setProducts(result.data.products);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    // <div className="flex flex-col w-[90%] m-[10px] ml-[20px]">
    //   <h1 className="text-4xl font-serif font-semibold mb-[20px]">
    //     All Products
    //   </h1>
    //   <div className="grid grid-cols-3 gap-6">
    //     {products.map((p) => {
    //       return (
    //         <Link to={`/dashboard/admin/product/${p._id}`}>
    //           <div className="bg-white w-[100%] p-[10px] flex flex-col rounded-lg border-slate-500 border-[1px]">
    //             <div>
    //               <img
    //                 className="rounded-lg mb-[10px]"
    //                 src={`${process.env.REACT_APP_URL}/product/get-photo/${p._id}`}
    //               />
    //             </div>
    //             <hr></hr>
    //             <div>
    //               <p className="text-xl text-black font-serif">{p.name}</p>

    //               <p className="text-[15px] text-black font-serif">
    //                 {p.description}
    //               </p>
    //             </div>
    //           </div>
    //         </Link>
    //       );
    //     })}
    //   </div>
    // </div>
    <div>
      <h3 className="text-4xl font-semibold font-serif text-center mt-[10px]">
        All Products
      </h3>
      {loading && (
        <div className="w-[100%] flex justify-center items-center text-4xl font-semibold h-[100%] ">
          <p>Loading ....</p>
        </div>
      )}
      {!loading && (
        <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-[10px] ">
          {products.map((p) => {
            return (
              <Link to={`/dashboard/admin/product/${p._id}`}>
                <div
                  className="bg-white h-[370px] rounded-lg border-[1px] "
                  key={p._id}
                >
                  <div className="h-[65%] flex justify-center items-center">
                    <img
                      src={`${process.env.REACT_APP_URL}/product/get-photo/${p._id}`}
                      className="h-[90%] mt-[10px] rounded-lg"
                      width="90%"
                    />
                  </div>
                  <hr />
                  <p className="text-lg font-semibold font-serif p-[10px] pb-[2px]">
                    {p.name.length > 25 ? `${p.name.substr(0, 25)}...` : p.name}
                  </p>
                  <p className="text-sm  font-serif p-[10px] pt-[2px] pb-[2px]">
                    {p.description.length > 25
                      ? `${p.description.substr(0, 25)}...`
                      : p.description}
                  </p>
                  <p className="text-sm  font-serif p-[10px] pt-[2px] pb-[2px]">
                    {`₹ ${p.price}`}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Products;
