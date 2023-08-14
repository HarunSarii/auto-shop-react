import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Product from "./Product";
import { fetchProducts } from "../features/slices/ProductSlice";
import {
  addSelectedBrand,
  removeSelectedBrand,
  addSelectedModel,
  removeSelectedModel,
  setSortBy,
} from "../features/slices/FilterSlice";
import Filter from "./Filter";
import Cart from "./Cart";

const HomePage = () => {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.search.searchQuery);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [currentProducts, setCurrentProducts] = useState([]);
  const productsPerPage = 12;

  const { cartItems, isCartVisible } = useSelector((state) => state.cart);
  const { selectedBrands, selectedModels, sortBy } = useSelector(
    (state) => state.filter
  );
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const newFilteredProducts = products.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(newFilteredProducts);
    setCurrentPage(1);
  }, [searchQuery, products]);

  useEffect(() => {
    let filteredAndSortedProducts = [...products];

    if (selectedBrands.length > 0) {
      filteredAndSortedProducts = filteredAndSortedProducts.filter((product) =>
        selectedBrands.includes(product.brand)
      );
    }

    if (selectedModels.length > 0) {
      filteredAndSortedProducts = filteredAndSortedProducts.filter((product) =>
        selectedModels.includes(product.model)
      );
    }

    if (sortBy === "New to Old") {
      filteredAndSortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "Old to New") {
      filteredAndSortedProducts.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortBy === "Price High to Low") {
      filteredAndSortedProducts.sort(
        (a, b) => parseFloat(b.price) - parseFloat(a.price)
      );
    } else if (sortBy === "Price Low to High") {
      filteredAndSortedProducts.sort(
        (a, b) => parseFloat(a.price) - parseFloat(b.price)
      );
    }

    const indexOfLastProduct = Math.min(
      currentPage * productsPerPage,
      filteredAndSortedProducts.length
    );
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredAndSortedProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    setCurrentProducts(currentProducts);

    const totalPages = Math.ceil(
      filteredAndSortedProducts.length / productsPerPage
    );
    setTotalPages(totalPages);
  }, [
    selectedBrands,
    selectedModels,
    sortBy,
    currentPage,
    productsPerPage,
    products,
  ]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  useEffect(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );
    setCurrentProducts(currentProducts);
  }, [currentPage, filteredProducts]);

  const allBrands = Array.from(
    new Set(products.map((product) => product.brand))
  );
  const allModels = Array.from(
    new Set(products.map((product) => product.model))
  );

  const handleSelectBrandFilter = (brand) => {
    if (selectedBrands.includes(brand)) {
      dispatch(removeSelectedBrand(brand));
    } else {
      dispatch(addSelectedBrand(brand));
    }
  };

  const handleSelectModelFilter = (model) => {
    if (selectedModels.includes(model)) {
      dispatch(removeSelectedModel(model));
    } else {
      dispatch(addSelectedModel(model));
    }
  };

  const handleSortOptionChange = (value) => {
    dispatch(setSortBy(value));
  };

  return (
    <div className="container">
      <div className="row">
        <div
          className={
            !isCartVisible
              ? "col-lg-3 col-md-3 col-sm-6"
              : "col-lg-2 col-md-3 col-sm-6"
          }
        >
          <Filter
            list={[
              "New to Old",
              "Old to New",
              "Price High to Low",
              "Price Low to High",
            ]}
            selectedItems={sortBy}
            onInput={handleSortOptionChange}
            type="sort"
          />
          <Filter
            list={allBrands}
            selectedItems={selectedBrands}
            onInput={handleSelectBrandFilter}
            type="brand"
          />
          <Filter
            list={allModels}
            selectedItems={selectedModels}
            onInput={handleSelectModelFilter}
            type="model"
          />
        </div>

        <div
          className={
            !isCartVisible
              ? "col-lg-9 col-md-9 col-sm-6"
              : "col-lg-7 col-md-6 col-sm-6"
          }
        >
          <div className="row">
            {currentProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
          <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  &laquo;
                </button>
              </li>
              {Array.from({ length: totalPages }).map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === index + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className={`page-link ${
                      currentPage === index + 1 ? "text-blue-500" : "text-black"
                    }`}
                    onClick={() => handlePageChange(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  &raquo;
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {isCartVisible && (
          <div className="col-lg-3 col-md-3 col-sm-6">
            <Cart cartItems={cartItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
