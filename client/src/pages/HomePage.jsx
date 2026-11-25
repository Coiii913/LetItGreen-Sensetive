import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useApp } from "../state/AppContext.jsx";
import SearchBar from "../components/SearchBar.jsx";
import CategoryTabs from "../components/CategoryTabs.jsx";
import ItemCard from "../components/ItemCard.jsx";

const SORT_OPTIONS = [
  { id: "recommend", label: "Recommend" },
  { id: "price-asc", label: "Price ↑" },
  { id: "price-desc", label: "Price ↓" },
  { id: "distance", label: "Distance" },
  { id: "co2-saved", label: "CO₂ Saved" }
];

export default function HomePage() {
  const { items: allItems, loadingItems } = useApp();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("recommend");
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [sort, setSort] = useState("recommend");

  // Debounce the search input to avoid spamming the AI search endpoint
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(search.trim()), 350);
    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    if (!debouncedSearch) {
      setFilteredItems(allItems);
      return;
    }
    setSearchLoading(true);
    axios.post("/api/search", { query: debouncedSearch })
      .then(res => {
        setFilteredItems(res.data.items || []);
      })
      .catch(err => {
        console.error("Search failed", err);
        // Fallback to local filter
        const term = debouncedSearch.toLowerCase();
        setFilteredItems(allItems.filter(item =>
          item.title.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          (item.keywords || []).some(k => k.toLowerCase().includes(term))
        ));
      })
      .finally(() => setSearchLoading(false));
  }, [debouncedSearch, allItems]);

  const finalFiltered = useMemo(() => {
    let result = filteredItems;
    if (category !== "recommend") {
      result = result.filter((item) => {
        if (category === "living") return item.tags?.includes("living");
        if (category === "electronics") return item.tags?.includes("electronics");
        if (category === "sports") return item.tags?.includes("sports");
        return true;
      });
    }
    if (sort !== "recommend") {
      result = [...result].sort((a, b) => {
        if (sort === "price-asc") return (a.price || 0) - (b.price || 0);
        if (sort === "price-desc") return (b.price || 0) - (a.price || 0);
        if (sort === "distance") return (a.distanceKm || 0) - (b.distanceKm || 0);
        if (sort === "co2-saved") return (b.co2Saved || 0) - (a.co2Saved || 0);
        return 0;
      });
    }
    return result;
  }, [filteredItems, category, sort]);

  return (
    <div className="page home-page">
      <section className="home-hero">
        <SearchBar value={search} onChange={setSearch} />
        <CategoryTabs value={category} onChange={setCategory} />
        <div className="sort-bar">
          <select
            className="sort-select"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Sort items"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>{opt.label}</option>
            ))}
          </select>
        </div>
      </section>
      <section className="home-grid-wrapper">
        {(loadingItems || searchLoading) && <div className="soft-pill">Loading items...</div>}
        {!loadingItems && !searchLoading && finalFiltered.length === 0 && (
          <div className="soft-pill">No items match your search yet.</div>
        )}
        <div className="home-grid">
          {finalFiltered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
}

