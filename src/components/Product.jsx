import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../features/slices/CartSlice";

const Product = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 p-2">
      <div className="card d-flex flex-column h-100">
        <Link to={`/detail/${product.id}`} className="card-link">
          <img
            src={product.image}
            className="card-img-top"
            alt={product.model}
          />
        </Link>
        <div className="card-body d-flex flex-column justify-content-between">
          <div>
            <Link to={`/detail/${product.id}`} className="card-link">
              <p className="card-text text-blue">{`${product.price}₺`}</p>
              <p className="card-text text-dark">{`${product.name}`}</p>
            </Link>
          </div>
          <button
            className="btn btn-primary mt-2"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
