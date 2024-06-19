import React from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";

const SearchedProducts = () => {
  const navigate = useNavigate();
  const products = useSelector((state) => {
    return state.firstReducer.results;
  });

  return (
    <Layout>
      <div className=" bg-yellow-600 min-h-[100vh] ">
        {products.length == 0 ? (
          <div className=" flex justify-center items-center text-3xl font-semibold font-serif pt-[50px] ">
            No Products for this search Criteria
          </div>
        ) : (
          <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-[10px] ">
            {products.map((p) => {
              return (
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
                    {p.name}
                  </p>
                  <p className="text-sm  font-serif p-[10px] pt-[2px] pb-[2px]">
                    {p.description.length > 25
                      ? `${p.description.substr(0, 25)}...`
                      : p.description}
                  </p>
                  <p className="text-sm  font-serif p-[10px] pt-[2px] pb-[2px]">
                    {`₹ ${p.price}`}
                  </p>

                  <div className="w-[100%]  flex justify-center ">
                    <AddToCart product={p} />
                    <button
                      onClick={(e) => {
                        navigate(`/more-details/${p._id}`);
                      }}
                      className="text-base font-serif bg-gray-500 p-[5px] text-white rounded-lg px-[15px]"
                    >
                      More Details
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchedProducts;
