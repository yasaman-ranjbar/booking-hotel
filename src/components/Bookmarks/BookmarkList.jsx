import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkListContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi";

const BookmarkList = () => {
  const { bookmarks, isLoading, currentBookmark, deleteBookmark } =
    useBookmark();

  const handleDelete = async(e, id) => {
    e.preventDefault();
    await deleteBookmark(id);
  };

  if (isLoading) return <Loader />;
  return (
    <div>
      <h2>BookmarkList</h2>

      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark?.id ? "current-bookmark" : ""
                }`}
              >
                <div>
                  <ReactCountryFlag svg countryCode={item.countryCode} />
                  &nbsp; <strong>{item.cityName}</strong> &nbsp;
                  <span>{item.country}</span>
                </div>
                <button onClick={(e) => handleDelete(e, item.id)}>
                  <HiTrash className="trash" />
                </button>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BookmarkList;
