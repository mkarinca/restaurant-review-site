import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const RestaurantList = ({ place }) => {
  const photoUrl = place.photos
    ? place.photos[0].getUrl()
    : "https://www.merzifontashanotel.com/img/img_17.jpg";

  return (
    <div className=" text-primary">
      {place.place_id ? (
        <Link
          to={`/${place.place_id}`}
          aria-current="true"
          data-id={place.place_id}
          style={{ textDecoration: "none" }}
        >
          <div
            className="d-flex w-100 justify-content-between"
            data-id={place.place_id}
          >
            <div className="me-auto" data-id={place.place_id}>
              <h5 className="mb-1 fw-bold" data-id={place.place_id}>
                {place.name}
              </h5>
              <address
                className="mb-0 text-primary-50"
                data-id={place.place_id}
              >
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
            <div data-id={place.place_id}>
              {photoUrl && (
                <img
                  data-id={place.place_id}
                  src={photoUrl}
                  width="70"
                  height="70"
                  className="ms-3 rounded-circle"
                  alt=""
                />
              )}
            </div>
          </div>
        </Link>
      ) : (
        <div className=" d-flex justify-content-between" data-id={place.time}>
          <div className="me-auto" data-id={place.time}>
            <h5 className="mb-1 fw-bold" data-id={place.time}>
              {place.name}
            </h5>
            <address className="mb-0 text-primary" data-id={place.time}>
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
          <div data-id={place.time}>
            {photoUrl && (
              <img
                data-id={place.time}
                src={photoUrl}
                width="70"
                height="70"
                className="ms-3 rounded-circle"
                alt=""
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RestaurantList;
