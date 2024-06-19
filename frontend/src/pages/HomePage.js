import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import { price } from "../utility/price";
import { useNavigate } from "react-router-dom";
import AddToCart from "./AddToCart";

function HomePage() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const sleCategoryArray = useRef([]);
  const slePrice = useRef(null);
  const [checkedArray, setCheckedArray] = useState([]);
  const [radioArray, setRadioArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadmoreLoading, setloadmoreLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  // function to get categories , to display the list in filter
  const getCategories = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/category/get-category`
      );
      setCategories(result.data.categories);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    getCategories();
    getProductsCount();
  }, []);

  // function to handle products per page
  const getProductsPerPage = async (page) => {
    try {
      setLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/product//get-products/${1}`
      );
      setProducts(result.data.products);
      setLoading(false);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  useEffect(() => {
    if (!checkedArray.length && !radioArray.length) {
      getProductsPerPage();
    }
  }, [checkedArray.length, radioArray.length]);

  //get filtered products
  const getFilteredProducts = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${process.env.REACT_APP_URL}/product/get-filtered-products`,
        {
          checked: checkedArray,
          radio: radioArray,
        }
      );
      setLoading(false);
      setProducts(result.data.products);
      setPage(1);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  useEffect(() => {
    if (checkedArray.length >= 1 || radioArray.length >= 1) {
      getFilteredProducts();
    }
  }, [checkedArray, radioArray]);

  // function to handle filter by category functionality
  const handleCategoryFilter = (checked, id) => {
    let all = [...checkedArray];
    if (!checked) {
      all = all.filter((cate) => {
        if (cate != id) {
          return cate;
        }
      });
    } else if (checked) {
      all.push(id);
    }
    setCheckedArray(all);
  };

  //function to get count of products
  const getProductsCount = async () => {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-product-count`
      );
      setTotal(result.data.total);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };

  // fuction load more
  const loadmore = async () => {
    try {
      setloadmoreLoading(true);
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-products/${page}`
      );
      setloadmoreLoading(false);
      setProducts([...products, ...result.data.products]);
    } catch (e) {
      toast(e.response.data.message);
    }
  };
  useEffect(() => {
    if (page == 1) return;
    loadmore();
  }, [page]);

  return (
    <div>
      <Layout
        title="Home - Ecommerce "
        description="Home page for the application"
        keywords="mongodb react js node express"
      >
        <div className="grid grid-cols-[300px_auto] w-full h-full min-h-[76vh]">
          <div className="bg-white">
            <div className=" p-[10px]">
              <h6 className="text-black text-2xl font-semibold mb-[10px] mt-[10px] font-serif">
                Filter By Category
              </h6>
              {categories.map((cate) => {
                return (
                  <label
                    key={cate._id}
                    className=" text-black font-serif text-xl flex items-center mb-[10px] ml-[10px]"
                  >
                    <input
                      type="checkbox"
                      className="w-[25px] h-[25px] mr-[10px]"
                      onChange={(e) => {
                        handleCategoryFilter(e.target.checked, cate._id);
                      }}
                    />
                    {cate.name}
                  </label>
                );
              })}
            </div>
            <div className=" p-[10px]">
              <h6 className="text-black text-2xl font-semibold mb-[10px] mt-[10px] font-serif">
                Filter By Price
              </h6>

              {price.map((p) => {
                return (
                  <label
                    key={p.id}
                    className=" text-black  text-xl flex items-center mb-[10px] ml-[10px]"
                  >
                    <input
                      type="radio"
                      name="price"
                      onChange={(e) => {
                        setRadioArray(p.a);
                      }}
                      className="w-[25px] h-[25px] mr-[10px]"
                    />
                    {p.value}
                  </label>
                );
              })}
            </div>
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="bg-gray-500 text-white px-2 py-2 text-[20px]  font-serif font-bold rounded-lg ml-[10px] mb-[10px]"
            >
              Reset Filters
            </button>
          </div>
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

            {products &&
              products?.length < total &&
              checkedArray.length == 0 &&
              radioArray.length == 0 &&
              (!loadmoreLoading ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(page + 1);
                  }}
                  className="bg-yellow-600 text-white px-2 py-2 text-[20px]  font-serif font-bold rounded-lg ml-[10px] mb-[10px]"
                >
                  Load More ...
                </button>
              ) : (
                <div className="w-[100%] text-center"> Loading</div>
              ))}
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default HomePage;
