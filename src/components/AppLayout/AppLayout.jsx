import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotels } from "../../context/HotelsProvider";

const AppLayout = () => {
    const { hotels } = useHotels();
    return (
      <div className="appLayout">
        <div className="sidebar">
          <Outlet />
        </div>
        <Map markerLocation={hotels} zoom={6} />
      </div>
    );
}
 
export default AppLayout;