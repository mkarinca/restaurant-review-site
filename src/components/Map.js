import { useRef, useEffect, useState, useContext } from "react";
import AddRestaurant from "./AddRestaurant";
import Context from "../context";

const Map = () => {
  const mapRef = useRef();
  const { state, dispatch } = useContext(Context);

  const [restaurant, setRestaurant] = useState({});
  const [mapElm, setMapElm] = useState(null);
  // const [markers, setMarkers] = useState([]);

  useEffect(() => {
    mapRef.current.addEventListener("contextmenu", (e) => false);

    if (window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 14,
      });

      setMapElm(map);

      window.google.maps.event.addListener(map, "rightclick", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        setRestaurant({ lat, lng });
        // populate your box/field with lat, lng
      });

      window.google.maps.event.addListener(map, "dragend", () => {
        window.google.maps.event.addListener(map, "click", function (event) {
          console.log({ event });

          const lat = event.latLng.lat();
          const lng = event.latLng.lng();

          fetchPlaces({ lat, lng }, map);

          // populate yor box/field with lat, lng
        });
      });

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const position = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        map.setCenter(position);

        new window.google.maps.Marker({
          position,
          map,
        });

        fetchPlaces(position, map);
      });
    }
  }, [window.google]);

  const fetchPlaces = (location, map) => {
    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(
      {
        location,
        radius: "2000",
        type: ["restaurant"],
      },
      (results, status) => {
        if (status === "OK") {
          dispatch({ type: "UPDATE_RESTAURANTS", payload: results });
        }
      }
    );
  };

  const createMarker = (place) => {
    const icon = {
      url: "https://www.summitdowntown.org/static/img/icon_eat.svg",
      scaledSize: new window.google.maps.Size(50, 50),
    };

    const position = {
      lat: place.lat ? place.lat : place.geometry.location.lat(),
      lng: place.lng ? place.lng : place.geometry.location.lng(),
    };

    const marker = new window.google.maps.Marker({
      map: mapElm,
      position,
      title: place.name,
      place_id: place.place_id ? place.place_id : place.time,
      icon: icon,
      animation: window.google.maps.Animation.DROP,
    });

    // const infowindow = new window.google.maps.InfoWindow({
    //   content: `
    //     <h2>${place.name}</h2>
    //     <p>${place.vicinity}</p>
    //     <p>${place.rating}</p>
    //   `,
    // });

    // marker.addListener("click", () => {
    //   infowindow.open(mapElm, marker);
    // });

    return marker;
  };

  function clearMarkers() {
    for (let i = 0; i < state.markers.length; i++) {
      state.markers[i].setMap(null);
    }

    dispatch({ type: "UPDATE_MARKERS", payload: [] });
  }

  useEffect(() => {
    let markersArr = [];

    if (state.filtered.length === 0 && state.filtering) {
      clearMarkers();
    } else {
      const restaurants =
        state.filtered.length > 0 ? state.filtered : state.restaurants;

      clearMarkers();

      restaurants.map((r) => {
        const marker = createMarker(r);

        markersArr = [...markersArr, marker];
      });

      dispatch({ type: "UPDATE_MARKERS", payload: markersArr });
    }
  }, [state.restaurants, state.filtered]);

  const addRestaurant = (data) => {
    const newRestaurant = {
      ...data,
      ...restaurant,
      time: new Date().getTime(),
    };

    dispatch({
      type: "UPDATE_RESTAURANTS",
      payload: [newRestaurant, ...state.restaurants],
    });

    setRestaurant({});
  };

  console.log({ markers: state.markers });

  return (
    <>
      {restaurant.lat && (
        <AddRestaurant submit={addRestaurant} close={setRestaurant} />
      )}
      <div
        ref={mapRef}
        style={{ height: "calc(100vh - 68px)", width: "100%" }}
      />
    </>
  );
};

export default Map;
