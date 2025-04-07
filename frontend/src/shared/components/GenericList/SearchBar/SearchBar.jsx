import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { SEARCH_PARAMETER } from "@/core/constants/api";

const SearchBar = ({ onSearchSubmitted, placeholder = "Search" }) => {
  const [searchParameters, setSearchParameters] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const searchTerm = searchParameters.get(SEARCH_PARAMETER);
    searchTerm && setSearchTerm(searchTerm);
  }, [searchParameters]);

  const handleChange = (event) => setSearchTerm(event?.target?.value);

  const handleSubmit = (event) => {
    event?.preventDefault();

    onSearchSubmitted && onSearchSubmitted(searchTerm);

    const URLSearchParameters = new URLSearchParams(searchParameters);
    URLSearchParameters.set(SEARCH_PARAMETER, searchTerm);
    setSearchParameters(URLSearchParameters);
  };

  const clear = () => {
    setSearchTerm("");

    onSearchSubmitted && onSearchSubmitted("");

    const URLSearchParameters = new URLSearchParams(searchParameters);
    URLSearchParameters.delete(SEARCH_PARAMETER);
    setSearchParameters(URLSearchParameters);
  };

  return (
    <form
      className="form-group position-relative has-icon-left"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(event) => handleChange(event)}
      />
      <div className="form-control-icon cursor-pointer" onClick={handleSubmit}>
        <i className="bi bi-search"></i>
      </div>
      {searchTerm && (
        <div
          className="form-control-icon form-control-icon-right cancel-search cursor-pointer"
          style={{
            position: "absolute",
            right: "42px",
            left: "auto",
            paddingRight: "1rem",
          }}
          role="button"
          onClick={clear}
        >
          <i className="bi bi-x-circle-fill"></i>
        </div>
      )}
    </form>
  );
};

export default SearchBar;
