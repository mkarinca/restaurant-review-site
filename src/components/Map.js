import { useRef, useEffect, useState } from "react";

const Map = ({ getPlaces }) => {
  const mapRef = useRef();

  const [restaurant, setRestaurant] = useState({});

  useEffect(() => {
    if (window.google) {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 0, lng: 0 },
        zoom: 14,
      });

      window.google.maps.event.addListener(map, "rightclick", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        setRestaurant({ lat, lng });
        // populate yor box/field with lat, lng
      });

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

        const createPhotoMarker = (place) => {
          const photos = place.photos;
          if (!photos) {
            return;
          }

          const icon = {
            url: "https://www.summitdowntown.org/static/img/icon_eat.svg",
            scaledSize: new window.google.maps.Size(50, 50),
          };

          const marker = new window.google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name,
            icon: icon,
            animation: window.google.maps.Animation.DROP,
          });

          marker.addListener("mouseover", () => {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(window.google.maps.Animation.BOUNCE);
            }
          });
        };

        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch(
          {
            location: position,
            radius: "2000",
            type: ["restaurant"],
          },
          (results, status) => {
            if (status === "OK") {
              getPlaces(results);

              for (var i = 0; i < results.length; i++) {
                createPhotoMarker(results[i]);
              }
            }
          }
        );
      });
    }
  }, [window.google]);

  return (
    <>
      {restaurant.lat && (
        <h2 className="display-4 text-center">Adding a new restaurant</h2>
      )}
      <div
        ref={mapRef}
        style={{ height: "calc(100vh - 68px)", width: "100%" }}
      />
    </>
  );
};

export default Map;
