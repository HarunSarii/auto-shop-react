import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/slices/CartSlice";
import Cart from "../components/Cart";

const CarDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const { cartItems, isCartVisible } = useSelector((state) => state.cart);

  useEffect(() => {
    axios
      .get(`https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  if (!product) {
    return (
      <div className="container">
        <span className="indicator-progress ">
          Loading...{" "}
          <span className="spinner-border spinner-border-sm align-middle"></span>
        </span>
      </div>
    );
  }

  return (
    <div className="container d-flex my-4  w-100">
      <div
        className={`row p2 bg-light ${
          isCartVisible
            ? "col-lg-8 col-md-8 col-sm-12"
            : "col-lg-12 col-md-12 col-sm-12"
        }`}
      >
        <div className="col-md-6">
          <img src={product.image} alt={product.model} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h3 className="mb-3">{product.name} ₺</h3>
          <p className="card-text text-primary">{product.price}</p>
          <button
            className="btn btn-primary w-100"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
          <p className="text-muted mt-3">{product.description}</p>
        </div>
      </div>
      {isCartVisible && (
        <div className="col-lg-3 col-md-4 col-sm-12">
          <Cart cartItems={cartItems} />
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;
