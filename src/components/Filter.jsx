import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";

const Filter = ({ list, selectedItems, onInput, type }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  const handleCheckboxChange = (item) => {
    const updatedSelectedItems = selectedItems?.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];

    onInput(updatedSelectedItems);
  };

  const handleRadioChange = (item) => {
    onInput(item);
  };

  useEffect(() => {
    if (searchQuery) {
      setFilteredList(
        list?.filter((item) =>
          item?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredList(list);
    }
  }, [searchQuery, list]);

  return (
    <div
      className="scrollable-filter p-2 my-2 "
      style={{
        maxHeight: "200px",
        overflowY: "auto",
        maxWidth: "250px",
        border: "1px solid #ccc",
        borderRadius: "4px",
      }}
    >
      <div className="flex items-center p-2 bg-gray-100">
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      {filteredList.map((item) => (
        <div className="form-check" key={item}>
          <input
            type={type === "sort" ? "radio" : "checkbox"}
            className="form-check-input"
            id={`${type}-${item}`}
            checked={
              type === "checkbox"
                ? selectedItems?.includes(item)
                : selectedItems?.includes(item)
            }
            onChange={
              type === "checkbox"
                ? () => handleCheckboxChange(item)
                : () => handleRadioChange(item)
            }
          />
          <label className="form-check-label" htmlFor={`${type}-${item}`}>
            {type === "sort" ? item : ` ${item}`}
          </label>
        </div>
      ))}
    </div>
  );
};

export default Filter;
