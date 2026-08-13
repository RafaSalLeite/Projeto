import React from "react";

function SearchBar({ onSearch, onFocus, onBlur }) {
    return (
        <input
            type="text"
            placeholder="Buscar unidade..."
            onChange={(e) => onSearch(e.target.value)}
            onFocus={onFocus}
            onBlur={onBlur}
            id="search-input"
        />
    );
}

export default SearchBar;
