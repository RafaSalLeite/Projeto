import { useEffect, useState } from "react";
import "./SearchBar.css";
import SearchBar from "./SearchBar";
import SearchResultsList from "./SearchResultsList";

function Search() {
    const [query, setQuery] = useState(""); // texto digitado
    const [data, setData] = useState([]); // dados vindos do JSON
    const [filtered, setFiltered] = useState([]); // resultados filtrados
    const [isFocused, setIsFocused] = useState(false); // controla se o input está selecionado

    // 1️⃣ Buscar dados do JSON (simulando o backend)
    useEffect(() => {
        fetch("/unidades.json") // deve estar dentro de public/
            .then((res) => res.json())
            .then((json) => setData(json.content || [])) // acessa o array "content"
            .catch((err) => console.error("Erro ao carregar dados:", err));
    }, []);

    // 2️⃣ Filtrar resultados conforme a busca
    useEffect(() => {
        if (query.trim() === "") {
            setFiltered([]);
        } else {
            const results = data.filter((item) =>
                item.nomeFantasia.toLowerCase().includes(query.toLowerCase())
            );
            setFiltered(results);
        }
    }, [query, data]);

    return (
        <div id="search-container">
            <div id="search-wrapper">
                <SearchBar
                    onSearch={setQuery}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 150)} // delay pra permitir clique
                />

                {isFocused && query.trim() !== "" && filtered.length > 0 && (
                    <SearchResultsList results={filtered} />
                )}
            </div>
        </div>
    );
}

export default Search;
