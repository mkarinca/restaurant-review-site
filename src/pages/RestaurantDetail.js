import { useEffect, useState, useRef } from "react";
import StarRatings from "react-star-ratings";
import { FaMapMarkerAlt, FaPhoneAlt, FaLink } from "react-icons/fa";
import AddReview from "../components/AddReview";
import ReviewsList from "../components/ReviewsList";
import RestaurantPhotos from "../components/RestaurantPhotos";

export default function RestaurantDetail(props) {
  const mapRef = useRef();

  const [place, setPlace] = useState({});
  const [review, setReview] = useState({});

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {});
    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails(
      {
        placeId: props.match.params.placeId,
      },
      (data, status) => {
        if (status === "OK") {
          console.log(data);

          setPlace(data);
        }
      }
    );
  }, []);

  const addReview = (data) => {
    console.log({ data });

    setPlace({ ...place, reviews: [data, ...place.reviews] });
    setReview({});
  };

  return (
    <div>
      <div className="container ">
        <div ref={mapRef} />
        <div className="row bg-light ">
          <div className="col-4 mt-5">
            <div className="card text-center mt-4 shadow-lg ">
              <div className="card-body p-4 rounded-3">
                <img
                  className="border border-3 border-dark rounded-circle shadow"
                  width="180"
                  height="180"
                  src={
                    place.photos
                      ? place.photos[0].getUrl()
                      : "https://www.merzifontashanotel.com/img/img_17.jpg"
                  }
                  alt="restaurant-image"
                />
                <h5 className="card-title mt-4 fw-bold fs-3">{place.name}</h5>

                <StarRatings
                  rating={place.rating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="25px"
                  starSpacing="3px"
                  starRatedColor="orange"
                />

                {place.vicinity && (
                  <div className="d-flex justify-content-start mt-3">
                    <div className="icon">
                      <FaMapMarkerAlt size="20px" />
                    </div>
                    <div className="text-start ms-3">
                      <p>{place.vicinity}</p>
                    </div>
                  </div>
                )}

                {place.formatted_phone_number && (
                  <div className="d-flex justify-content-start">
                    <div className="icon">
                      <FaPhoneAlt />
                    </div>
                    <div className="text-start ms-3">
                      <p>{place.formatted_phone_number}</p>
                    </div>
                  </div>
                )}

                {place.website && (
                  <div className="d-flex justify-content-start">
                    <div className="icon">
                      <FaLink />
                    </div>
                    <div className="mb-3">
                      <a
                        href={place.website}
                        className="text-decoration-none link-dark ms-3"
                      >
                        Go to Website
                      </a>
                    </div>
                  </div>
                )}

                {place.price_level && (
                  <div>
                    <StarRatings
                      rating={place.price_level}
                      numberOfStars={4}
                      starDimension="20px"
                      starSpacing="0px"
                      svgIconPath="M118.1,235.517c7.898,0,14.31-6.032,14.31-13.483c0-7.441,0-13.473,0-13.473
                    c39.069-3.579,64.932-24.215,64.932-57.785v-0.549c0-34.119-22.012-49.8-65.758-59.977V58.334c6.298,1.539,12.82,3.72,19.194,6.549
                    c10.258,4.547,22.724,1.697,28.952-8.485c6.233-10.176,2.866-24.47-8.681-29.654c-11.498-5.156-24.117-8.708-38.095-10.236V8.251
                    c0-4.552-6.402-8.251-14.305-8.251c-7.903,0-14.31,3.514-14.31,7.832c0,4.335,0,7.843,0,7.843
                    c-42.104,3.03-65.764,25.591-65.764,58.057v0.555c0,34.114,22.561,49.256,66.862,59.427v33.021
                    c-10.628-1.713-21.033-5.243-31.623-10.65c-11.281-5.755-25.101-3.72-31.938,6.385c-6.842,10.1-4.079,24.449,7.294,30.029
                    c16.709,8.208,35.593,13.57,54.614,15.518v13.755C103.79,229.36,110.197,235.517,118.1,235.517z M131.301,138.12
                    c14.316,4.123,18.438,8.257,18.438,15.681v0.555c0,7.979-5.776,12.651-18.438,14.033V138.12z M86.999,70.153v-0.549
                    c0-7.152,5.232-12.657,18.71-13.755v29.719C90.856,81.439,86.999,77.305,86.999,70.153z"
                      svgIconViewBox="0 0 235.517 235.517"
                      starRatedColor="green"
                      name="price"
                    />
                  </div>
                )}

                {place.opening_hours && (
                  <div className="d-flex mt-4 justify-content-center">
                    <span
                      className={`fs-5 badge ${
                        place.opening_hours.isOpen()
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {place.opening_hours.isOpen() ? "OPEN" : "CLOSED"}
                    </span>
                  </div>
                )}
              </div>

              <img
                className="img-fluid"
                src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${place.geometry?.location.lat()},${place.geometry?.location.lng()}&fov=80&heading=70&pitch=0&key=${
                  process.env.REACT_APP_MAP_API
                }`}
                alt="streeview-photo"
              />
            </div>
          </div>
          <div
            className="col-8 mt-4 pt-5 
          "
          >
            <RestaurantPhotos photos={place.photos} />
            <div className="d-flex my-4">
              <h2 className="border-bottom">Reviews</h2>
              <button
                onClick={() => setReview({ time: new Date().getTime() })}
                className="btn btn-primary mb-3 ms-auto"
              >
                Add Review
              </button>
            </div>
            {review.time && <AddReview submit={addReview} close={setReview} />}
            <ReviewsList reviews={place.reviews} />
          </div>
        </div>
      </div>
    </div>
  );
}
