import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../context/auth";
import { useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const UpdateProduct = () => {
  const options = useRef([]);
  const [categories, setCategories] = useState([]);
  //   const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [auth] = useAuth();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedYNOption, setSelectedYNOption] = useState(null);

  const navigate = useNavigate();
  const params = useParams();

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
    options.current = categories.map((cate) => {
      return { value: cate._id, label: cate.name, slug: cate.slug };
    });
  }, [categories]);

  //function to get product
  async function getProduct() {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/product/get-Single-Product/${params.id}`
      );
      setName(result.data.product.name);
      setDescription(result.data.product.description);
      setPrice(result.data.product.price);
      setQuantity(result.data.product.quantity);
      setSelectedYNOption(
        result.data.product.shipping
          ? { value: 1, label: "Yes" }
          : { value: 0, label: "No" }
      );
      setSelectedOption({
        value: result.data.product.category._id,
        label: result.data.product.category.name,
        slug: result.data.product.category.slug,
      });
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }
  useEffect(() => {
    getCategories();
    getProduct();
  }, []);

  //function to handle create product i.e.., submit click
  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", `${selectedOption.value}`);

      productData.append("shipping", selectedYNOption.value ? true : false);
      photo && productData.append("photo", photo);
      const result = await axios.put(
        `${process.env.REACT_APP_URL}/product/update-product/${params.id}`,
        productData,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (result.data?.success) {
        toast.success(result.data.message);
        navigate("/dashboard/admin/products");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  // function to handle delete functionality
  const handleDeleteProduct = async () => {
    try {
      const answer = window.prompt(
        `Do you want to continue delete the product?
if yes type 'yes' in the input `
      );

      // console.log(answer.toLowerCase());
      // return;
      if (answer.toLowerCase() !== "yes") {
        return;
      }
      const result = await axios.delete(
        `${process.env.REACT_APP_URL}/product/delete-product/${params.id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      toast.success(result.data.message);
      navigate("/dashboard/admin/products");
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="w-[90%] h-[90%] flex flex-col m-[10px] ml-[20px]">
      <h3 className="font-serif text-4xl font-semibold mb-[10px]">
        Updating Product
      </h3>
      {/* <select
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
      </select> */}
      <Select
        className="w-[70%] p-[10px] rounded-lg font-serif mb-[20px]"
        value={selectedOption}
        onChange={(optionSelected) => {
          setSelectedOption(optionSelected);
        }}
        options={options.current}
      />
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
      <div className="mb-[20px] w-[70%] flex justify-center">
        {photo && photo.name ? (
          <div>
            <img
              src={URL.createObjectURL(photo)}
              height="200px"
              width="200px"
              alt="product"
            />
          </div>
        ) : (
          <div>
            <img
              src={`${process.env.REACT_APP_URL}/product/get-photo/${params.id}`}
              height="200px"
              width="200px"
              alt="product1"
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
      {/* <select
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
      </select> */}
      <Select
        value={selectedYNOption}
        options={[
          { value: 1, label: "Yes" },
          { value: 0, label: "No" },
        ]}
        onChange={setSelectedYNOption}
        className="w-[70%]  p-[10px] rounded-lg font-serif mb-[20px]"
      ></Select>
      <button
        onClick={handleUpdateProduct}
        className="bg-black text-white px-2 py-2 text-[20px] w-[30%] font-serif font-bold rounded-lg mb-[20px]"
      >
        Update Product
      </button>
      <button
        onClick={handleDeleteProduct}
        className="bg-red-500 text-white px-2 py-2 text-[20px] w-[30%] font-serif font-bold rounded-lg"
      >
        Delete Product
      </button>
    </div>
  );
};
export default UpdateProduct;
