import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkListContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Loader from "../Loader/Loader";

const SingleBookmark = () => {
  const { id } = useParams();
  const navigate = useNavigate();

    const { getBookmark, isLoading, currentBookmark } = useBookmark();
    
      useEffect(() => {
        getBookmark(id);
      }, [id]);
    
     if (isLoading || !currentBookmark) return <Loader />;
    
  return (
    <div className="currentBookmark">
      <button onClick={() => navigate(-1)} className="btn btn--back">
        &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className={`bookmarkItem`}>
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp; <strong>{currentBookmark.cityName}</strong> &nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
};

export default SingleBookmark;
