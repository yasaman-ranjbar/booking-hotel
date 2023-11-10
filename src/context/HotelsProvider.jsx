import { useContext, useState, createContext } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { toast } from "react-hot-toast";
import axios from "axios";


const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels";

const HotelsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentHotel, setCurrentHotel] = useState(null);
  const [isLoadingCurrHotel, setIsLoadingCurrHotel] = useState(false);

  const destination = searchParams.get("destination");
  const room = JSON.parse(searchParams.get("options"))?.room;

  const { isLoading, data: hotels } = useFetch(
    BASE_URL,
    `q=${destination || ""}&accommodates_gte=${room || 1}`
  );

  async function getHotel(id) {
    setIsLoadingCurrHotel(true);
    try {
      const {data } = await axios.get(`${BASE_URL}/${id}`);
      setCurrentHotel(data);
      setIsLoadingCurrHotel(false);
    } catch (error) {
      setIsLoadingCurrHotel(false);
      toast.error(error.message);
    }
  }
    // q search in all data, but name_like just search on name data

    return (
      <HotelContext.Provider
        value={{
          isLoading,
          hotels,
          getHotel,
          isLoadingCurrHotel,
          currentHotel,
        }}
      >
        {children}
      </HotelContext.Provider>
    );
}
 
export default HotelsProvider;

export function useHotels() {
  return useContext(HotelContext);
}