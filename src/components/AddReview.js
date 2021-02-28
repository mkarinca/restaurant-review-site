import { useState } from "react";

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
        <button onClick={() => close({})} className="btn btn-danger">
          &times;
        </button>

        <h2 className="display-4 text-center">Adding new review</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="authorName">Name</label>
            <input
              id="authorName"
              type="text"
              name="author_name"
              className="form-control"
              onChange={handleChange}
              value={data.author_name}
            />
          </div>
          <div className="form-group">
            <label htmlFor="comments">Comment</label>
            <textarea
              id="comments"
              name="text"
              className="form-control"
              onChange={handleChange}
              value={data.text}
            />
          </div>
          <button className="btn btn-success my-3">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddReview;
