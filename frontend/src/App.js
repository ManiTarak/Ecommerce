import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  HomePage,
  About,
  Contact,
  PageNotFound,
  Policy,
  Register,
  Login,
  ForgetPass,
  ProtectedRoute,
  SearchedProducts,
} from "./pages/index";
import {
  AdminDashboard,
  AdminDetails,
  AdminRoute,
  CreateCategory,
  CreateProduct,
  UsersList,
  Products,
  UpdateProduct,
} from "./pages/Admin/index";

import { Orders, UserDashboard, Profile } from "./pages/User/index";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage></HomePage>}></Route>
      <Route path="/About" element={<About></About>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route
        path="/forget-password"
        element={<ForgetPass></ForgetPass>}
      ></Route>
      <Route path="/contact" element={<Contact></Contact>}></Route>
      <Route path="/policy" element={<Policy></Policy>}></Route>

      {/* <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard></Dashboard>
          </ProtectedRoute>
        }
      ></Route> */}
      <Route path="/dashboard" element={<ProtectedRoute></ProtectedRoute>}>
        <Route path="user" element={<UserDashboard></UserDashboard>}>
          <Route index element={<Profile></Profile>}></Route>
          <Route path="profile" element={<Profile></Profile>} />
          <Route path="orders" element={<Orders></Orders>} />
        </Route>
      </Route>
      <Route path="/dashboard" element={<AdminRoute></AdminRoute>}>
        <Route path="admin" element={<AdminDashboard></AdminDashboard>}>
          <Route index element={<AdminDetails></AdminDetails>}></Route>
          <Route
            path="create-category"
            element={<CreateCategory></CreateCategory>}
          ></Route>
          <Route
            path="create-product"
            element={<CreateProduct></CreateProduct>}
          ></Route>
          <Route path="products" element={<Products></Products>}></Route>
          <Route path="users" element={<UsersList></UsersList>}></Route>
          <Route path="product/:id" element={<UpdateProduct></UpdateProduct>} />
        </Route>
      </Route>
      <Route
        path="/searched-products/:searchValue"
        element={<SearchedProducts></SearchedProducts>}
      ></Route>
      <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
    </Routes>
  );
}

export default App;
