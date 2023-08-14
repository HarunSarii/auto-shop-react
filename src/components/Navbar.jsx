import React, { useEffect } from "react";
import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  clearSearchQuery,
} from "../features/slices/SearchSlice";
import { toggleCart } from "../features/slices/CartSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const handleSearch = (event) => {
    const newSearchQuery = event.target.value;
    dispatch(setSearchQuery(newSearchQuery));
  };

  useEffect(() => {
    return () => {
      dispatch(clearSearchQuery());
    };
  }, [dispatch]);

  const totalPrice = cartItems.reduce((total, product) => {
    return total + parseFloat(product.price) * product.quantity;
  }, 0);
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <div className="d-flex align-items-center">
          <Link to="/" className="navbar-brand">
            <h2 className="mb-0">Eteration</h2>
          </Link>
          <div className="input-group ml-3">
            <div className="input-group-prepend">
              <span className="input-group-text bg-white">
                <FaSearch />
              </span>
            </div>
            <input
              type="text"
              className="form-control rounded-right"
              placeholder="Search"
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className="d-flex align-items-center ml-auto">
          <div
            className="d-flex align-items-center text-white "
            style={{ cursor: "pointer" }}
            onClick={() => dispatch(toggleCart())}
          >
            <FaShoppingCart />
            <span className="badge badge-danger ml-2">{totalQuantity}</span>
            <span className="ml-2">{totalPrice}₺</span>
          </div>
          <div className="d-flex align-items-center text-white pl-4">
            <FaUser />
            <span className="ml-2">User</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
