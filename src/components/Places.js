import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import Context from "../context";

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

    console.log({ filtered });
  };

  const restaurants = () => {
    if (state.filtered.length === 0 && filter !== 0) {
      return [];
    } else if (state.filtered.length > 0) {
      return state.filtered;
    } else {
      return state.restaurants;
    }
  };

  return (
    <div>
      <h4 className="m-3 fw-bold">Nearby Restaurants</h4>

      <div className="bg-light p-4">
        <StarRatings
          rating={filter}
          numberOfStars={5}
          name="rating"
          changeRating={handleFilter}
          starDimension="20px"
          starSpacing="3px"
          starRatedColor="orange"
        />
      </div>

      {state.filtered.length === 0 && filter !== 0 ? (
        <div className="alert alert-warning">Nothing found</div>
      ) : (
        ""
      )}

      <div className="list-group text-primary">
        {restaurants().map((place) => {
          const photoUrl = place.photos ? place.photos[0].getUrl() : null;
          return (
            <Link
              to={`/${place.place_id}`}
              className="list-group-item "
              aria-current="true"
              key={place.place_id}
            >
              <div className="d-flex w-100 justify-content-between">
                <div className="me-auto">
                  <h5 className="mb-1 fw-bold">{place.name}</h5>
                  <address className="mb-0 text-primary-50">
                    {place.vicinity}
                  </address>
                  <StarRatings
                    rating={place.rating}
                    numberOfStars={5}
                    name="rating"
                    starDimension="20px"
                    starSpacing="3px"
                    starRatedColor="orange"
                  />
                </div>
                {photoUrl && (
                  <img
                    src={photoUrl}
                    width="75"
                    height="75"
                    className="ms-3 rounded-circle"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
