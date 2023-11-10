import { useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useGeoLocation from "../../hooks/useGeoLocation";
import CurrentLocation from "./CurrentLocation";

const Map = ({ markerLocation, zoom }) => {
  const [mapCenter, setMapCenter] = useState([50, 4]);
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  // const {
  //   isLoading: loadingPos,
  //   getPosition,
  //   position: geoLocationPosition,
  // } = useGeoLocation();

  //   useEffect(() => {
  //     if (geoLocationPosition.lat && geoLocationPosition.lng)
  //       setMapCenter([geoLocationPosition.lat, geoLocationPosition.lng]);
  //   }, [geoLocationPosition]);

  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={zoom}
        scrollWheelZoom={true}
      >
        <DetectClick />
        <CurrentLocation />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
        {markerLocation?.map((item) => (
          <Marker key={item.id} position={[item.latitude, item.longitude]}>
            <Popup>{item.host_location}</Popup>
          </Marker>
        ))}
      </MapContainer>
      ,
    </div>
  );
};

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate()
   useMapEvents({
    click(e) {
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  })
  return null;
}
