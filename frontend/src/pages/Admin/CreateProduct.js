import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(true);
  const [auth] = useAuth();
  const navigate = useNavigate();
  //function to get categories
  async function getCategories() {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/category/get-category`
      );
      if (result?.data) {
        setCategories(result.data.categories);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }
  useEffect(() => {
    getCategories();
  }, []);
  //function to handle create product i.e.., submit click
  const handleCreateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("photo", photo);
      const result = await axios.post(
        `${process.env.REACT_APP_URL}/product/create-product`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (result.data?.success) {
        toast.success(result.data.message);
        navigate("/dashboard/admin/product/products");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="w-[90%] h-[90%] flex flex-col m-[10px] ml-[20px]">
      <h3 className="font-serif text-4xl font-semibold mb-[10px]">
        Creating Product
      </h3>
      <select
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        className="w-[70%] p-[10px] rounded-lg font-serif mb-[20px]"
      >
        {categories.map((cate) => {
          return (
            <option key={cate._id} value={cate._id}>
              {cate.name}
            </option>
          );
        })}
      </select>
      <label className="bg-gray-500 p-[10px] w-[70%] text-white text-center rounded-lg text-xl font-serif mb-[20px]">
        {photo ? photo.name : "Upload Photo"}
        <input
          type="file"
          name="photo"
          accept="image/*"
          onChange={(e) => {
            setPhoto(e.target.files[0]);
          }}
          hidden
        />
      </label>
      <div className="mb-[20px]">
        {photo && photo.name && (
          <div>
            <img
              src={URL.createObjectURL(photo)}
              height="200px"
              width="200px"
              alt="product-photo"
            />
          </div>
        )}
      </div>
      <input
        className="w-[70%] p-[10px] font-serif rounded-lg mb-[20px] "
        placeholder="Enter product name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <input
        className="w-[70%] p-[10px] font-serif rounded-lg mb-[20px]"
        placeholder="Enter product description"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <input
        className="w-[70%] p-[10px] font-serif focus:font-mono rounded-lg mb-[20px] "
        placeholder="Enter product price"
        value={price}
        type="number"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      ></input>
      <input
        className="w-[70%] p-[10px] font-serif focus:font-mono rounded-lg mb-[20px]"
        placeholder="Enter product quantity"
        value={quantity}
        type="number"
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      ></input>
      <select
        className="w-[70%] p-[10px] rounded-lg font-serif mb-[20px]"
        onChange={(e) => {
          setShipping(e.target.value);
        }}
      >
        <option className="font-serif" value="1">
          Yes
        </option>
        <option className="font-serif" value="0">
          No
        </option>
      </select>
      <button
        onClick={handleCreateProduct}
        className="bg-black text-white px-2 py-2 text-[20px] w-[30%] font-serif font-bold rounded-lg"
      >
        Submit
      </button>
    </div>
  );
};

export default CreateProduct;
