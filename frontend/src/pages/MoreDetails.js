import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MoreDetails = () => {
  const { pid } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const navigate = useNavigate();

  // get single Product to display product details
  const getProduct = async () => {
    try {
      const productresult = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-Single-Product/${pid}`
      );
      setProduct(productresult.data.product);
      getSimilarProducts(
        productresult?.data?.product?._id,
        productresult?.data?.product?.category?._id
      );
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  //get similar products to display under similar produtcs which is under product details
  const getSimilarProducts = async (pid, cid) => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-similar-products/${pid}/${cid}`
      );
      setSimilarProducts(result.data.products);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  return (
    <Layout>
      {product ? (
        <div className="w-full h-auto min-h-[77.7vh]  ">
          <h2 className="text-center p-[20px] text-4xl font-semibold font-serif pb-[10px]">
            {`${product.name}  ` + "Details"}
          </h2>
          <div className="w-[100%] h-auto md:h-[350px] grid md:grid-cols-[40%,60%]  ">
            <div className=" p-[20px] flex justify-center items-center ">
              <div className="w-[90%] h-[90%] rounded-lg border-[1px] flex justify-center items-center ">
                <img
                  className="rounded-lg object-cover h-[90%] w-[90%]"
                  src={`${process.env.REACT_APP_URL}/product/get-photo/${product._id}`}
                ></img>
              </div>
            </div>
            <div className=" p-[20px] flex  items-center ">
              <div className="w-[90%] h-[90%] rounded-lg   flex font-serif flex-col text-2xl font-[50px] justify-center">
                <p className="p-[10px] pb-[2px] pt-[2px]">
                  Product Name : {product.name}
                </p>
                <p className="p-[10px] pb-[2px] pt-[2px]">
                  Product Description : {product.description}
                </p>
                <p className="p-[10px] pb-[2px] pt-[2px]">
                  Product Price : {product.price}
                </p>
                <p className="p-[10px] pb-[2px] pt-[2px]">
                  Product Quantity : {product.quantity}
                </p>
                <button className="p-[10px] pb-[2px] pt-[2px] w-[150px] ml-[10px] font-serif bg-blue-600 p-[5px] text-white rounded-lg px-[15px]  mr-[5px] ">
                  Add Cart
                </button>
              </div>
            </div>
          </div>
          <hr className="mx-[50px]" />
          <div className="w-[100%]">
            <h3 className="text-center p-[20px] text-2xl font-semibold font-serif pb-[10px]">
              Similar Products
            </h3>
            {similarProducts && similarProducts.length == 0 ? (
              <div className="w-[100%]  bg-red-600">
                No Similar Products are available
              </div>
            ) : (
              <div className=" grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-[10px] ">
                {similarProducts.map((p) => {
                  return (
                    <div className="w-[100%] h-[100%] ">
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
                          <button className="text-base font-serif bg-blue-600 p-[5px] text-white rounded-lg px-[15px]  mr-[5px] ">
                            Add Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </Layout>
  );
};

export default MoreDetails;
