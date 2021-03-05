import { useRef, useEffect, useState, useContext } from "react";
import AddRestaurant from "./AddRestaurant";
import Context from "../context";

const Map = () => {
  const mapRef = useRef();
  const { state, dispatch } = useContext(Context);

  const [restaurant, setRestaurant] = useState({});
  const [mapElm, setMapElm] = useState(null);

  useEffect(() => {
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
        // populate yor box/field with lat, lng
      });

      // window.google.maps.event.addListener(map, "dragend", (event) => {
      //   const lat = event.latLng.lat();
      //   const lng = event.latLng.lng();

      //   console.log({ lat, lng });
      //   // populate yor box/field with lat, lng
      // });

      navigator.geolocation.getCurrentPosition(({ coords }) => {
        const position = {
          lat: coords.latitude,
          lng: coords.longitude,
        };
        map.setCenter(position);

        const marker = new window.google.maps.Marker({
          position,
          map,
        });

        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: position,
            radius: "2000",
            type: ["restaurant"],
          },
          (results, status) => {
            if (status === "OK") {
              dispatch({ type: "UPDATE_RESTAURANTS", payload: results });
            }
          }
        );
      });
    }
  }, [window.google]);

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
      icon: icon,
      animation: window.google.maps.Animation.DROP,
    });

    // marker.addListener("mouseover", () => {
    //   if (marker.getAnimation() !== null) {
    //     marker.setAnimation(null);
    //   } else {
    //     marker.setAnimation(window.google.maps.Animation.BOUNCE);
    //   }
    // });
  };

  useEffect(() => {
    const restaurants = () => {
      if (state.filtered.length > 0) {
        return state.filtered;
      } else {
        return state.restaurants;
      }
    };

    restaurants().map((r) => createMarker(r));
  }, [state.restaurants, state.filtered]);

  const addRestaurant = (data) => {
    const newRestaurant = { ...data, ...restaurant };

    dispatch({
      type: "UPDATE_RESTAURANTS",
      payload: [newRestaurant, ...state.restaurants],
    });

    setRestaurant({});
  };

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
