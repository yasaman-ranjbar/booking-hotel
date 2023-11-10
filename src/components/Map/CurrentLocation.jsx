import { useMap } from "react-leaflet";

const CurrentLocation = () => {
    const mapRef = useMap();
    
  const setCurrentLocation = (location) => {
    mapRef.flyTo(location, 17, {
      animate: true,
      duration: 2,
    });
  };

  const handleLocationClick = () => {
      navigator.geolocation.getCurrentPosition(
          (pos) => {
                setCurrentLocation({
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                });
                console.log(
                  "latitude =>",
                  pos.coords.latitude,
                  "longitude =>",
                  pos.coords.longitude
                );
          },
        (error) => {
          console.error("error => ", error.message);
        }
      );
  };

  return (
    <button onClick={handleLocationClick} className="getLocation">
      use your location
    </button>
  );
};

export default CurrentLocation;
