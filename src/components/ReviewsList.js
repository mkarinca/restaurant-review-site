import React from "react";
import StarRatings from "react-star-ratings";

function ReviewsList({ reviews }) {
  return (
    <div className="row">
      {reviews?.map((review) => (
        <div
          className="col-md-4 d-flex text-center align-items-stretch"
          key={review.time}
        >
          <div className="card border-light mb-4 w-100 shadow">
            <div className="card-header ">
              <img
                className="border border-3 rounded-circle shadow"
                width="100"
                height="100"
                src={
                  review.profile_photo_url
                    ? review.profile_photo_url
                    : "https://media.istockphoto.com/vectors/default-avatar-profile-icon-grey-photo-placeholder-vector-id846183008?b=1&k=6&m=846183008&s=612x612&w=0&h=ZC65KHQwZj_-NvgmW8EAhNEVWjbOSUBfJXJxHXxhVrk="
                }
                alt="review-image"
              />
            </div>
            <div className="card-body">
              <h5 className="card-title">{review.author_name}</h5>
              <StarRatings
                rating={review.rating}
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="3px"
                starRatedColor="orange"
              />
              <div className="scrollable">
                <p className="text-start mt-2">{review.text}</p>
              </div>
              <p className="card-text text-center">
                <small className="text-muted"></small>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
