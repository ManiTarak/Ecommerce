import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { IoCloseCircleOutline } from "react-icons/io5";

const CreateCategory = () => {
  const [category, setCategory] = useState([]);
  const [auth] = useAuth();
  const [inp, setInp] = useState("");
  const [editpop, setEditpop] = useState(false);
  const [categoryEdit, setCategoryEdit] = useState("");
  //function to get categories
  async function getCategories() {
    try {
      const result = await axios.get(
        `${process.env.REACT_APP_URL}/category/get-category`
      );
      if (result?.data) {
        setCategory(result.data.categories);
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }
  //haandle submit to create category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${process.env.REACT_APP_URL}/category/create-category`,
        {
          name: inp,
        },
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (result?.data.success) {
        toast.success(result.data.message);
        setInp("");
        getCategories();
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  const handleChange = (e) => {
    setInp(e.target.value);
  };

  //handleDelete to delete category
  const handleDelete = async (id) => {
    try {
      const result = await axios.delete(
        `${process.env.REACT_APP_URL}/category/delete-category/${id}`,
        {
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      if (result.data.success) {
        toast.success(result.data.message);
        getCategories();
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  //To update the category
  const handleUpdate = async (cate) => {
    setEditpop(!editpop);
    setCategoryEdit(cate);
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="m-[10px] ml-[20px] w-[90%] h-[90%] flex flex-col ">
      <h3 className="font-bold text-4xl font-serif">Manage Category</h3>
      <div className="ml-4  mt-[10px] flex flex-col w-[90%]">
        <input
          onChange={handleChange}
          className=" mb-4 w-[70%] font-serif p-[7px] text-[18px]"
          placeholder="Enter the collection name"
          value={inp}
        ></input>
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-4 py-1 text-[25px] w-[25%] font-serif font-bold"
        >
          Submit
        </button>
      </div>
      <hr className="m-[10px] mt-[20px] mb-[20px]"></hr>
      <div className="flex flex-col mb-4 w-[90%] ">
        {category &&
          category.map((cate) => {
            return (
              <Category
                handleDelete={handleDelete}
                handleUpdate={handleUpdate}
                key={cate._id}
                cate={cate}
              ></Category>
            );
          })}
      </div>
      {editpop ? (
        <EditCategory
          categoryEdit={categoryEdit}
          setEditpop={setEditpop}
          editpop={editpop}
          setCategoryEdit={setCategoryEdit}
          getCategories={getCategories}
          auth={auth}
        ></EditCategory>
      ) : (
        ""
      )}
    </div>
  );
};

const Category = (props) => {
  return (
    <div className="w-[90%] flex justify-between mb-[10px] ">
      <div className="w-[75%] flex text-white text-2xl font-serif bg-yellow-700 font-semibold items-center mr-[10px]">
        {props.cate.slug}
      </div>
      <div className="flex justify-between w-[25%]">
        <button
          onClick={() => props.handleUpdate(props.cate)}
          className="bg-green-800 text-white px-2 py-1 text-[20px] w-[90%] font-serif font-bold mr-[10px]"
        >
          Edit
        </button>
        <button
          onClick={() => {
            props.handleDelete(props.cate._id);
          }}
          className="bg-red-800 text-white px-2 py-1 text-[20px] w-[90%] font-serif font-bold"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const EditCategory = (props) => {
  const [editInp, setEditInp] = useState(props.categoryEdit.name);
  //handle function to close popup
  const handleClosebtn = (e) => {
    props.setEditpop(!props.editpop);
  };
  //handle function to handle input of edit category
  const handleSubmitInp = (e) => {
    setEditInp(e.target.value);
  };
  //handle function to handle submit btn click
  const handleEditSubmit = async () => {
    try {
      const result = await axios.put(
        `${process.env.REACT_APP_URL}/category/update-category/${props.categoryEdit._id}`,
        {
          newName: editInp,
        },
        {
          headers: {
            Authorization: props.auth?.token,
          },
        }
      );
      props.getCategories();
      toast.success(result.data.message);
      props.setEditpop(!props.editpop);
    } catch (e) {
      toast.error(e.response.data.message);
    }
  };
  return (
    <div className="w-[100vw] top-[0px] left-[0px] absolute flex justify-center items-center h-[100vh] bg-gray-200 opacity-95">
      <div className="fixed w-[500px] h-[150px] p-[20px] bg-amber-950 rounded-lg">
        <IoCloseCircleOutline
          size={25}
          color="white"
          onClick={handleClosebtn}
          className="text-end absolute top-[5px] hover:cursor-pointer right-[10px]"
        />
        <div className="h-[70%] flex items-center ">
          <input
            className=" mb-4 w-[90%] font-serif p-[7px] text-[18px] rounded-lg"
            value={editInp}
            onChange={handleSubmitInp}
          ></input>
        </div>
        <button
          onClick={handleEditSubmit}
          className="bg-blue-800 text-white px-2 py-1 text-[20px] w-[150px] font-serif font-bold rounded-lg"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default CreateCategory;
