import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../state/AppContext.jsx";
import { distanceKm } from "../utils/geoUtils.js";
import { calculateCarbonSaved, detectCategory } from "../utils/carbonCalculator.js";

export default function ItemCard({ item }) {
  const navigate = useNavigate();
  const { favorites, toggleFavorite, addToCart, cart, userLocation } = useApp();
  const isFav = favorites.includes(item.id);
  const isInCart = cart.includes(item.id);

  const distance =
    userLocation && item.location?.lat != null && item.location?.lng != null
      ? distanceKm(
          userLocation.lat,
          userLocation.lng,
          item.location.lat,
          item.location.lng
        )
      : (item.distanceKm ?? 0.5);

  const co2Display = (() => {
    if (typeof item.co2Saved === "number") return item.co2Saved.toFixed(1);
    if (typeof item.productionEmission === "number") {
      const decay = typeof item.decayRate === "number" ? item.decayRate : 0.2;
      return calculateCarbonSaved(null, item.productionEmission, decay).toFixed(1);
    }
    const category = detectCategory(item.title);
    return calculateCarbonSaved(category).toFixed(1);
  })();

  const postedAgo = (() => {
    const mins = item.postedMinutesAgo;
    if (typeof mins !== "number") return null;
    if (mins < 60) return `${mins}m ago`;
    if (mins < 1440) return `${Math.floor(mins / 60)}h ago`;
    return `${Math.floor(mins / 1440)}d ago`;
  })();

  return (
    <article className="item-card" onClick={() => navigate(`/items/${item.id}`)}>
      {/* 收藏按钮 */}
      <button
        type="button"
        className="item-card-fav"
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite(item.id);
        }}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
      >
        {isFav ? "★" : "☆"}
      </button>
      <button
        type="button"
        className="item-card-cart"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(item.id);
        }}
        aria-label={isInCart ? "In cart" : "Add to cart"}
      >
        {isInCart ? "✓ In cart" : "+ Cart"}
      </button>

      {/* 图片区域 */}
      <div className="item-card-image-wrapper">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="item-card-image"
        />
      </div>

      {/* 信息区域：左右分布 */}
      <div className="item-card-body">
        {/* 左侧：标题 + 距离位置 */}
        <div className="item-card-info-left">
          <h3 className="item-card-title">{item.title}</h3>
          <div className="item-card-location">
            {postedAgo ? `${postedAgo} · ` : ""}
            {distance.toFixed(1)}km | {item.location?.label || item.location?.city || "Dublin"}
          </div>
        </div>

        {/* 右侧：价格 + 碳排放方块 */}
        <div className="item-card-info-right">
          <div className="item-card-price">€{item.price}</div>
          <div className="item-card-co2-badge">
            <span className="co2-num">-{co2Display}</span>
            <span className="co2-label">kg CO₂</span>
          </div>
        </div>
      </div>
    </article>
  );
}