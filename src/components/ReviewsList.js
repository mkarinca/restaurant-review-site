import React from "react";

function ReviewsList({ reviews }) {
  return (
    <div className="row">
      {reviews?.map((r) => (
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">{r.author_name}</h5>
              <hr />
              <p>{r.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ReviewsList;
