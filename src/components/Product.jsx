import React from "react";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const handleAddToCart = (event) => {
    console.log("Product added to cart:", product.brand);
  };

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4 p-2">
      <div className="card ">
        <Link to={`/detail/${product.id}`} className="card-link">
          <img
            src={product.image}
            className="card-img-top "
            alt={product.model}
          />
        </Link>
        <div className="card-body">
          <Link to={`/detail/${product.id}`} className="card-link ">
            <p className="card-text text-blue">{`$ ${product.price}`}</p>
            <p className="card-text text-dark">{`${product.name}`}</p>
          </Link>

          <button
            className="btn btn-primary mt-4 w-100"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
