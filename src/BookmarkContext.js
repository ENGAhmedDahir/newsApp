import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Create the Bookmark Context
const BookmarkContext = createContext();

// Create the Provider component
export const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from AsyncStorage
  useEffect(() => {
    const loadBookmarks = async () => {
      try {
        const storedBookmarks = await AsyncStorage.getItem("bookmarks");
        if (storedBookmarks) {
          setBookmarks(JSON.parse(storedBookmarks));
        }
      } catch (error) {
        console.error("Failed to load bookmarks:", error);
      }
    };

    loadBookmarks();
  }, []);

  // Save bookmarks to AsyncStorage
  const saveBookmarksToStorage = async (updatedBookmarks) => {
    try {
      await AsyncStorage.setItem("bookmarks", JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  };

  // Toggle a bookmark (add/remove)
  const toggleBookmark = (news) => {
    setBookmarks((prev) => {
      const updatedBookmarks = prev.some((item) => item.id === news.id)
        ? prev.filter((item) => item.id !== news.id) // Remove bookmark
        : [...prev, news]; // Add bookmark

      saveBookmarksToStorage(updatedBookmarks); // Save to AsyncStorage
      return updatedBookmarks;
    });
  };

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  );
};

// Custom hook to use the Bookmark Context
export const useBookmarks = () => useContext(BookmarkContext);
