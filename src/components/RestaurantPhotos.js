import React from "react";

const RestaurantPhotos = ({ photos }) => {
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={photos && photos[0].getUrl()}
            className="d-block w-100"
            alt=""
          />
        </div>
        {photos &&
          photos?.map((p) => (
            <div
              className="carousel-item"
              data-bs-interval="3000"
              key={photos.indexOf(p)}
            >
              <img src={p.getUrl()} className="d-block w-100" alt="" />
            </div>
          ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default RestaurantPhotos;
