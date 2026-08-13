import React from "react";

function SearchResult({item}) {
  return (
      <li id="result-item">
        <h3>{item.nomeFantasia}</h3>
        <p>{item.endereco}</p>
        <p>{item.cidade} - {item.uf}</p>
      </li>

  );
}

export default SearchResult;
