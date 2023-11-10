import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import {  Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelsProvider from "./context/HotelsProvider";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/Bookmarks/BookmarkLayout";
import BookmarkProvider from "./context/BookmarkListContext";
import BookmarkList from "./components/Bookmarks/BookmarkList";
import SingleBookmark from "./components/Bookmarks/SingleBookmark";
import AddNewBookmark from "./components/Bookmarks/AddNewBookmark";
import Login from "./components/login/Login";
import AuthProvider from "./context/AuthProvider";
import ProtectedRouts from "./components/ProtectedRouts/ProtectedRouts";

function App() {
  return (
    <AuthProvider>
      <BookmarkProvider>
        <HotelsProvider>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route
              path="/bookmarks"
              element={
                <ProtectedRouts>
                  <BookmarkLayout />
                </ProtectedRouts>
              }
            >
              <Route
                index
                element={
                  <ProtectedRouts>
                    <BookmarkList />
                  </ProtectedRouts>
                }
              />
              <Route
                path=":id"
                element={
                  <ProtectedRouts>
                    <SingleBookmark />
                  </ProtectedRouts>
                }
              />
              <Route
                path="add"
                element={
                  <ProtectedRouts>
                    <AddNewBookmark />
                  </ProtectedRouts>
                }
              />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </HotelsProvider>
      </BookmarkProvider>
    </AuthProvider>
  );
}

export default App;
