import { useState } from "react";
import StarRatings from "react-star-ratings";

function AddReview({ submit, close }) {
  const [data, setData] = useState({ author_name: "", text: "" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(data);
  };

  return (
    <div className="modal-form">
      <div>
        <button
          onClick={() => close({})}
          className="btn btn-close m-2 bg-danger "
        ></button>

        <h2 className="fs-3 fw-bold text-start mb-4">Add review</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-floating">
            <input
              id="floatingInput"
              type="text"
              name="author_name"
              placeholder="Your Name"
              className="form-control"
              onChange={handleChange}
              value={data.author_name}
              required
            />
            <label htmlFor="floatingInput" className="mb-2">
              Name
            </label>
          </div>
          <div className="form-floating mt-3">
            <textarea
              id="comments"
              name="text"
              placeholder="Text Here..."
              className="form-control"
              style={{ height: 120 }}
              onChange={handleChange}
              value={data.text}
              required
            />
            <label htmlFor="comments">Comment</label>
          </div>
          <div>
            <label htmlFor="rating" className="mt-3 d-block">
              Your Rating
            </label>

            <StarRatings
              rating={data.rating}
              numberOfStars={5}
              name="rating"
              changeRating={(rating) => setData({ ...data, rating })}
              starDimension="20px"
              starSpacing="3px"
              starRatedColor="orange"
            />
          </div>

          <button className="btn btn-success mt-3 float-end">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddReview;
