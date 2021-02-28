import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

export default function Places({ places }) {
  return (
    <div>
      <h4 className="m-3 fw-bold">Nearby Restaurants</h4>
      <div className="list-group text-primary">
        {places.map((place) => {
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
