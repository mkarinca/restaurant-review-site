import { useState } from "react";

import Map from "../components/Map";
import Places from "../components/Places";

export default function Home() {
  const [places, setPlaces] = useState([]);

  const getPlaces = (data) => {
    setPlaces(data);
  };

  return (
    <div className="container-fluid px-0">
      <div className="row g-0">
        <div className="col-md-9">
          <Map getPlaces={getPlaces} />
        </div>
        <div className="col-md-3 shadow-lg bg-primary text-white">
          <div style={{ height: "calc(100vh - 68px)", overflowX: "hidden" }}>
            <Places places={places} />
          </div>
        </div>
      </div>
    </div>
  );
}
