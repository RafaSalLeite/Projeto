import React from "react";
import SearchResult from "./SearchResult";
import "./SearchResultsList.css"

function SearchResultsList({results}) {
  if (results.length === 0) {
    return (
        <ul className="results-list">
          <li className="result-item">
            <p>Nenhum resultado encontrado.</p>
            </li>
          </ul>
    );
  }

  return (
      <ul id="results-list">
        {results.map((item) => (
            <SearchResult key={item.cnes} item={item} />
        ))}
      </ul>
  );
}

export default SearchResultsList;
