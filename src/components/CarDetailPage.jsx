import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CarDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
    <div className="container my-4">
      <div className="row">
        <div className="col-md-6">
          <img src={product.image} alt={product.model} className="img-fluid" />
        </div>
        <div className="col-md-6">
          <h3 className="mb-3">{product.name}</h3>
          <p className="card-text text-primary">$ {product.price}</p>
          <button className="btn btn-primary w-100">Add to Cart</button>
          <p className="text-muted mt-3">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default CarDetailPage;
