import { useContext, useState } from "react";

import StarRatings from "react-star-ratings";
import Context from "../context";
import RestaurantList from "./RestaurantList";

export default function Places() {
  const { state, dispatch } = useContext(Context);
  const [filter, setFilter] = useState(0);

  console.log({ state });

  const handleFilter = (rating) => {
    setFilter(rating);
    const filtered = state.restaurants.filter(
      (r) => Math.floor(r.rating || 0) === rating
    );

    dispatch({
      type: "FILTER_RESTAURANTS",
      payload: filtered,
    });
  };

  const restaurants = () => {
    if (state.filtered.length === 0 && filter !== 0) {
      return [];
    } else if (state.filtered.length > 0 && filter === 0) {
      return state.restaurants;
    } else if (state.filtered.length > 0) {
      return state.filtered;
    } else {
      return state.restaurants;
    }
  };

  const clearFilter = () => {
    setFilter(0);
    dispatch({ type: "CLEAR_FILTERS" });
  };

  const handleHover = (e) => {
    console.log({ e });
    const foundMarker = state.markers.filter((m) => {
      if (m.getAnimation() !== null) {
        m.setAnimation(null);
      }

      return m.place_id === e.target.dataset.id;
    });

    if (foundMarker.length > 0) {
      foundMarker[0].setAnimation(window.google.maps.Animation.BOUNCE);
    }
  };

  return (
    <ul className="list-group">
      <li className="list-group-item active">
        <h4 className="m-3 fw-bold">Nearby Restaurants</h4>

        <div className="bg-light p-3">
          <h4 className="border-bottom fw-bold text-primary">
            Filter Restaurants
          </h4>
          <StarRatings
            rating={filter}
            numberOfStars={5}
            name="rating"
            changeRating={handleFilter}
            starDimension="20px"
            starSpacing="3px"
            starRatedColor="orange"
          />
          {filter !== 0 && (
            <button
              className="btn btn-sm btn-danger ms-3"
              onClick={() => clearFilter()}
            >
              Clear Filter
            </button>
          )}
        </div>
      </li>

      {state.filtered.length === 0 && filter !== 0 ? (
        <div className="alert alert-warning m-2">Nothing found</div>
      ) : (
        restaurants().map((r, i) => (
          <li
            onMouseEnter={handleHover}
            data-id={r.place_id}
            key={i}
            className="list-group-item "
          >
            <RestaurantList place={r} />
          </li>
        ))
      )}
    </ul>
  );
}
